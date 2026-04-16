import { useState } from 'react'
import { Refresh } from '@design-systems/icons'
import SubTab from './SubTab'
import styles from '../../styles/data-review/DetailFields.module.css'

interface DetailFieldsProps {
  formTitle: string
  tabs: { label: string; active: boolean }[]
  selectedField?: string | null
  onFieldSelect?: (field: string | null) => void
}

const W2_FIELDS = {
  employer: [
    { label: '(b) Employer identification number', value: '12-3456789', hasRefresh: true },
    { label: '(c) Name of employer', value: 'Bing Equipment' },
    { label: 'Street address', value: '3833 Soundtech Ct SE' },
  ],
  wages: [
    { label: '(1) Wages, tips, etc.', value: '60,000', highlighted: true },
    { label: '(2) Federal income tax withheld', value: '10,000' },
    { label: '(3) Social security wages', value: '60,000' },
    { label: '(4) Social security tax withheld', value: '3,720' },
    { label: '(5) Medicare wages and tips', value: '60,000' },
    { label: '(6) Medicare tax withheld', value: '870' },
    { label: '(7) Social security tips', value: '25' },
    { label: '(8) Allocated tips', value: '0' },
    { label: '(10) Dependent care benefits', value: '25' },
    { label: '(11) Nonqualified plans', value: '39' },
  ],
}

export default function DetailFields({ formTitle, tabs, selectedField, onFieldSelect }: DetailFieldsProps) {
  const [fields, setFields] = useState(W2_FIELDS)
  const [activeTab, setActiveTab] = useState(0)

  const handleFieldChange = (section: 'employer' | 'wages', index: number, value: string) => {
    setFields(prev => ({
      ...prev,
      [section]: prev[section].map((f, i) => i === index ? { ...f, value } : f),
    }))
  }

  return (
    <div className={styles.container}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>{formTitle}</h2>

        {/* Sub-tab bar — rebuilt from Figma */}
        <SubTab
          tabs={tabs.map(t => ({ label: t.label }))}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Input fields */}
      <div className={styles.inputContainer}>
        {/* Employer Information section */}
        <div className={styles.sectionHeader}>
          Employer Information (MANDATORY for e-file)
        </div>

        {fields.employer.map((field, i) => (
          <div key={field.label} className={styles.fieldRow}>
            <span className={styles.fieldLabel}>{field.label}</span>
            <input
              className={styles.fieldInput}
              value={field.value}
              onChange={e => handleFieldChange('employer', i, e.target.value)}
            />
            {field.hasRefresh && (
              <button className={styles.refreshBtn} aria-label="Refresh">
                <Refresh size="medium" />
              </button>
            )}
          </div>
        ))}

        {/* City / State / ZIP row */}
        <div className={styles.multiFieldRow}>
          <span className={styles.fieldLabel}>City / State / ZIP code</span>
          <div className={styles.multiFieldInputs}>
            <input className={`${styles.fieldInput} ${styles.fieldInputCity}`} defaultValue="Kentwood" />
            <input className={`${styles.fieldInput} ${styles.fieldInputState}`} defaultValue="CA" />
            <input className={`${styles.fieldInput} ${styles.fieldInputZip}`} defaultValue="93004" />
          </div>
        </div>

        <div className={styles.spacer} />

        {/* Wages section */}
        <div className={styles.sectionHeader}>
          Wages
        </div>

        <div className={styles.spacer} />

        {fields.wages.map((field, i) => {
          const isWagesField = i === 0 // "(1) Wages, tips, etc."
          const isHighlighted = isWagesField && selectedField === 'wages'
          return (
            <div
              key={field.label}
              className={styles.fieldRow}
              onClick={() => isWagesField ? onFieldSelect?.('wages') : onFieldSelect?.(null)}
              style={{ cursor: isWagesField ? 'pointer' : 'default' }}
            >
              <span className={styles.fieldLabel}>{field.label}</span>
              <input
                className={`${styles.fieldInput} ${isHighlighted ? styles.fieldInputHighlighted : ''}`}
                value={field.value}
                onChange={e => handleFieldChange('wages', i, e.target.value)}
                onClick={e => e.stopPropagation()}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
