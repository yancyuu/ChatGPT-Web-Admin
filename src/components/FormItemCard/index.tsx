// mK10yOvqbRX+fCUPIysUWbowJD9YR4jqRdSr7qDjXEkEnoUfhlzhYMUdHeBPfvRXZdGPPvwUaGvNtSC3QHxuSrVW7+9y5gNPU0zIooWqLus8avJUP9tqaiaU8KhE8SJ/iuGenBvG4XxWpvmiF3g+EB9+Eo9jZoJfnDoCgP7TpRE=
import useDocumentResize from '@/hooks/useDocumentResize'
import styles from './index.module.less'

type Props = {
  title: string
  describe: string
  children?: React.ReactNode
}

function FormItemCard(props: Props) {
  const { width } = useDocumentResize()

  return (
    <div
      className={styles.formItemCard}
      style={{
        flexDirection: width < 600 ? 'column' : 'row',
        alignItems: width < 600 ? 'normal' : 'center'
      }}
    >
      <div className={styles.formItemCard_text}>
        <p>{props.title}</p>
        <span>{props.describe}</span>
      </div>
      <div className={styles.formItemCard_field}>{props.children}</div>
    </div>
  )
}

export default FormItemCard
