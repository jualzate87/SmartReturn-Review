import { useState } from 'react'
import { CommentPencil, Close, Copy, ThumbUp, ThumbDown, Plus, ChevronDown } from '@design-systems/icons'
import { Button } from '@ids-ts/button'
import '@ids-ts/button/dist/main.css'
import intuitAssistIcon from '../../assets/icons/intuit-assist.svg'
import sendArrow from '../../assets/send-arrow.svg'
import styles from '../../styles/data-review/AgentReportPane.module.css'

interface AgentReportPaneProps {
  onClose?: () => void
  onYoyToggle?: (expanded: boolean) => void
  onViewW2?: () => void
}

// Report card icons from Figma — imgReport, imgReport1, imgReport2, imgReport3
const REPORT_CARDS = [
  { label: 'YoY analysis',          badgeCount: 1, badgeColor: 'red'  as const, position: 'first' },
  { label: 'Scan quality & inputs', badgeCount: 1, badgeColor: 'red'  as const, position: 'middle' },
  { label: 'IRS Compliance',        badgeCount: 1, badgeColor: 'red'  as const, position: 'middle' },
  { label: 'Credits & deductions',  badgeCount: 2, badgeColor: 'blue' as const, position: 'last' },
]

// Suggestion chips — content derived from the 1040 form on the left
const CHIPS = [
  'Why did wages increase from last year?',
  'Is Jordan eligible for any credits?',
  'Explain the IRS compliance issue',
]

// Inline SVGs matching the Figma icon names
function CompareOthersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18M3 12h12M3 18h8M17 15l2 2 4-4" stroke="#393A3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function ScannerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7V5a2 2 0 012-2h2M16 3h2a2 2 0 012 2v2M20 17v2a2 2 0 01-2 2h-2M8 21H6a2 2 0 01-2-2v-2" stroke="#393A3D" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 12h12" stroke="#393A3D" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function FederalTaxesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 10.5L12 3l9 7.5V21H15v-6H9v6H3V10.5z" stroke="#393A3D" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}
function TaxesCreditsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#393A3D" strokeWidth="1.5"/>
      <path d="M12 7v5l3 3" stroke="#393A3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const CARD_ICONS = [
  <CompareOthersIcon />,
  <ScannerIcon />,
  <FederalTaxesIcon />,
  <TaxesCreditsIcon />,
]

