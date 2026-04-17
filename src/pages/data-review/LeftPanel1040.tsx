import { useState, useRef } from 'react'
import { ZoomOut, ZoomIn, FitToWidth, NewWindow, ArrowUp, ArrowDown } from '@design-systems/icons'
import { Badge } from '@cgds/badge'
import '@cgds/badge/dist/index.css'
import form1040 from '../../assets/1040-2024-preview.png'
import SourcesToast from './SourcesToast'
import styles from '../../styles/data-review/LeftPanel1040.module.css'

interface LeftPanel1040Props {
  selectedField?: string | null
  total1a?: number
  wages?: { bingEquipment: number; techCircle: number }
  yoyExpanded?: boolean
}

export default function LeftPanel1040({ selectedField, total1a = 124304, wages = { bingEquipment: 60000, techCircle: 64304 }, yoyExpanded = false }: LeftPanel1040Props) {
  const [toastVisible, setToastVisible] = useState(false)
  const [toastPos, setToastPos] = useState({ top: 0, left: 0 })
  const [zoom, setZoom] = useState(50)
  const highlightRef = useRef<HTMLDivElement>(null)
  const showWagesHighlight = selectedField === 'wages'

  const handleHighlightEnter = () => {
    if (highlightRef.current) {
      const rect = highlightRef.current.getBoundingClientRect()
      // Position toast 8px below the pink box, left-aligned with it
      setToastPos({ top: rect.bottom + 8, left: rect.left })
    }
    setToastVisible(true)
  }

  // Sources toast shows live wages from both W-2s
  const W2_SOURCES = [
    { label: 'Bing equipment W2', value: `$${wages.bingEquipment.toLocaleString()}` },
    { label: 'Tech Circle W2', value: `$${wages.techCircle.toLocaleString()}` },
  ]

  return (
    <div className={styles.leftPanel}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarControls}>
          <span className={styles.zoomLevel}>{zoom}%</span>
          <button className={styles.toolbarBtn} aria-label="Zoom out" onClick={() => setZoom(z => Math.max(25, z - 25))}><ZoomOut size="medium" /></button>
          <button className={styles.toolbarBtn} aria-label="Zoom in" onClick={() => setZoom(z => Math.min(200, z + 25))}><ZoomIn size="medium" /></button>
          <button className={styles.toolbarBtn} aria-label="Fit to width" onClick={() => setZoom(92)}><FitToWidth size="medium" /></button>
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

      {/* Document viewer — 1040 form with conditional highlight + dynamic overlay */}
      <div className={styles.documentViewer}>
        <div className={styles.documentWrapper} style={{ width: `${zoom}%` }}>
          <img
            src={form1040}
            alt="Form 1040 - 2024"
            className={styles.documentImage}
          />

          {/* Jordan Wells personal info overlays — positions from Figma Section 3 coords */}
          {/* First name — Figma y=11.6%, x≈3.5% */}
          <span style={{ position: 'absolute', left: '6.73%', top: '12.44%', fontSize: '1.15cqw', fontFamily: 'Arial, sans-serif', color: '#000', pointerEvents: 'none', lineHeight: 1 }}>
            Jordan
          </span>
          {/* Last name — Figma x=35.7%, same row */}
          <span style={{ position: 'absolute', left: '35.7%', top: '11.6%', fontSize: '1.15cqw', fontFamily: 'Arial, sans-serif', color: '#000', pointerEvents: 'none', lineHeight: 1 }}>
            Wells
          </span>
          {/* SSN — right column, same row */}
          <span style={{ position: 'absolute', left: '76%', top: '11.6%', fontSize: '1.15cqw', fontFamily: 'Arial, sans-serif', color: '#000', pointerEvents: 'none', lineHeight: 1, letterSpacing: '0.08em' }}>
            534-02-8622
          </span>
          {/* Address — Figma y=17.4% */}
          <span style={{ position: 'absolute', left: '6.73%', top: '18.24%', fontSize: '1.15cqw', fontFamily: 'Arial, sans-serif', color: '#000', pointerEvents: 'none', lineHeight: 1 }}>
            137 Canary Dr
          </span>
          {/* City/State/ZIP — Figma y=21.0%, State x=54.8%, ZIP x=67.2% */}
          <span style={{ position: 'absolute', left: '6.73%', top: '21.84%', fontSize: '1.15cqw', fontFamily: 'Arial, sans-serif', color: '#000', pointerEvents: 'none', lineHeight: 1 }}>
            Carlsbad
          </span>
          <span style={{ position: 'absolute', left: '54.8%', top: '21.0%', fontSize: '1.15cqw', fontFamily: 'Arial, sans-serif', color: '#000', pointerEvents: 'none', lineHeight: 1 }}>
            CA
          </span>
          <span style={{ position: 'absolute', left: '67.2%', top: '21.0%', fontSize: '1.15cqw', fontFamily: 'Arial, sans-serif', color: '#000', pointerEvents: 'none', lineHeight: 1 }}>
            92025
          </span>

          {/* Dynamic 1040 Line 1a value */}
          <span style={{
            position: 'absolute',
            left: '82.4%',
            top: '56.9%',
            width: '11.6%',
            textAlign: 'right',
            fontSize: '1.15cqw',
            fontFamily: 'Arial, sans-serif',
            color: '#000000',
            pointerEvents: 'none',
            lineHeight: 1,
            paddingRight: '0.3%',
          }}>
            {total1a.toLocaleString()}
          </span>

          {/* Pink highlight on line 1a — hover to show toast */}
          {(showWagesHighlight || yoyExpanded) && (
            <div
              ref={highlightRef}
              className={styles.wagesHighlight1040}
              onMouseEnter={handleHighlightEnter}
              onMouseLeave={() => setToastVisible(false)}
            />
          )}

          {/* CGDS Badge "-15%" — status="attention", positioned right of the pink box */}
          {yoyExpanded && (
            <div style={{
              position: 'absolute',
              left: 'calc(82.4% + 11.6% + 1%)',
              top: '56.7%',
              pointerEvents: 'none',
              zIndex: 4,
            }}>
              <Badge status="attention" shape="rect">-15%</Badge>
            </div>
          )}

        </div>
      </div>

      {/* Sources toast — fixed position computed from pink box rect, always on top */}
      {(showWagesHighlight || yoyExpanded) && toastVisible && (
        <SourcesToast
          sources={W2_SOURCES}
          style={{ position: 'fixed', top: toastPos.top, left: toastPos.left }}
          onClose={() => setToastVisible(false)}
        />
      )}
    </div>
  )
}
