import { ArrowLeft } from '@design-systems/icons'
import intuitAssistIcon from '../assets/icons/intuit-assist.svg'
import styles from '../styles/data-review/DataReviewPage.module.css'

export default function DataReviewPage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.backDivider}>
            <button className={styles.backButton} aria-label="Back">
              <ArrowLeft size="medium" />
            </button>
          </div>
          <span className={styles.headerTitle}>Data Review - Form 1040</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.intuitIntelBtn} aria-label="Intuit Intelligence">
            <img src={intuitAssistIcon} alt="" className={styles.intuitIntelIcon} />
          </button>
        </div>
      </div>

      {/* Body — left panel + right panel */}
      <div className={styles.body}>
        <div className={styles.leftPanel}>
          <p style={{ padding: '1rem', color: '#6b6c72', fontSize: 14 }}>Left panel — 1040 form</p>
        </div>
        <div className={styles.rightPanel}>
          <p style={{ padding: '1rem', color: '#6b6c72', fontSize: 14 }}>Right panel — Review details</p>
        </div>
      </div>
    </div>
  )
}
