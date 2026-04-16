import styles from '../../styles/data-review/DetailFields.module.css'

export default function DetailFields1099() {
  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>Details: Interest Income (1099-INT) MegaBank</h2>
      </div>

      <div className={styles.inputContainer}>
        {/* Interest income section */}
        <div className={styles.sectionHeader}>Interest income</div>

        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Name of payer</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputWide}`} readOnly value="MegaBank" />
        </div>

        <div className={styles.spacer} />

        {/* Form 1099-INT section */}
        <div className={styles.sectionHeader}>Form 1099-INT</div>

        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Banks, savings &amp; loans, credit unions, etc.</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall} ${styles.fieldInputHighlighted}`} readOnly value="3,500" />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>U.S. bonds, T-bills, etc. (nontaxable to state)</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value="35" />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Federal income tax withheld</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value="35" />
        </div>

        <div className={styles.spacer} />

        {/* Additional Information section */}
        <div className={styles.sectionHeader}>Additional Information</div>

        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Identification number (SSN or EIN)</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputSmall}`} readOnly value="3,720" />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Street address</span>
          <input className={`${styles.fieldInput} ${styles.fieldInputWide}`} readOnly value="60,000" />
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>City / State / ZIP code</span>
          <div className={styles.addressRow}>
            <input className={`${styles.fieldInput} ${styles.addressCity}`} readOnly value="Middlefield" />
            <input className={`${styles.fieldInput} ${styles.addressState}`} readOnly value="CA" />
            <input className={`${styles.fieldInput} ${styles.addressZip}`} readOnly value="98756" />
          </div>
        </div>
      </div>
    </div>
  )
}
