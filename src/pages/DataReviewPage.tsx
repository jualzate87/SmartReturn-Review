import { ArrowLeft } from '@design-systems/icons'
import intuitAssistIcon from '../assets/icons/intuit-assist.svg'
import LeftPanel1040 from './data-review/LeftPanel1040'
import ReviewTab from './data-review/ReviewTab'
import DocumentPreview from './data-review/DocumentPreview'
import DetailFields from './data-review/DetailFields'
import w2BingEquipment from '../assets/w2-bing-equipment.png'
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
          <LeftPanel1040 />
        </div>
        <div className={styles.rightPanel}>
          <ReviewTab />
          <DocumentPreview imageSrc={w2BingEquipment} alt="W-2 Bing Equipment" />
          <DetailFields
            formTitle="Details: Wages, Salaries, Tips (W-2)"
            tabs={[
              { label: 'Bing Equipment', active: true },
              { label: 'Tech circle', active: false },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
