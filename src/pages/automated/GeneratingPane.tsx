import intuitAssistGif from '../../assets/intuit-assist-animation.gif'
import styles from '../../styles/automated/GeneratingPane.module.css'

interface GeneratingPaneProps {
  processingText: string
  actionButtonLabel: string
  onActionClick: () => void
}

export default function GeneratingPane({
  processingText,
  actionButtonLabel,
  onActionClick,
}: GeneratingPaneProps) {
  return (
    <div className={styles.container}>
      {/* Action button — top right */}
      <div className={styles.actionButtonRow}>
        <button className={styles.actionButton} onClick={onActionClick}>
          {actionButtonLabel}
        </button>
      </div>

      {/* Agent processing */}
      <div className={styles.processingRow}>
        <div className={styles.processingInner}>
          <div className={styles.processingContent}>
            <div className={styles.assistIconWrapper}>
              <div className={styles.assistIcon}>
                <img
                  src={intuitAssistGif}
                  alt="Intuit Assist"
                  className={styles.assistIconGif}
                />
              </div>
            </div>
            <span className={styles.processingText}>{processingText}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
