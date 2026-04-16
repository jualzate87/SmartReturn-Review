import { PopOut } from '@design-systems/icons'
import sparklesIcon from '../../assets/icons/sparkles.svg'
import styles from '../../styles/data-review/ReviewTab.module.css'

const TABS = [
  { label: 'W-2s', key: 'w2s' as const },
  { label: '1099-DIVs', key: '1099-divs' as const },
  { label: '1099-INTs', key: '1099-ints' as const },
  { label: 'Schedule K-1', key: 'k1' as const },
]

interface ReviewTabProps {
  activeTopTab?: string
  onTopTabChange?: (tab: 'w2s' | '1099-ints' | 'k1') => void
  onTabChange?: (tab: string) => void
  onPopOut?: () => void
}

export default function ReviewTab({ activeTopTab = 'w2s', onTopTabChange, onTabChange, onPopOut }: ReviewTabProps) {

  const handleTabClick = (key: string, label: string) => {
    if (key === 'w2s' || key === '1099-ints' || key === 'k1') {
      onTopTabChange?.(key)
    }
    onTabChange?.(label)
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={styles.tab}
            onClick={() => handleTabClick(tab.key, tab.label)}
          >
            <div className={styles.tabContent}>
              <img src={sparklesIcon} alt="" className={styles.tabIcon} />
              <span className={`${styles.tabLabel} ${tab.key === activeTopTab ? styles.tabLabelActive : styles.tabLabelInactive}`}>
                {tab.label}
              </span>
            </div>
            <div className={styles.tabUnderline}>
              <div className={tab.key === activeTopTab ? styles.tabUnderlineActive : styles.tabUnderlineInactive} />
            </div>
          </button>
        ))}
      </div>

      {/* Pop-out button — opens right panel in new tab */}
      <button
        className={styles.popOutBtn}
        aria-label="Pop out to new window"
        onClick={onPopOut}
      >
        <PopOut size="medium" />
      </button>
    </div>
  )
}
