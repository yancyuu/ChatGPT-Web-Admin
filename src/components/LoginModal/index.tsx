import { getCode } from '@/request/api'
import { userAsync } from '@/store/async'
import { RequestLoginParams } from '@/types'
import {
  HeartFilled,
  LockOutlined,
  MailOutlined,
  RedditCircleFilled,
  RobotOutlined,
  SlackCircleFilled,
  SmileFilled,
  TwitterCircleFilled
} from '@ant-design/icons'
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-form'
import { Form, FormInstance, Modal, Space, Tabs } from 'antd'
import { useState } from 'react'

type Props = {
  open: boolean
  onCancel: () => void
}

type LoginType = 'code' | 'password' | string;

export function LoginCard(props: {
  form: FormInstance<RequestLoginParams>
  onSuccess: () => void
}) {

  const [loginType, setLoginType] = useState<LoginType>('code');

  return (
    <LoginForm<RequestLoginParams>
      form={props.form}
      logo={import.meta.env.VITE_APP_LOGO}
      title=""
      subTitle="全网最便宜的人工智能对话"
      // actions={(
      //   <Space>
      //     <HeartFilled />
      //     <RedditCircleFilled />
      //     <SlackCircleFilled />
      //     <TwitterCircleFilled />
      //   </Space>
      // )}
      contentStyle={{
        width: '100%',
        maxWidth: '340px',
        minWidth: '100px'
      }}
      onFinish={async (e) => {
        return new Promise((resolve, reject) => {
          userAsync
            .fetchLogin({ ...e })
            .then((res) => {
              if (res.code) {
                reject(false)
                return
              }
              props.onSuccess?.()
              resolve(true)
            })
            .catch(() => {
              reject(false)
            })
        })
      }}
    >
      <Tabs
        centered
        activeKey={loginType}
        onChange={(activeKey) => {
          setLoginType(activeKey)
        }}
      >
        <Tabs.TabPane key="code" tab="登录/注册" />
        <Tabs.TabPane key="password" tab="密码登录" />
      </Tabs>
      <ProFormText
        fieldProps={{
          size: 'large',
          prefix: <RobotOutlined />
        }}
        name="account"
        rules={[
          {
            required: true,
          }
        ]}
      />
      {
        loginType === 'code' && (
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />
            }}
            captchaProps={{
              size: 'large'
            }}
            placeholder="验证码"
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'获取验证码'}`
              }
              return '获取验证码'
            }}
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码！'
              }
            ]}
            onGetCaptcha={async () => {
              const account = props.form.getFieldValue('account')
              if (!account) {
                props.form.setFields([
                  {
                    name: 'account',
                    errors: ['请输入有效的账号']
                  }
                ])
                return Promise.reject()
              }
              return new Promise((resolve, reject) =>
                getCode({ source: account })
                  .then(() => resolve())
                  .catch(reject)
              )
            }}
          />
        )
      }
      {
        loginType === 'password' && (
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '8位及以上至少包含一个字母和一个数字',
                pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
              },
            ]}
          />
        )
      }
      <div
        style={{
          marginBlockEnd: 24
        }}
      />
    </LoginForm>
  )
}

// 登录注册弹窗
function LoginModal(props: Props) {
  const [loginForm] = Form.useForm()

  const onCancel = () => {
    props.onCancel()
    loginForm.resetFields()
  }

  return (
    <Modal open={props.open} footer={null} destroyOnClose onCancel={onCancel}>
      <LoginCard form={loginForm} onSuccess={onCancel} />
    </Modal>
  )
}

export default LoginModal
