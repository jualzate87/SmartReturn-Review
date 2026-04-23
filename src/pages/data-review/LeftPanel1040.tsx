import { useState } from 'react'
import { CircleCheck } from '@design-systems/icons'
import FieldPopover, { FIELD_META } from './FieldPopover'
import styles from '../../styles/data-review/LeftPanel1040.module.css'

interface LeftPanel1040Props {
  selectedField?: string | null
  onFieldClick?: (fieldName: string | null) => void
  total1a?: number
  wages?: { bingEquipment: number; techCircle: number }
  /** When true: clicking a field shows YoY badge, not blue popover */
  yoyExpanded?: boolean
  reviewedFields?: Set<string>
  /** When true: this field is highlighted orange (active agent issue card) — takes precedence over blue */
  issueField?: string | null
  /** Called when user clicks a source link in the field popover */
  onViewSource?: (fieldName: string) => void
}

// YoY % changes — absolute value drives color, sign drives label
const YOY: Record<string, number> = {
  wages:           -15,
  taxableInterest: +42,
  qualifiedDivs:   -63,
  ordinaryDivs:    +11,
  capitalGain:     +150,
  totalIncome:     -12,
  agi:             -12,
  stdDeduction:     +5,
  taxableIncome:   -14,
}

// Color based purely on absolute magnitude (no green — green = reviewed only)
function badgeColor(pct: number): string {
  const abs = Math.abs(pct)
  if (abs < 5)   return styles.badgeGrey
  if (abs <= 30) return styles.badgeOrange
  return styles.badgeRed
}

function fmt(n: number) {
  return n.toLocaleString()
}

