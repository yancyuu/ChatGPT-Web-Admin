// mK10yOvqbRX+fCUPIysUWbowJD9YR4jqRdSr7qDjXEkEnoUfhlzhYMUdHeBPfvRXZdGPPvwUaGvNtSC3QHxuSrVW7+9y5gNPU0zIooWqLus8avJUP9tqaiaU8KhE8SJ/iuGenBvG4XxWpvmiF3g+EB9+Eo9jZoJfnDoCgP7TpRE=
import { UserInfo } from '@/types'
import styles from './index.module.less'
import { Space, Statistic, Tooltip } from 'antd'
import { useMemo } from 'react'

function UserInfoCard(props: { info?: UserInfo,  children?: React.ReactNode; }) {

  const vipIcon = {
    vip: 'https://s.ibaotu.com/next/img/new/ep.4814.png',
    svip: 'https://s.ibaotu.com/next/img/new/person.b254.png'
  }

  const vipDay = useMemo(() => {
    if (!props.info?.vip_expire_time) return 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayTime = today.getTime()
    const vipExpireTime = new Date(props.info?.vip_expire_time || 0).getTime()
    if (vipExpireTime < todayTime) return 0
    const time = Math.ceil((vipExpireTime - todayTime) / 86400000)
    return time
  }, [props])

  const isSvip = useMemo(()=>{
	if (!props.info?.svip_expire_time) return 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayTime = today.getTime()
    const svipExpireTime = new Date(props.info?.svip_expire_time || 0).getTime()
    if (svipExpireTime < todayTime) return 0
    const time = Math.ceil((svipExpireTime - todayTime) / 86400000)
    return time
  },[props])

  const info = useMemo(() => {
    return props.info
  }, [props])

  return (
    <div className={styles.userInfo}>
      <div className={styles.userInfo_card}>
        <img className={styles.userInfo_avatar} src={info?.avatar} alt="" />
        <div className={styles.userInfo_info}>
          <div className={styles.userInfo_info_title}>
            <span>{info?.nickname}</span>
            {
              isSvip ? <Tooltip title="超级会员"><img src={vipIcon.svip} alt="" /></Tooltip> : 
              vipDay ? <Tooltip title="会员"><img src={vipIcon.vip} alt="" /></Tooltip>: ''
            }
          </div>
          <span className={styles.userInfo_info_account}>{info?.account}</span>
        </div>
        <div className={styles.userInfo_vip}>
          <Space wrap size="large">
            <Statistic title="积分" value={info?.integral} />
            <Statistic title="会员(天)" value={vipDay} />
          </Space>
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default UserInfoCard
