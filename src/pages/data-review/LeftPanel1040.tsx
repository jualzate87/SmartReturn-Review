import { useState } from 'react'
import { ZoomOut, ZoomIn, FitToWidth, NewWindow, ArrowUp, ArrowDown } from '@design-systems/icons'
import form1040 from '../../assets/1040-2024-preview.png'
import SourcesToast from './SourcesToast'
import styles from '../../styles/data-review/LeftPanel1040.module.css'

interface LeftPanel1040Props {
  selectedField?: string | null
}

const W2_SOURCES = [
  { label: 'Bing equipment W2', value: '$60,000' },
  { label: 'Tech Circle W2', value: '$64,265' },
]

export default function LeftPanel1040({ selectedField }: LeftPanel1040Props) {
  const [toastVisible, setToastVisible] = useState(false)
  const showWagesHighlight = selectedField === 'wages'

  return (
    <div className={styles.leftPanel}>
      {/* Toolbar */}
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

      {/* Document viewer — 1040 form with conditional highlight */}
      <div className={styles.documentViewer}>
        <div className={styles.documentWrapper}>
          <img
            src={form1040}
            alt="Form 1040 - 2024"
            className={styles.documentImage}
          />

          {/* 1040 wages line highlight — shown when wages field is selected */}
          {showWagesHighlight && (
            <div
              className={styles.wagesHighlight1040}
              onMouseEnter={() => setToastVisible(true)}
              onMouseLeave={() => setToastVisible(false)}
            />
          )}

          {/* Sources toast — shown on hover over 1040 highlight */}
          {showWagesHighlight && toastVisible && (
            <SourcesToast
              sources={W2_SOURCES}
              style={{ left: '45.45%', top: '34.37%' }}
              onClose={() => setToastVisible(false)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
