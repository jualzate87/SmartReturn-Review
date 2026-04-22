import { useState, useCallback, useRef, useEffect } from 'react'
import { ArrowLeft, DotsSix, OverflowIos, Panel } from '@design-systems/icons'
import intuitAssistIcon from '../assets/icons/intuit-assist.svg'
import LeftPanel1040 from './data-review/LeftPanel1040'
import ReviewTab from './data-review/ReviewTab'
import DocumentPreview from './data-review/DocumentPreview'
import DetailFields from './data-review/DetailFields'
import DetailFields1099 from './data-review/DetailFields1099'
import DetailFieldsK1 from './data-review/DetailFieldsK1'
import AgentReportPane from './data-review/AgentReportPane'
import AgentLoadingPane from './data-review/AgentLoadingPane'
import w2BingEquipment from '../assets/w2-bing-equipment.png'
import w2TechCircle from '../assets/w2-tech-circle.png'
import img1099Int from '../assets/1099-int-megabank.png'
import imgK1 from '../assets/k1-easy-money.png'
import styles from '../styles/data-review/DataReviewPage.module.css'
import dragStyles from '../styles/data-review/DragHandle.module.css'

export default function DataReviewPage() {
  // Selected field for cross-document highlighting
  const [selectedField, setSelectedField] = useState<string | null>(null)
  // Active top tab: 'w2s' | '1099-ints' | 'k1'
  const [activeTopTab, setActiveTopTab] = useState<'w2s' | '1099-ints' | 'k1'>('w2s')
  // Active W-2 sub-tab: 'bingEquipment' | 'techCircle'
  const [activeSubTab, setActiveSubTab] = useState<'bingEquipment' | 'techCircle'>('bingEquipment')
  // W-2 wages — drives 1040 line 1a dynamically
  const [wages, setWages] = useState({ bingEquipment: 60000, techCircle: 64304 })
  const total1a = wages.bingEquipment + wages.techCircle
  // Left/right panel width ratio — 50% when idle
  const [leftWidth, setLeftWidth] = useState(50)
  // Left panel width when agent panel is open (draggable)
  const [agentLeftWidth, setAgentLeftWidth] = useState(62)
  // Top/bottom section height ratio in right panel (0-100, where value = preview percentage)
  const [previewHeight, setPreviewHeight] = useState(40)
  // Whether right panel is popped out
  const [poppedOut, setPoppedOut] = useState(false)
  // Agent panel view state: idle → loading → report → closing → idle
  const [agentView, setAgentView] = useState<'idle' | 'loading' | 'report' | 'closing'>('idle')
  // Whether YoY analysis is expanded (screen 4) — drives -15% badge on 1040
  const [yoyExpanded, setYoyExpanded] = useState(false)

  // Reset field selection on mount
  useEffect(() => {
    setSelectedField(null)
  }, [])

  // Auto-open agent panel when launched from SmartReturn via ?agent=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '')
    if (params.get('agent') === 'true') {
      setAgentView('loading')
      setTimeout(() => {
        setAgentView('report')
        sessionStorage.setItem('agentLoaded', '1')
      }, 5000)
    }
  }, [])

  const handleAgentOpen = () => {
    setSelectedField(null)
    const alreadyLoaded = sessionStorage.getItem('agentLoaded')
    if (alreadyLoaded) {
      setAgentView('report')
    } else {
      setAgentView('loading')
      setTimeout(() => {
        setAgentView('report')
        sessionStorage.setItem('agentLoaded', '1')
      }, 5000)
    }
  }

  const handleAgentClose = () => {
    setAgentView('closing')
    setYoyExpanded(false)
    setSelectedField(null)
    setTimeout(() => setAgentView('idle'), 350)
  }

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

  // Horizontal drag between left panel and agent panel
  const handleAgentDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const body = bodyRef.current
    if (!body) return
    const startX = e.clientX
    const startWidth = agentLeftWidth
    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX
      const bodyWidth = body.getBoundingClientRect().width
      const minLeftPct = ((bodyWidth - 400) / bodyWidth) * 100
      const newWidth = startWidth + (delta / bodyWidth) * 100
      setAgentLeftWidth(Math.max(20, Math.min(minLeftPct, newWidth)))
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
  }, [agentLeftWidth])

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
          <button
            className={`${styles.intuitIntelBtn} ${activeTopTab === 'w2s' && agentView === 'idle' ? styles.intuitIntelBtnActive : ''}`}
            aria-label="Toggle panel"
            onClick={agentView !== 'idle' ? handleAgentClose : handleAgentOpen}
          >
            <Panel size="medium" />
          </button>
          <button
            className={`${styles.intuitIntelBtn} ${agentView !== 'idle' ? styles.intuitIntelBtnActive : ''}`}
            aria-label="Intuit Intelligence"
            onClick={handleAgentOpen}
          >
            <img src={intuitAssistIcon} alt="" className={styles.intuitIntelIcon} />
          </button>
        </div>
      </div>

      {/* Body — left panel + drag handle + right panel + agent panel */}
      <div className={styles.body} ref={bodyRef}>
        <div className={styles.leftPanel} style={{ width: poppedOut ? '100%' : (agentView === 'loading' || agentView === 'report' || agentView === 'closing') ? `${agentLeftWidth}%` : `${leftWidth}%` }}>
          <LeftPanel1040 selectedField={selectedField} total1a={total1a} wages={wages} yoyExpanded={yoyExpanded} />
        </div>

        {!poppedOut && (
          <>
            {/* Left/right drag handle — hidden when agent panel is open */}
            {agentView === 'idle' && (
              <div className={dragStyles.handleVertical} onMouseDown={handleHorizontalDrag}>
                <OverflowIos size="small" className={dragStyles.handleIcon} />
              </div>
            )}

            <div className={`${styles.rightPanel} ${agentView === 'closing' ? styles.rightPanelFadeIn : ''}`} ref={rightRef} style={{ flex: 1, display: (agentView === 'loading' || agentView === 'report') ? 'none' : 'flex' }}>
              <ReviewTab
                activeTopTab={activeTopTab}
                onTopTabChange={setActiveTopTab}
                onPopOut={() => {
                  setPoppedOut(true)
                  const popoutWindow = window.open(
                    `${window.location.origin}${window.location.pathname}#/data-review-popout`,
                    '_blank',
                    'width=800,height=900'
                  )
                  if (popoutWindow) {
                    const checkClosed = setInterval(() => {
                      if (popoutWindow.closed) {
                        clearInterval(checkClosed)
                        setPoppedOut(false)
                      }
                    }, 500)
                  }
                }}
              />

              {/* Document preview — switches based on active tab */}
              <div style={{ height: `${previewHeight}%`, flexShrink: 0, overflow: 'hidden' }}>
                <DocumentPreview
                  imageSrc={
                    activeTopTab === '1099-ints' ? img1099Int :
                    activeTopTab === 'k1' ? imgK1 :
                    activeSubTab === 'techCircle' ? w2TechCircle : w2BingEquipment
                  }
                  alt={
                    activeTopTab === '1099-ints' ? '1099-INT MegaBank' :
                    activeTopTab === 'k1' ? 'K-1 Easy Money Ltd' :
                    activeSubTab === 'techCircle' ? 'W-2 Tech Circle' : 'W-2 Bing Equipment'
                  }
                  selectedField={activeTopTab === 'w2s' ? selectedField : null}
                />
              </div>

              {/* Up/down drag handle */}
              <div className={dragStyles.handleHorizontal} onMouseDown={handleVerticalDrag}>
                <DotsSix size="small" className={`${dragStyles.handleIcon} ${dragStyles.rotated90}`} />
              </div>

              {/* Detail fields — switches based on active tab */}
              {activeTopTab === 'w2s' && (
                <DetailFields
                  formTitle="Details: Wages, Salaries, Tips (W-2)"
                  tabs={[
                    { label: 'Bing Equipment', active: activeSubTab === 'bingEquipment' },
                    { label: 'Tech circle', active: activeSubTab === 'techCircle' },
                  ]}
                  selectedField={selectedField}
                  onFieldSelect={setSelectedField}
                  activeSubTab={activeSubTab}
                  onSubTabChange={(tab) => setActiveSubTab(tab as 'bingEquipment' | 'techCircle')}
                  wages={wages}
                  onWageChange={(employer, value) => setWages(prev => ({ ...prev, [employer]: value }))}
                />
              )}
              {activeTopTab === '1099-ints' && <DetailFields1099 />}
              {activeTopTab === 'k1' && <DetailFieldsK1 />}
            </div>

            {/* Loading pane — screen 2.5 */}
            {agentView === 'loading' && (
              <AgentLoadingPane onClose={handleAgentClose} />
            )}

            {/* Drag handle between left panel and agent panel */}
            {(agentView === 'report' || agentView === 'closing') && (
              <div className={dragStyles.handleVertical} onMouseDown={handleAgentDrag}>
                <OverflowIos size="small" className={dragStyles.handleIcon} />
              </div>
            )}

            {/* Agent report panel — screen 3 & 4 */}
            {(agentView === 'report' || agentView === 'closing') && (
              <AgentReportPane
                closing={agentView === 'closing'}
                onClose={handleAgentClose}
                onYoyToggle={setYoyExpanded}
                onViewW2={() => {
                  handleAgentClose()
                  setActiveTopTab('w2s')
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
