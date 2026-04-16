import { useState } from 'react'
import { Menu, Close, Plus, ChevronDown } from '@design-systems/icons'
import styles from '../../styles/data-review/SubTab.module.css'

interface SubTabItem {
  label: string
}

interface SubTabProps {
  tabs: SubTabItem[]
  onTabChange?: (index: number) => void
}

export default function SubTab({ tabs, onTabChange }: SubTabProps) {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    onTabChange?.(index)
  }

  return (
    <div className={styles.container}>
      {/* Menu icon — p-6px, no border */}
      <button className={styles.menuBtn} aria-label="Menu">
        <Menu size="medium" />
      </button>

      {/* Tab items — each has border-b-2, px-16px, flex-col gap-2px */}
      {tabs.map((tab, i) => (
        <button
          key={tab.label}
          className={styles.tab}
          onClick={() => handleTabClick(i)}
        >
          {/* Content row: gap-8px, py-6px */}
          <div className={styles.tabContent}>
            <span className={i === activeTab ? styles.tabLabelActive : styles.tabLabelInactive}>
              {tab.label}
            </span>
            <span className={styles.closeIcon}>
              <Close size="xsmall" />
            </span>
          </div>
          {/* Bottom stroke */}
          <div className={i === activeTab ? styles.strokeActive : styles.strokeInactive} />
        </button>
      ))}

      {/* Border + Button group: flex-1 fills remaining space, buttons at end */}
      <div className={styles.borderAndButtons}>
        <div className={styles.borderFill} />
        <div className={styles.buttonGroup}>
          {/* + button */}
          <button className={styles.addBtn} aria-label="Add tab">
            <Plus size="small" />
          </button>
          {/* View All button */}
          <button className={styles.viewAllBtn}>
            <span className={styles.viewAllLabel}>View All</span>
            <span className={styles.viewAllChevron}>
              <ChevronDown size="medium" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