export default function LeftPanel1040({
  selectedField,
  onFieldClick,
  total1a = 124265,
  yoyExpanded = false,
  reviewedFields = new Set(),
  issueField,
  onViewSource,
}: LeftPanel1040Props) {

  // Popover: which field + the viewport rect of its value cell
  const [popoverField, setPopoverField] = useState<string | null>(null)
  const [popoverRect, setPopoverRect]   = useState<DOMRect | null>(null)

  const handleRowClick = (field: string, e: React.MouseEvent<HTMLTableRowElement>) => {
    // If the field is the active issue field, just toggle selection (orange mode)
    if (field === issueField) {
      onFieldClick?.(selectedField === field ? null : field)
      setPopoverField(null)
      return
    }

    // Toggle: clicking the same field closes the popover
    if (field === selectedField) {
      onFieldClick?.(null)
      setPopoverField(null)
      return
    }

    // New field clicked — open blue popover if it has metadata
    onFieldClick?.(field)
    if (FIELD_META[field]) {
      // Get the rect of the value cell (last td in the row)
      const row = e.currentTarget
      const cells = row.querySelectorAll('td')
      const valueCell = cells[cells.length - 1]
      if (valueCell) {
        setPopoverRect(valueCell.getBoundingClientRect())
        setPopoverField(field)
      }
    } else {
      setPopoverField(null)
    }
  }

  // Close popover and deselect field (e.g. X button or outside click)
  const handleClosePopover = () => {
    setPopoverField(null)
    setPopoverRect(null)
    onFieldClick?.(null)
  }

  // Close popover UI only — keep field selected so highlight persists during navigation
  const handleDismissPopoverKeepSelection = () => {
    setPopoverField(null)
    setPopoverRect(null)
    // selectedField intentionally NOT cleared
  }

  /**
   * kind:
   *   'source'  — value comes from imported documents (W-2, 1099, etc.)
   *              → outlined box, subtle blue tint
   *   'calc'    — computed from other lines on this form
   *              → lighter box, italic value
   *   undefined — blank / no value
   */
  const Row = ({
    field,
    line,
    label,
    value,
    kind,
    bold,
    shaded,
    indent,
    subdued,
    owe,
  }: {
    field?: string
    line: string
    label: string
    value?: string | number
    kind?: 'source' | 'calc'
    bold?: boolean
    shaded?: boolean
    indent?: boolean
    subdued?: boolean
    owe?: boolean
  }) => {
    const isIssueHighlight = !!field && field === issueField
    const isSelected       = !!field && selectedField === field
    const isReviewed       = !!field && reviewedFields.has(field)
    const isPopoverOpen    = !!field && popoverField === field
    const yoy              = field ? YOY[field] : undefined
    const clickable        = !!field

    // Blue selection: selected but NOT the active issue field
    const isBlueSelected   = isSelected && !isIssueHighlight
    // Orange selection: selected AND it's the issue field
    const isOrangeSelected = isSelected && !!isIssueHighlight

    const rowCls = [
      styles.row,
      bold    ? styles.rowBold    : '',
      shaded  ? styles.rowShaded  : '',
      indent  ? styles.rowIndent  : '',
      subdued ? styles.rowSubdued : '',
      owe     ? styles.rowOwe     : '',
      isOrangeSelected ? styles.rowSelected  : '',
      isBlueSelected   ? styles.rowSelectedBlue : '',
      isReviewed       ? styles.rowReviewed  : '',
      clickable        ? styles.rowClickable : '',
    ].filter(Boolean).join(' ')

    const valueCellCls = [
      styles.valueBox,
      kind === 'source'   ? styles.valueBoxSource   : '',
      kind === 'calc'     ? styles.valueBoxCalc     : '',
      value === undefined ? styles.valueBoxEmpty    : '',
      isOrangeSelected    ? styles.valueBoxSelected : '',
      isBlueSelected      ? styles.valueBoxSelectedBlue : '',
      isReviewed && !isSelected ? styles.valueBoxReviewed : '',
    ].filter(Boolean).join(' ')

    const valueNumCls = [
      styles.valueNum,
      kind === 'calc'   ? styles.valueNumCalc   : '',
      kind === 'source' ? styles.valueNumSource : '',
      isOrangeSelected  ? styles.valueNumSelected   : '',
      isBlueSelected    ? styles.valueNumSelectedBlue : '',
      isReviewed && !isSelected ? styles.valueNumReviewed : '',
    ].filter(Boolean).join(' ')

    return (
      <tr
        className={rowCls}
        onClick={clickable ? (e) => handleRowClick(field!, e) : undefined}
      >
        <td className={styles.cellLine}>{line}</td>
        <td className={styles.cellLabel}>
          <div className={styles.cellLabelInner}>
            {label}
          </div>
        </td>
        <td className={styles.cellLineRight}>{line}</td>
        <td className={styles.cellValue}>
          <div className={valueCellCls}>
            {/* Reviewed check icon — left side of value box */}
            {isReviewed && (
              <span className={styles.reviewedIcon}><CircleCheck size="small" /></span>
            )}

            {/* The value number */}
            {value !== undefined && (
              <span className={valueNumCls}>
                {typeof value === 'number' ? fmt(value) : value}
              </span>
            )}

            {/* YoY badge — shown when agent YoY panel is expanded */}
            {yoyExpanded && yoy !== undefined && (
              <span className={`${styles.badge} ${badgeColor(yoy)}`}>
                {yoy > 0 ? `+${yoy}%` : `${yoy}%`}
              </span>
            )}
          </div>
        </td>
      </tr>
    )
  }

  const Section = ({ title }: { title: string }) => (
    <tr className={styles.sectionHeader}>
      <td />
      <td colSpan={3} className={styles.sectionTitle}>{title}</td>
    </tr>
  )

  const Divider = () => (
    <tr className={styles.dividerRow}>
      <td colSpan={4}><div className={styles.dividerLine} /></td>
    </tr>
  )

  return (
    <div className={styles.leftPanel}>
      <div className={styles.documentViewer}>
        <div className={styles.formDoc}>

          {/* ── IRS Header ── */}
          <div className={styles.irsHeader}>
            <div className={styles.irsLeft}>
              <div className={styles.irsDept}>Department of the Treasury — Internal Revenue Service</div>
              <div className={styles.irsTitle}>Form <strong>1040</strong> U.S. Individual Income Tax Return</div>
            </div>
            <div className={styles.irsRight}>
              <div className={styles.irsYear}>2025</div>
              <div className={styles.irsOmb}>OMB No. 1545-0074</div>
            </div>
          </div>

          {/* ── Taxpayer info ── */}
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <div className={styles.infoField} style={{ flex: 2 }}>
                <span className={styles.infoLabel}>Your first name and middle initial</span>
                <span className={styles.infoValue}>Jordan</span>
              </div>
              <div className={styles.infoField} style={{ flex: 2 }}>
                <span className={styles.infoLabel}>Last name</span>
                <span className={styles.infoValue}>Wells</span>
              </div>
              <div className={styles.infoField}>
                <span className={styles.infoLabel}>Your social security number</span>
                <span className={styles.infoValue}>111-11-1111</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoField} style={{ flex: 3 }}>
                <span className={styles.infoLabel}>Home address</span>
                <span className={styles.infoValue}>333 Easy Street</span>
              </div>
              <div className={styles.infoField}>
                <span className={styles.infoLabel}>City, State, ZIP</span>
                <span className={styles.infoValue}>Middlefield, CA  98756</span>
              </div>
            </div>
          </div>

          {/* ── Filing status ── */}
          <div className={styles.filingStatus}>
            <span className={styles.filingLabel}>Filing Status</span>
            {['Single', 'Married filing jointly', 'Married filing separately', 'Head of household'].map((s, i) => (
              <label key={i} className={styles.filingOption}>
                <input type="radio" readOnly checked={i === 0} onChange={() => {}} /> {s}
              </label>
            ))}
          </div>

          <Divider />

          {/* ── Column headers ── */}
          <div className={styles.colHeaders}>
            <div className={styles.colLine} />
            <div className={styles.colDesc}>Description</div>
            <div className={styles.colLineR} />
            <div className={styles.colVal}>Amount</div>
          </div>

          {/* ── Field legend ── */}
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={`${styles.legendSwatch} ${styles.legendSwatchSource}`} />
              From documents
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.legendSwatch} ${styles.legendSwatchCalc}`} />
              Calculated
            </span>
          </div>

          {/* ── Income table ── */}
          <table className={styles.table}>
            <tbody>
              <Section title="Income" />
              <Row field="wages"           line="1a" label="Total amount from Form(s) W-2, box 1"                          kind="source" value={total1a} />
              <Row                         line="1b" label="Household employee wages not reported on Form(s) W-2"          subdued />
              <Row                         line="1c" label="Tip income not reported on line 1a"                            subdued />
              <Row                         line="1d" label="Medicaid waiver payments not reported on Form(s) W-2"         kind="source" value={45}     subdued />
              <Row                         line="1z" label="Add lines 1a through 1h"                                       kind="calc"   value={total1a} bold />

              <Row field="taxableInterest" line="2b" label="Taxable interest"                                              kind="source" value={4535} />
              <Row field="qualifiedDivs"   line="3a" label="Qualified dividends"                                           kind="source" value={45} />
              <Row field="ordinaryDivs"    line="3b" label="Ordinary dividends"                                            kind="source" value={531} />
              <Row field="capitalGain"     line="7"  label="Capital gain or (loss)"                                        kind="source" value={602} />
              <Row                         line="8"  label="Additional income from Schedule 1, line 10"                   kind="source" value={4539} />

              <Divider />
              <Row field="totalIncome"     line="9"  label="Total income. Add lines 1z, 2b, 3b, 4b, 5b, 6b, 7, and 8"   kind="calc"   value={134472} bold />

              <Section title="Adjustments to Income" />
              <Row field="agi"             line="11" label="Adjusted gross income"                                         kind="calc"   value={134472} bold shaded />

              <Section title="Deductions" />
              <Row field="stdDeduction"    line="12" label="Standard deduction or itemized deductions (from Schedule A)"  kind="source" value={14600} />
              <Row                         line="14" label="Add lines 12 and 13"                                           kind="calc"   value={14600} />

              <Divider />
              <Row field="taxableIncome"   line="15" label="Taxable income"                                                kind="calc"   value={119872} bold shaded />

              <Section title="Tax and Credits" />
              <Row                         line="16" label="Tax (see instructions)"                                        kind="calc"   value={24186} bold />
              <Row                         line="24" label="Total tax"                                                     kind="calc"   value={24186} bold />

              <Section title="Payments" />
              <Row                         line="25a" label="Federal income tax withheld from Form(s) W-2"                kind="source" value={19800} />
              <Row                         line="33"  label="Total payments"                                               kind="calc"   value={19800} bold />

              <tr className={styles.oweDividerRow}>
                <td colSpan={4} />
              </tr>
              <Row                         line="37" label="Amount you owe. Subtract line 33 from line 24"                kind="calc"   value={4386} bold owe />
            </tbody>
          </table>

        </div>
      </div>

      {/* ── Field popover — fixed-positioned so it escapes overflow:hidden ── */}
      {popoverField && popoverRect && (
        <FieldPopover
          fieldName={popoverField}
          anchorRect={popoverRect}
          onClose={handleClosePopover}
          onViewSource={(fieldName) => {
            // Dismiss the popover UI but keep the field selected so highlight carries through
            handleDismissPopoverKeepSelection()
            onViewSource?.(fieldName)
          }}
        />
      )}
    </div>
  )
}
