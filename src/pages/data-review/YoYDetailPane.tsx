import { useState } from 'react'
import { Close, Plus, ChevronLeft, CircleCheck, Panel } from '@design-systems/icons'
import { Button } from '@ids-ts/button'
import '@ids-ts/button/dist/main.css'
import intuitAssistIcon from '../../assets/icons/intuit-assist.svg'
import sendArrow from '../../assets/send-arrow.svg'
import styles from '../../styles/data-review/YoYDetailPane.module.css'

// Figma asset — dot badge
const imgDot = 'https://www.figma.com/api/mcp/asset/37253f74-69e2-4ed1-8932-1a0f58cbc258'

interface YoYDetailPaneProps {
  onClose?: () => void
  onBack?: () => void
  onViewW2?: () => void
  onReviewSource?: () => void
  closing?: boolean
}

const TABLE_ROWS = [
  { label: 'Bing Equipment', y2024: '$60,000',  y2023: '$82,000',  diff: '$22,000' },
  { label: 'Tech Circle',    y2024: '$64,304',  y2023: '$63,000',  diff: '$1,304'  },
  { label: 'Wages',          y2024: '$124,000', y2023: '$145,000', diff: '$20,735' },
]

export default function YoYDetailPane({ onClose, onBack, onViewW2, onReviewSource, closing = false }: YoYDetailPaneProps) {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className={`${styles.panel} ${closing ? styles.panelClosing : ''}`}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft} />
        <div className={styles.headerTitle}>
          <img src={intuitAssistIcon} alt="" className={styles.assistIcon} />
          <span className={styles.titleText}>Tax Prep Agent</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.iconBtn} aria-label="Close" onClick={onClose}>
            <Close size="small" />
          </button>
        </div>
      </div>

      {/* ── Scrollable pane ── */}
      <div className={styles.pane}>
        <div className={styles.chat}>

          {/* Back + counter row */}
          <div className={styles.navRow}>
            <button className={styles.backLink} onClick={onBack}>
              <ChevronLeft size="small" />
              <span>Back to overview</span>
            </button>
            <span className={styles.counter}>1 of 8</span>
          </div>

          {/* Title row */}
          <div className={styles.titleRow}>
            <span className={styles.dot} />
            <span className={styles.issueTitle}>Significant income drop</span>
          </div>

          {/* Summary */}
          <p className={styles.summary}>Wages dropped by $21.5k (-15%) vs Prior Year.</p>

          {/* Tax impact banner */}
          <div className={styles.taxImpactBanner}>
            <p className={styles.taxImpactText}>
              <strong>Tax impact:</strong> ~$4,600 lower tax liability from the $20.7k wage drop (lower taxable income)
            </p>
          </div>

          {/* Root Cause */}
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Root Cause</p>
            <p className={styles.sectionBody}>
              Bing W-2 shows $22k reduction with low scan confidence (72%).
            </p>
          </div>

          {/* Details table */}
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Details</p>
            <div className={styles.tableCard}>
              {/* Header row */}
              <div className={`${styles.tableRow} ${styles.tableHeaderRow}`}>
                <span className={styles.cellLabel} />
                <span className={styles.cellValue}>2024</span>
                <span className={styles.cellValue}>2023</span>
                <span className={styles.cellValue}>Diff</span>
              </div>
              {/* Data rows */}
              {TABLE_ROWS.map((row, i) => (
                <div key={row.label} className={`${styles.tableRow} ${i < TABLE_ROWS.length - 1 ? styles.tableRowBorder : ''}`}>
                  <span className={styles.cellLabel}>{row.label}</span>
                  <span className={styles.cellValue}>{row.y2024}</span>
                  <span className={styles.cellValue}>{row.y2023}</span>
                  <span className={styles.cellValue}>{row.diff}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Action */}
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Suggested Action</p>
            <ul className={styles.actionList}>
              <li>Verify the W2 Bing wages amount ($60,000) against the source document. The scan confidence is low (72%).</li>
              <li>Confirm with the client whether the income reduction is expected.</li>
            </ul>
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Action buttons */}
          <div className={styles.actionButtons}>
            <Button priority="secondary" size="small">
              <CircleCheck size="small" /> Mark as reviewed
            </Button>
            <Button priority="secondary" size="small" onClick={onReviewSource ?? onViewW2}>
              <Panel size="small" /> Review source and input
            </Button>
          </div>

        </div>
      </div>

      {/* ── Input area (reused from AgentReportPane) ── */}
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
