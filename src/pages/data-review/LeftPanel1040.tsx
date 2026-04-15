import { ZoomOut, ZoomIn, FitToWidth, NewWindow, ArrowUp, ArrowDown } from '@design-systems/icons'
import form1040 from '../../assets/1040-2024-preview.png'
import styles from '../../styles/data-review/LeftPanel1040.module.css'

export default function LeftPanel1040() {
  return (
    <div className={styles.leftPanel}>
      {/* Toolbar — same pattern as screens 11-18 */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarControls}>
          <span className={styles.zoomLevel}>100%</span>
          <button className={styles.toolbarBtn} aria-label="Zoom out"><ZoomOut size="medium" /></button>
          <button className={styles.toolbarBtn} aria-label="Zoom in"><ZoomIn size="medium" /></button>
          <button className={styles.toolbarBtn} aria-label="Fit to width"><FitToWidth size="medium" /></button>
          <button className={styles.toolbarBtn} aria-label="Open in new window"><NewWindow size="medium" /></button>
          <div className={styles.toolbarDivider} />
          <div className={styles.pageControls}>
            <span className={styles.pageLabel}>Page</span>
            <span className={styles.pageNumber}>1</span>
            <span className={styles.pageTotal}>/ 2</span>
          </div>
          <button className={styles.pageNavBtn} aria-label="Previous page"><ArrowUp size="small" /></button>
          <button className={styles.pageNavBtn} aria-label="Next page"><ArrowDown size="small" /></button>
        </div>
      </div>

      {/* Document viewer with 1040 form + status badges */}
      <div className={styles.documentViewer}>
        <div className={styles.documentWrapper}>
          <img
            src={form1040}
            alt="Form 1040 - 2024"
            className={styles.documentImage}
          />

          {/* Colored highlight bars — 40% opacity */}
          <div className={styles.highlightRed} />
          <div className={styles.highlightOrange} />
          <div className={styles.highlightBlue} />

          {/* Status badges */}
          <div className={styles.badgeRed}>-15%</div>
          <div className={styles.badgeOrange}>+20%</div>
          <div className={styles.badgeBlue}>-5%</div>
        </div>
      </div>
    </div>
  )
}
