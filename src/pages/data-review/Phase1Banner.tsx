import { CircleCheck } from '@design-systems/icons'
import { Button } from '@ids-ts/button'
import '@ids-ts/button/dist/main.css'
import intuitAssistIcon from '../../assets/icons/intuit-assist.svg'
import styles from '../../styles/data-review/Phase1Banner.module.css'

interface Phase1BannerProps {
  resolved: number
  total: number
  /** All import flags resolved */
  flagsCleared: boolean
  /** Soft complete: flags cleared AND all packet docs reviewed */
  complete: boolean
  /** Whether the CPA has started opening source docs for import review */
  importsStarted?: boolean
  /** Begin import review — reveals source documents on the right */
  onStartImports?: () => void
}

/**
 * ProtoA — Import accuracy step header. Progress + start/complete state.
 * Remaining-document attention (copy + CTA) lives on Phase1IssueBanner (documents mode).
 * Document review after flags clear is optional (soft recommendation).
 */
export default function Phase1Banner({
  resolved,
  total,
  flagsCleared,
  complete,
  importsStarted = false,
  onStartImports,
}: Phase1BannerProps) {
  return (
    <div
      className={[styles.banner, flagsCleared ? styles.bannerComplete : ''].filter(Boolean).join(' ')}
    >
      <div className={styles.left}>
        <img src={intuitAssistIcon} alt="" className={styles.icon} />
        <div className={styles.text}>
          {flagsCleared ? (
            <>
              <span className={styles.title}>Import accuracy confirmed</span>
              <span className={styles.subtitle}>
                {complete
                  ? 'All flagged fields and source documents have been reviewed.'
                  : 'Flags are cleared. Reviewing remaining documents is recommended.'}
              </span>
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
        {!flagsCleared && (
          <span className={styles.counter}>
            <strong className={styles.counterNum}>{resolved}</strong> of {total} flags resolved
          </span>
        )}

        {!flagsCleared && !importsStarted && onStartImports && (
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
            <CircleCheck size="small" /> All documents reviewed
          </span>
        )}
      </div>
    </div>
  )
}
