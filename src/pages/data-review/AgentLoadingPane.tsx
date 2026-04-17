import { CommentPencil, Close } from '@design-systems/icons'
import intuitAssistIcon from '../../assets/icons/intuit-assist.svg'
import loadingGif from '../../assets/intuit-assist-loading.gif'
import styles from '../../styles/data-review/AgentLoadingPane.module.css'

interface AgentLoadingPaneProps {
  onClose: () => void
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="#393A3D" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function AgentLoadingPane({ onClose }: AgentLoadingPaneProps) {
  return (
    <div className={styles.panel}>
      {/* Header — identical to AgentReportPane */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.iconBtn} aria-label="Menu">
            <MenuIcon />
          </button>
        </div>
        <div className={styles.headerTitle}>
          <img src={intuitAssistIcon} alt="" className={styles.assistIcon} />
          <span className={styles.titleText}>Tax Prep Agent</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.iconBtn} aria-label="New chat">
            <CommentPencil size="small" />
          </button>
          <button className={styles.iconBtn} aria-label="Close" onClick={onClose}>
            <Close size="small" />
          </button>
        </div>
      </div>

      {/* Pane — GIF centered, nothing else */}
      <div className={styles.pane}>
        <div className={styles.logoContainer}>
          <img src={loadingGif} alt="Tax Prep Agent is analyzing your return" className={styles.logo} />
        </div>
      </div>
    </div>
  )
}
