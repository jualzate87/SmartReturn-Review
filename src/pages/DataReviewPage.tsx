import { useState, useCallback, useRef } from 'react'
import { ArrowLeft, DotsSix, OverflowIos } from '@design-systems/icons'
import intuitAssistIcon from '../assets/icons/intuit-assist.svg'
import LeftPanel1040 from './data-review/LeftPanel1040'
import ReviewTab from './data-review/ReviewTab'
import DocumentPreview from './data-review/DocumentPreview'
import DetailFields from './data-review/DetailFields'
import w2BingEquipment from '../assets/w2-bing-equipment.png'
import styles from '../styles/data-review/DataReviewPage.module.css'
import dragStyles from '../styles/data-review/DragHandle.module.css'

export default function DataReviewPage() {
  // Left/right panel width ratio (0-1, where value = left panel percentage)
  const [leftWidth, setLeftWidth] = useState(50)
  // Top/bottom section height ratio in right panel (0-100, where value = preview percentage)
  const [previewHeight, setPreviewHeight] = useState(40)
  // Whether right panel is popped out
  const [poppedOut, setPoppedOut] = useState(false)

  const bodyRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  // Horizontal drag (left/right resize)
  const handleHorizontalDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const body = bodyRef.current
    if (!body) return

    const startX = e.clientX
    const startWidth = leftWidth

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX
      const bodyWidth = body.getBoundingClientRect().width
      const newWidth = startWidth + (delta / bodyWidth) * 100
      setLeftWidth(Math.max(20, Math.min(80, newWidth)))
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [leftWidth])

  // Vertical drag (up/down resize within right panel)
  const handleVerticalDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const right = rightRef.current
    if (!right) return

    const startY = e.clientY
    const startHeight = previewHeight

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientY - startY
      const rightHeight = right.getBoundingClientRect().height
      const newHeight = startHeight + (delta / rightHeight) * 100
      setPreviewHeight(Math.max(15, Math.min(75, newHeight)))
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    document.body.style.cursor = 'row-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [previewHeight])

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

      {/* Body — left panel + drag handle + right panel */}
      <div className={styles.body} ref={bodyRef}>
        <div className={styles.leftPanel} style={{ width: poppedOut ? '100%' : `${leftWidth}%` }}>
          <LeftPanel1040 />
        </div>

        {!poppedOut && (
          <>
            {/* Left/right drag handle */}
            <div className={dragStyles.handleVertical} onMouseDown={handleHorizontalDrag}>
              <OverflowIos size="small" className={dragStyles.handleIcon} />
            </div>

            <div className={styles.rightPanel} ref={rightRef} style={{ flex: 1 }}>
              <ReviewTab onPopOut={() => {
                setPoppedOut(true)
                const popoutWindow = window.open(
                  `${window.location.origin}${window.location.pathname}#/data-review-popout`,
                  '_blank',
                  'width=800,height=900'
                )
                // Listen for the popout window closing to restore the right panel
                if (popoutWindow) {
                  const checkClosed = setInterval(() => {
                    if (popoutWindow.closed) {
                      clearInterval(checkClosed)
                      setPoppedOut(false)
                    }
                  }, 500)
                }
              }} />

              {/* Document preview — resizable height */}
              <div style={{ height: `${previewHeight}%`, flexShrink: 0, overflow: 'hidden' }}>
                <DocumentPreview imageSrc={w2BingEquipment} alt="W-2 Bing Equipment" />
              </div>

              {/* Up/down drag handle */}
              <div className={dragStyles.handleHorizontal} onMouseDown={handleVerticalDrag}>
                <DotsSix size="small" className={`${dragStyles.handleIcon} ${dragStyles.rotated90}`} />
              </div>

              {/* Detail fields — takes remaining space */}
              <DetailFields
                formTitle="Details: Wages, Salaries, Tips (W-2)"
                tabs={[
                  { label: 'Bing Equipment', active: true },
                  { label: 'Tech circle', active: false },
                ]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
