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
  const [zoomIndex, setZoomIndex] = useState(0) // default 50%
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

          {/* W-2 Box 1 wages — pink highlight when field selected */}
          {showWagesHighlight && (
            <div
              style={{
                position: 'absolute',
                left: '55%',
                top: '12.5%',
                width: '20%',
                height: '7.48%',
                background: 'rgba(255,136,236,0.2)',
                border: '1px solid #c9007a',
                borderRadius: '2px',
                pointerEvents: 'none',
                zIndex: 3,
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
