import { useState } from 'react'
import { OverflowWeb, ZoomIn, ZoomOut } from '@design-systems/icons'
import { Tabs } from '@cgds/tabs'
import styles from '../../styles/import/ReviewStep.module.css'

export default function ReviewPersonalStep() {
  const [matchedOnly, setMatchedOnly] = useState(true)

  return (
    <div className={styles.splitContainer}>
      {/* LEFT COLUMN */}
      <div className={styles.leftColumn}>
        <div className={styles.fileHeader}>
          <div className={styles.fileHeaderInfo}>
            <span className={styles.fileHeaderName}>W2 Michael Yan.pdf</span>
            <span className={styles.fileHeaderMeta}>W2 - Uploaded Feb 8</span>
          </div>
          <button className={styles.fileHeaderMenu} aria-label="More options">
            <OverflowWeb size="medium" />
          </button>
        </div>

        <div className={styles.pdfViewer}>
          <div style={{
            width: '100%',
            maxWidth: 480,
            height: 600,
            background: '#ffffff',
            border: '1px solid #d5dee3',
            boxShadow: '0 2px 8px rgba(76,85,91,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8d9096',
            fontSize: 14,
          }}>
            1040 form preview image goes here
          </div>
        </div>

        <div className={styles.zoomControls}>
          <button className={styles.zoomButton} aria-label="Zoom in">
            <ZoomIn size="large" />
          </button>
          <button className={styles.zoomButton} aria-label="Zoom out">
            <ZoomOut size="large" />
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className={styles.rightColumn}>
        <h2 className={styles.rightHeading}>Review personal information</h2>

        <Tabs start={0}>
          <Tabs.Title>Client information</Tabs.Title>
          <Tabs.Title>Dependents</Tabs.Title>
          <Tabs.Title>Misc info/ Direct deposit</Tabs.Title>
          <Tabs.Panel>{/* Client info content shown below */}</Tabs.Panel>
          <Tabs.Panel><span /></Tabs.Panel>
          <Tabs.Panel><span /></Tabs.Panel>
        </Tabs>

        <div className={styles.toggleGroup}>
          <button
            className={`${styles.toggleBtn} ${!matchedOnly ? styles.toggleBtnActive : ''}`}
            onClick={() => setMatchedOnly(false)}
          >
            All fields
          </button>
          <button
            className={`${styles.toggleBtn} ${matchedOnly ? styles.toggleBtnActive : ''}`}
            onClick={() => setMatchedOnly(true)}
          >
            Matched fields
          </button>
        </div>

        {/* Taxpayer section */}
        <h3 className={styles.sectionHeader}>Taxpayer</h3>

        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Name</span>
          <span className={styles.fieldValue}>Testee Summary</span>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>SSN</span>
          <span className={styles.fieldValue}>534-02-8622</span>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Marital status</span>
          <span className={styles.fieldValue}>Married</span>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Filing status</span>
          <span className={styles.fieldValue}>MFJ</span>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Occupation</span>
          <span className={styles.fieldValue}>Nutritionist</span>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Home address</span>
          <div className={styles.addressRow}>
            <span className={`${styles.fieldValue} ${styles.addressStreet}`}>151 Franklin Street</span>
            <span className={`${styles.fieldValue} ${styles.addressCity}`}>Chicago</span>
            <span className={`${styles.fieldValue} ${styles.addressState}`}>IL</span>
            <span className={`${styles.fieldValue} ${styles.addressZip}`}>60606</span>
          </div>
        </div>

        {/* Spouse information section */}
        <h3 className={styles.sectionHeader}>Spouse information</h3>

        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Spouse name</span>
          <span className={styles.fieldValue}>James Summaary</span>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Spouse SSN</span>
          <span className={styles.fieldValue}>872-33-9461</span>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Occupation</span>
          <span className={styles.fieldValue}>VP Controller</span>
        </div>
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>Address</span>
          <span className={styles.fieldValue} style={{ borderBottom: '2px solid #393a3d', borderRadius: 0, border: 'none', borderBottomWidth: 2, borderBottomStyle: 'solid', borderBottomColor: '#393a3d', padding: '6px 0' }}>&nbsp;</span>
        </div>
      </div>
    </div>
  )
}
