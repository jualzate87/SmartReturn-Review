import { CircleCheck } from '@design-systems/icons'
import { Button } from '@ids-ts/button'
import '@ids-ts/button/dist/main.css'
import intuitAssistIcon from '../../assets/icons/intuit-assist.svg'
import styles from '../../styles/data-review/Phase1Banner.module.css'

interface Phase1BannerProps {
  resolved: number
  total: number
  complete: boolean
  /** Whether the CPA has started opening source docs for import review */
  importsStarted?: boolean
  /** Begin import review — reveals source documents on the right */
  onStartImports?: () => void
}

/**
 * ProtoA — Import accuracy banner. Reflects live import-flag progress and offers
 * "Start reviewing imports" until the source panel is open. No Phase 2 / AI handoff.
 */
export default function Phase1Banner({
  resolved,
  total,
  complete,
  importsStarted = false,
  onStartImports,
}: Phase1BannerProps) {
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

        {!complete && !importsStarted && onStartImports && (
          <Button
            priority="primary"
            size="medium"
            onClick={onStartImports}
          >
            Start reviewing imports
          </Button>
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
