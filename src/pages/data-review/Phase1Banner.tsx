import { CircleCheck } from '@design-systems/icons'
import intuitAssistIcon from '../../assets/icons/intuit-assist.svg'
import styles from '../../styles/data-review/Phase1Banner.module.css'

interface Phase1BannerProps {
  resolved: number
  total: number
  complete: boolean
  /** Kept optional for ProtoC API compatibility — unused in ProtoA (no Phase 2). */
  onContinue?: () => void
}

/**
 * ProtoA — Import accuracy banner. Reflects live import-flag progress.
 * No Phase 2 / AI diagnostics handoff (that's ProtoC-only).
 */
export default function Phase1Banner({ resolved, total, complete }: Phase1BannerProps) {
  return (
    <div className={`${styles.banner} ${complete ? styles.bannerComplete : ''}`}>
      <div className={styles.left}>
        <img src={intuitAssistIcon} alt="" className={styles.icon} />
        <div className={styles.text}>
          {complete ? (
            <>
              <span className={styles.title}>Import accuracy confirmed</span>
              <span className={styles.subtitle}>All flagged fields have been reviewed.</span>
            </>
          ) : (
            <>
              <span className={styles.title}>Import accuracy</span>
              <span className={styles.subtitle}>
                Verify the flagged fields against each source document.
              </span>
            </>
          )}
        </div>
      </div>

      <div className={styles.right}>
        {!complete && (
          <span className={styles.counter}>
            <strong className={styles.counterNum}>{resolved}</strong> of {total} flags resolved
          </span>
        )}
        {complete && (
          <span className={styles.completeBadge}>
            <CircleCheck size="small" /> All flags resolved
          </span>
        )}
      </div>
    </div>
  )
}
