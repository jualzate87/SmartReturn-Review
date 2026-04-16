import { useState } from 'react'
import { ZoomOut, ZoomIn } from '@design-systems/icons'
import styles from '../../styles/data-review/DocumentPreview.module.css'

interface DocumentPreviewProps {
  imageSrc: string
  alt: string
  selectedField?: string | null
}

const ZOOM_LEVELS = [50, 75, 100, 125, 150, 200]

export default function DocumentPreview({ imageSrc, alt, selectedField }: DocumentPreviewProps) {
  const [zoomIndex, setZoomIndex] = useState(2) // default 100%
  const zoom = ZOOM_LEVELS[zoomIndex]
  const showWagesHighlight = selectedField === 'wages'

  const zoomOut = () => setZoomIndex(i => Math.max(0, i - 1))
  const zoomIn = () => setZoomIndex(i => Math.min(ZOOM_LEVELS.length - 1, i + 1))

  return (
    <div className={styles.container}>
      {/* Scrollable image area */}
      <div className={styles.imageArea}>
        <div style={{ position: 'relative', width: `${zoom}%`, lineHeight: 0 }}>
          <img
            src={imageSrc}
            alt={alt}
            className={styles.documentImage}
          />

          {/* W-2 Box 1 "Wages, tips" — pixel-detected: row bottom at 19.98%
              Row spans 12.5-19.98%, value column 55-75% */}
          {showWagesHighlight && (
            <div
              style={{
                position: 'absolute',
                left: '55%',
                top: '12.5%',
                width: '20%',
                height: '7.48%',
                border: '1.5px solid #3492ef',
                borderRadius: '1px',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      </div>

      {/* Zoom toolbar — same style as left panel */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarControls}>
          <span className={styles.zoomLevel}>{zoom}%</span>
          <button
            className={styles.toolbarBtn}
            aria-label="Zoom out"
            onClick={zoomOut}
            disabled={zoomIndex === 0}
          >
            <ZoomOut size="medium" />
          </button>
          <button
            className={styles.toolbarBtn}
            aria-label="Zoom in"
            onClick={zoomIn}
            disabled={zoomIndex === ZOOM_LEVELS.length - 1}
          >
            <ZoomIn size="medium" />
          </button>
        </div>
      </div>
    </div>
  )
}
