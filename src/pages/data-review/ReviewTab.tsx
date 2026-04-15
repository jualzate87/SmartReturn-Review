import { useState } from 'react'
import { DotsSix } from '@design-systems/icons'
import sparklesIcon from '../../assets/icons/sparkles.svg'
import styles from '../../styles/data-review/ReviewTab.module.css'

const TABS = ['W-2s', '1099-DIVs', '1099-INTs', 'Schedule K-1']

interface ReviewTabProps {
  onTabChange?: (tab: string) => void
}

export default function ReviewTab({ onTabChange }: ReviewTabProps) {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    onTabChange?.(TABS[index])
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={styles.tab}
            onClick={() => handleTabClick(i)}
          >
            <div className={styles.tabContent}>
              <img src={sparklesIcon} alt="" className={styles.tabIcon} />
              <span className={`${styles.tabLabel} ${i === activeTab ? styles.tabLabelActive : styles.tabLabelInactive}`}>
                {tab}
              </span>
            </div>
            <div className={styles.tabUnderline}>
              <div className={i === activeTab ? styles.tabUnderlineActive : styles.tabUnderlineInactive} />
            </div>
          </button>
        ))}
      </div>

      {/* Drag handle / pop-out button */}
      <button className={styles.popOutBtn} aria-label="Drag to rearrange">
        <DotsSix size="medium" />
      </button>
    </div>
  )
}
