import { Refresh } from '@design-systems/icons'
import SubTab from './SubTab'
import styles from '../../styles/data-review/DetailFields.module.css'

interface DetailFieldsProps {
  formTitle: string
  tabs: { label: string; active: boolean }[]
  selectedField?: string | null
  onFieldSelect?: (field: string | null) => void
  activeSubTab?: 'bingEquipment' | 'techCircle'
  onSubTabChange?: (tab: string) => void
  wages?: { bingEquipment: number; techCircle: number }
  onWageChange?: (employer: string, value: number) => void
}

// Static non-wages fields per employer
const EMPLOYER_DATA = {
  bingEquipment: {
    id: '12-3456789',
    name: 'Bing Equipment',
    street: '3833 Soundtech Ct SE',
    city: 'Kentwood', state: 'CA', zip: '93004',
    federalTax: '10,000',
    socialSecurityWages: '60,000', ssTax: '3,720',
    medicareWages: '60,000', medicareTax: '870',
    ssTips: '25', allocatedTips: '0',
    dependentCare: '25', nonqualified: '39',
  },
  techCircle: {
    id: '12-3456789',
    name: 'Tech circle',
    street: '321 Main Orchard Dr',
    city: 'Reno', state: 'NV', zip: '95010',
    federalTax: '5,987',
    socialSecurityWages: '64,304', ssTax: '3,720',
    medicareWages: '64,304', medicareTax: '1000',
    ssTips: '25', allocatedTips: '0',
    dependentCare: '25', nonqualified: '39',
  },
}

export default function DetailFields({
  formTitle,
  tabs,
  selectedField,
  onFieldSelect,
  activeSubTab = 'bingEquipment',
  onSubTabChange,
  wages = { bingEquipment: 60000, techCircle: 64304 },
  onWageChange,
}: DetailFieldsProps) {
  const employer = EMPLOYER_DATA[activeSubTab]
  const currentWages = wages[activeSubTab]

  const handleWagesChange = (value: string) => {
    const num = parseFloat(value.replace(/,/g, '')) || 0
    onWageChange?.(activeSubTab, num)
  }

  return (
    <div className={styles.container}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>{formTitle}</h2>
        <SubTab
          tabs={tabs.map(t => ({ label: t.label }))}
          activeIndex={tabs.findIndex(t => t.active)}
          onTabChange={(i) => {
            const tab = tabs[i]
            if (tab) onSubTabChange?.(i === 0 ? 'bingEquipment' : 'techCircle')
          }}
        />
      </div>

      {/* Scrollable input fields */}
      <div className={styles.inputContainer}>
        {/* Employer Information section */}
        <div className={styles.sectionHeader}>
          Employer Information (MANDATORY for e-file)
        </div>

        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(b) Employer identification number</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={employer.id} />
          <button className={styles.refreshBtn} aria-label="Refresh"><Refresh size="medium" /></button>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(c) Name of employer</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputWide}`} readOnly value={employer.name} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Street address</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputWide}`} readOnly value={employer.street} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>City / State / ZIP code</span>
          <div className={styles.addressRow}>
            <input className={`${styles.fieldInput} ${styles.addressCity}`} readOnly value={employer.city} />
            <input className={`${styles.fieldInput} ${styles.addressState}`} readOnly value={employer.state} />
            <input className={`${styles.fieldInput} ${styles.addressZip}`} readOnly value={employer.zip} />
          </div>
        </div>

        {/* Wages section — same grey header as Employer Information */}
        <div className={styles.sectionHeader}>Wages</div>

        {/* (1) Wages — editable, drives 1040 line 1a */}
        <div
          className={styles.fieldRow}
          onClick={() => onFieldSelect?.(selectedField === 'wages' ? null : 'wages')}
          style={{ cursor: 'pointer' }}
        >
          <span className={styles.fieldLabel}>(1) Wages, tips, etc.</span>
          <input
            className={`${styles.fieldInput} ${styles.fieldInputSmall} ${selectedField === 'wages' ? styles.fieldInputHighlighted : ''}`}
            value={currentWages}
            onChange={e => {
              const raw = e.target.value.replace(/,/g, '')
              const num = parseFloat(raw) || 0
              onWageChange?.(activeSubTab, num)
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>

        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(2) Federal income tax withheld</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={employer.federalTax} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(3) Social security wages</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={employer.socialSecurityWages} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(4) Social security tax withheld</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={employer.ssTax} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(5) Medicare wages and tips</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={employer.medicareWages} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(6) Medicare tax withheld</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={employer.medicareTax} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(7) Social security tips</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={employer.ssTips} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(8) Allocated tips</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={employer.allocatedTips} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(10) Dependent care benefits</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={employer.dependentCare} />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>(11) Nonqualified plans</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value={employer.nonqualified} />
        </div>
      </div>
    </div>
  )
}
