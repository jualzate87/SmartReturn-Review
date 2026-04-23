import { useState } from 'react'
import { ZoomOut, ZoomIn } from '@design-systems/icons'
import styles from '../../styles/data-review/DocumentPreview.module.css'

type DocType = 'w2' | '1099-int' | '1099-div' | 'k1'

interface FieldOverlay {
  left: string; top: string; width: string; height: string
}

// Overlay positions (%) for each 1040 field on each document image
// Positions measured against the actual PNG dimensions
const OVERLAYS: Record<DocType, Partial<Record<string, FieldOverlay>>> = {
  'w2': {
    // Box 1 — Wages (feeds 1040 line 1a)
    wages: { left: '55%', top: '12.5%', width: '20%', height: '7.48%' },
  },
  '1099-int': {
    // Box 1 — Interest income (feeds 1040 line 2b)
    taxableInterest: { left: '47%', top: '27%', width: '19%', height: '5.5%' },
  },
  '1099-div': {
    // Box 1a — Total ordinary dividends (feeds 1040 line 3b)
    ordinaryDivs:  { left: '47%', top: '38%', width: '19%', height: '5%' },
    // Box 1b — Qualified dividends (feeds 1040 line 3a)
    qualifiedDivs: { left: '47%', top: '44%', width: '19%', height: '5%' },
  },
  'k1': {},
}

interface DocumentPreviewProps {
  imageSrc: string
  alt: string
  selectedField?: string | null
  highlightMode?: 'orange' | 'blue'
  docType?: DocType
}

const ZOOM_LEVELS = [50, 60, 65, 70, 75, 100, 125, 150, 200]

export default function DocumentPreview({ imageSrc, alt, selectedField, highlightMode = 'blue', docType = 'w2' }: DocumentPreviewProps) {
  const [zoomIndex, setZoomIndex] = useState(2) // default 65%
  const zoom = ZOOM_LEVELS[zoomIndex]

  const zoomOut = () => setZoomIndex(i => Math.max(0, i - 1))
  const zoomIn  = () => setZoomIndex(i => Math.min(ZOOM_LEVELS.length - 1, i + 1))

  // Find if there's an overlay for the currently selected field on this doc type
  const overlay = selectedField ? OVERLAYS[docType]?.[selectedField] : undefined

  return (
    <div className={styles.container}>
      {/* Scrollable image area */}
      <div className={styles.imageArea}>
        <div style={{ position: 'relative', width: `${zoom}%`, lineHeight: 0, flexShrink: 0 }}>
          <img
            src={imageSrc}
            alt={alt}
            className={styles.documentImage}
          />

          {/* Field highlight overlay — orange for issue mode, blue for generic */}
          {overlay && (
            <div
              style={{
                position: 'absolute',
                left:   overlay.left,
                top:    overlay.top,
                width:  overlay.width,
                height: overlay.height,
                background: highlightMode === 'orange'
                  ? 'rgba(201, 80, 15, 0.08)'
                  : 'rgba(32, 94, 163, 0.08)',
                border: highlightMode === 'orange'
                  ? '2px solid #c9500f'
                  : '2px solid #205ea3',
                borderRadius: '2px',
                pointerEvents: 'none',
                zIndex: 3,
                transition: 'opacity 200ms ease',
              }}
            />
          )}
        </div>
      </div>

      {/* Zoom toolbar */}
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
