import { useEffect, useRef } from 'react'
import { Refresh } from '@design-systems/icons'
import styles from '../../styles/data-review/DetailFields.module.css'

// Realistic 1099-INT data for MegaBank
const PAYER_DATA = {
  ein: '94-1234567',
  name: 'MegaBank, N.A.',
  street: '1 Financial Plaza, Suite 400',
  city: 'San Francisco',
  state: 'CA',
  zip: '94104',
  payerPhone: '(800) 555-0100',
}

const RECIPIENT_DATA = {
  ssn: '111-11-1111',
  name: 'Jordan Wells',
  street: '333 Easy Street',
  city: 'Middlefield',
  state: 'CA',
  zip: '98756',
}

// Form 1099-INT boxes — realistic values matching the 1040 line 2b (4,535 total)
const FORM_DATA = {
  box1_interest:        '4,500',   // Box 1 — Interest income (main amount)
  box2_earlyPenalty:    '0',       // Box 2 — Early withdrawal penalty
  box3_usBonds:         '35',      // Box 3 — Interest on U.S. Savings Bonds & T-bills
  box4_fedTaxWithheld:  '0',       // Box 4 — Federal income tax withheld
  box5_investExpenses:  '0',       // Box 5 — Investment expenses
  box6_foreignTax:      '0',       // Box 6 — Foreign tax paid
  box7_foreignCountry:  '',        // Box 7 — Foreign country or U.S. possession
  box8_taxExempt:       '0',       // Box 8 — Tax-exempt interest
  box9_specPrivActivity:'0',       // Box 9 — Specified private activity bond interest
  box10_marketDiscount: '0',       // Box 10 — Market discount
  box11_bondPremium:    '0',       // Box 11 — Bond premium
  box13_stateTaxId:     'CA-87654321',
  box14_stateTax:       '0',
  box15_stateIncome:    '4,500',
}

interface DetailFields1099Props {
  selectedField?: string | null
  highlightMode?: 'orange' | 'blue'
}

export default function DetailFields1099({ selectedField, highlightMode = 'blue' }: DetailFields1099Props) {
  const highlightedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedField && highlightedRef.current) {
      highlightedRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [selectedField])

  return (
    <div className={styles.container}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>Details: Interest Income (1099-INT) — MegaBank</h2>
      </div>

      <div className={styles.inputContainer}>

        {/* ── Payer Information ── */}
        <div className={styles.sectionHeader}>
          Payer Information (MANDATORY for e-file)
        </div>

        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(a) Payer's federal ID number (EIN)</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={PAYER_DATA.ein} />
          <button className={styles.refreshBtn} aria-label="Refresh"><Refresh size="medium" /></button>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(b) Payer's name</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputWide}`} readOnly value={PAYER_DATA.name} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Street address</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputWide}`} readOnly value={PAYER_DATA.street} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>City / State / ZIP code</span>
          <div className={styles.addressRow}>
            <input className={`${styles.fieldInput} ${styles.addressCity}`} readOnly value={PAYER_DATA.city} />
            <input className={`${styles.fieldInput} ${styles.addressState}`} readOnly value={PAYER_DATA.state} />
            <input className={`${styles.fieldInput} ${styles.addressZip}`} readOnly value={PAYER_DATA.zip} />
          </div>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Payer's telephone number</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={PAYER_DATA.payerPhone} />
        </div>

        {/* ── Recipient Information ── */}
        <div className={styles.sectionHeader}>Recipient Information</div>

        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(c) Recipient's SSN or ITIN</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={RECIPIENT_DATA.ssn} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(d) Recipient's name</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputWide}`} readOnly value={RECIPIENT_DATA.name} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Street address</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputWide}`} readOnly value={RECIPIENT_DATA.street} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>City / State / ZIP code</span>
          <div className={styles.addressRow}>
            <input className={`${styles.fieldInput} ${styles.addressCity}`} readOnly value={RECIPIENT_DATA.city} />
            <input className={`${styles.fieldInput} ${styles.addressState}`} readOnly value={RECIPIENT_DATA.state} />
            <input className={`${styles.fieldInput} ${styles.addressZip}`} readOnly value={RECIPIENT_DATA.zip} />
          </div>
        </div>

        {/* ── Interest Income ── */}
        <div className={styles.sectionHeader}>Interest Income</div>

        <div
          ref={selectedField === 'taxableInterest' ? highlightedRef : undefined}
          className={`${styles.fieldRow} ${selectedField === 'taxableInterest' ? (highlightMode === 'orange' ? styles.fieldRowHighlightedOrange : styles.fieldRowHighlighted) : ''}`}
        >
          <span className={styles.fieldLabel}>(1) Interest income</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall} ${selectedField === 'taxableInterest' ? (highlightMode === 'orange' ? styles.fieldInputHighlightedOrange : styles.fieldInputHighlighted) : ''}`} readOnly value={FORM_DATA.box1_interest} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(2) Early withdrawal penalty</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={FORM_DATA.box2_earlyPenalty} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(3) Interest on U.S. Savings Bonds &amp; T-bills</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={FORM_DATA.box3_usBonds} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(4) Federal income tax withheld</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={FORM_DATA.box4_fedTaxWithheld} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(5) Investment expenses</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={FORM_DATA.box5_investExpenses} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(6) Foreign tax paid</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={FORM_DATA.box6_foreignTax} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(7) Foreign country or U.S. possession</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputWide}`} readOnly value={FORM_DATA.box7_foreignCountry} placeholder="N/A" />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(8) Tax-exempt interest</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={FORM_DATA.box8_taxExempt} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(9) Specified private activity bond interest</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={FORM_DATA.box9_specPrivActivity} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(10) Market discount</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={FORM_DATA.box10_marketDiscount} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(11) Bond premium</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={FORM_DATA.box11_bondPremium} />
        </div>

        {/* ── State Tax Information ── */}
        <div className={styles.sectionHeader}>State Tax Information</div>

        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(13) State / Payer's state ID number</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={FORM_DATA.box13_stateTaxId} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(14) State income tax withheld</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={FORM_DATA.box14_stateTax} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(15) State income</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={FORM_DATA.box15_stateIncome} />
        </div>

      </div>
    </div>
  )
}
