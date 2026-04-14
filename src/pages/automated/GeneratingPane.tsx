import intuitAssistGif from '../../assets/intuit-assist-animation.gif'
import styles from '../../styles/automated/GeneratingPane.module.css'

interface GeneratingPaneProps {
  userMessage: string
  processingText: string
  actionButtonLabel: string
  onActionClick: () => void
}

export default function GeneratingPane({
  userMessage,
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

      <div className={styles.chatContent}>
        {/* User message bubble */}
        <div className={styles.userMessageRow}>
          <div className={styles.userBubble}>
            {userMessage}
          </div>
        </div>

        {/* Agent processing */}
        <div className={styles.processingRow}>
          <div className={styles.processingInner}>
            <div className={styles.processingContent}>
              {/* Intuit Assist icon — 20px */}
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
    </div>
  )
}
