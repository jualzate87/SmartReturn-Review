import { OverflowWeb, ZoomIn, ZoomOut } from '@design-systems/icons'
import styles from '../../styles/import/ReviewStep.module.css'

export default function ReviewPersonalStep() {
  return (
    <div className={styles.splitContainer}>
      {/* LEFT COLUMN */}
      <div className={styles.leftColumn}>
        <div className={styles.fileHeader}>
          <div className={styles.fileHeaderInfo}>
            <span className={styles.fileHeaderName}>W2 Michael Yan.pdf</span>
            <span className={styles.fileHeaderMeta}>W2 - Uploaded Feb 8</span>
          </div>
          <button className={styles.fileHeaderMenu} aria-label="More options">
            <OverflowWeb size="medium" />
          </button>
        </div>

        <div className={styles.pdfViewer}>
          {/* TODO: Replace with actual 1040 preview image */}
          <div style={{
            width: '100%',
            maxWidth: 480,
            height: 600,
            background: '#ffffff',
            border: '1px solid #d5dee3',
            boxShadow: '0 2px 8px rgba(76,85,91,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8d9096',
            fontSize: 14,
          }}>
            1040 form preview image goes here
          </div>
        </div>

        <div className={styles.zoomControls}>
          <button className={styles.zoomButton} aria-label="Zoom in">
            <ZoomIn size="large" />
          </button>
          <button className={styles.zoomButton} aria-label="Zoom out">
            <ZoomOut size="large" />
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className={styles.rightColumn}>
        <p style={{ textAlign: 'center', color: '#6b6c72' }}>Right column — Extracted data</p>
      </div>
    </div>
  )
}