// Menu icon (hamburger) — not in @design-systems/icons for this use
function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="#393A3D" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function AgentReportPane({ onClose, onYoyToggle, onViewW2 }: AgentReportPaneProps) {
  const [inputValue, setInputValue] = useState('')
  const [yoyExpanded, setYoyExpanded] = useState(false)

  const handleYoyClick = () => {
    const next = !yoyExpanded
    setYoyExpanded(next)
    onYoyToggle?.(next)
  }

  return (
    <div className={styles.panel}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.iconBtn} aria-label="Menu">
            <MenuIcon />
          </button>
        </div>

        <div className={styles.headerTitle}>
          <img src={intuitAssistIcon} alt="" className={styles.assistIcon} />
          <span className={styles.titleText}>Tax Prep Agent</span>
        </div>

        <div className={styles.headerRight}>
          <button className={styles.iconBtn} aria-label="New chat">
            <CommentPencil size="small" />
          </button>
          <button className={styles.iconBtn} aria-label="Close" onClick={onClose}>
            <Close size="small" />
          </button>
        </div>
      </div>

      {/* ── Scrollable pane ── */}
      <div className={styles.pane}>
        <div className={styles.chat}>

          {/* Show thinking */}
          <button className={styles.showThinking}>
            <span className={styles.showThinkingLabel}>Show thinking</span>
            <ChevronDown size="small" />
          </button>

          {/* Agent message */}
          <p className={styles.agentMessage}>
            Here's your full report. Feel free to ask any questions.
          </p>

          {/* ScoreCard */}
          <div className={styles.scoreCard}>
            <div className={styles.scoreTopRow}>
              <span className={styles.scoreTitle}>Review Score</span>
            </div>
            <span className={styles.scoreAmount}>88%</span>

            {/* Accuracy — green, 94% */}
            <div className={styles.metricRow}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Accuracy</span>
                <span className={styles.metricValue}>94%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: '94%', background: '#00856d' }} />
              </div>
            </div>

            {/* Completeness — orange, 88% (≈ right-1/4 from end = 75% filled in Figma, but value says 88%) */}
            <div className={styles.metricRow}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Completeness</span>
                <span className={styles.metricValue}>88%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: '75%', background: '#ff9331' }} />
              </div>
            </div>

            {/* Risk — orange, 82% */}
            <div className={styles.metricRow}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Risk</span>
                <span className={styles.metricValue}>82%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: '75%', background: '#ff9331' }} />
              </div>
            </div>
          </div>

          {/* Expandable report card bundle */}
          <div className={styles.cardBundle}>
            {REPORT_CARDS.map((card, i) => (
              <div key={card.label}>
                <button
                  className={`${styles.card} ${styles[`card_${card.position}`]} ${card.label === 'YoY analysis' && yoyExpanded ? styles.cardActive : ''}`}
                  onClick={card.label === 'YoY analysis' ? handleYoyClick : undefined}
                >
                  <div className={styles.cardIcon}>{CARD_ICONS[i]}</div>
                  <div className={styles.cardContent}>
                    <span className={styles.cardLabel}>{card.label}</span>
                    <span className={`${styles.badge} ${card.badgeColor === 'red' ? styles.badgeRed : styles.badgeBlue}`}>
                      {card.badgeCount}
                    </span>
                  </div>
                  <ChevronDown size="small" className={`${styles.chevron} ${card.label === 'YoY analysis' && yoyExpanded ? styles.chevronUp : ''}`} />
                </button>

                {/* Significant income drop finding — shown when YoY is expanded */}
                {card.label === 'YoY analysis' && yoyExpanded && (
                  <div className={styles.findingCard}>
                    <div className={styles.findingHeader}>
                      <span className={styles.findingBadge}>-15%</span>
                      <span className={styles.findingTitle}>Significant income drop</span>
                    </div>
                    <p className={styles.findingBody}>
                      Wages reported on line 1a dropped from $146,227 (2023) to $124,304 (2024) — a 15% decrease. Verify with client if this is expected.
                    </p>
                    <div className={styles.findingFields}>
                      <div className={styles.findingField}>
                        <span className={styles.findingFieldLabel}>Form 1040 line 1a</span>
                        <span className={styles.findingFieldValue}>$124,304</span>
                      </div>
                      <div className={styles.findingField}>
                        <span className={styles.findingFieldLabel}>Prior year (2023)</span>
                        <span className={styles.findingFieldValue}>$146,227</span>
                      </div>
                    </div>
                    <Button priority="tertiary" onClick={onViewW2}>View</Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feedback bar */}
          <div className={styles.feedbackBar}>
            <button className={styles.iconBtn} aria-label="Copy"><Copy size="small" /></button>
            <button className={styles.iconBtn} aria-label="Like"><ThumbUp size="small" /></button>
            <button className={styles.iconBtn} aria-label="Dislike"><ThumbDown size="small" /></button>
          </div>

          {/* Suggestion chips — right-aligned, pl-48px on container */}
          <div className={styles.chips}>
            {CHIPS.map(chip => (
              <button key={chip} className={styles.chip}>{chip}</button>
            ))}
          </div>

        </div>
      </div>

      {/* ── Input area ── */}
      <div className={styles.inputArea}>
        <div className={styles.inputFade} />
        <div className={styles.inputBox}>
          <div className={styles.inputTextField}>
            <textarea
              className={styles.textarea}
              placeholder="Ask anything"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) e.preventDefault() }}
              rows={1}
            />
          </div>
          <div className={styles.inputActions}>
            <div className={styles.inputActionsLeft}>
              <button className={styles.attachBtn} aria-label="Attach">
                <Plus size="medium" />
              </button>
            </div>
            <div className={styles.inputActionsRight}>
              <button
                className={`${styles.sendBtn} ${inputValue.trim() ? styles.sendBtnActive : ''}`}
                aria-label="Send"
              >
                <img src={sendArrow} alt="" className={styles.sendIcon} />
              </button>
            </div>
          </div>
        </div>
        <span className={styles.legal}>Important information about how we use generative AI</span>
      </div>

    </div>
  )
}
