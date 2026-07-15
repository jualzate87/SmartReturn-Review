import { CircleCheck, Document } from '@design-systems/icons'
import { Button } from '@ids-ts/button'
import '@ids-ts/button/dist/main.css'
import intuitAssistIcon from '../../assets/icons/intuit-assist.svg'
import styles from '../../styles/data-review/Phase1Banner.module.css'

interface Phase1BannerProps {
  resolved: number
  total: number
  /** All import flags resolved */
  flagsCleared: boolean
  /** Count of packet source docs (incl. Questionnaire) not yet mark-reviewed */
  unreviewedDocCount?: number
  /** Fully complete: flags cleared AND all packet docs reviewed */
  complete: boolean
  /** Whether the CPA has started opening source docs for import review */
  importsStarted?: boolean
  /** Begin import review — reveals source documents on the right */
  onStartImports?: () => void
  /** Jump to next source document that still needs a review */
  onReviewNextDocument?: () => void
}

/**
 * ProtoA — Import accuracy banner. No Phase 2 / AI handoff.
 * After flags clear, call out unreviewed source documents before import-complete.
 */
export default function Phase1Banner({
  resolved,
  total,
  flagsCleared,
  unreviewedDocCount = 0,
  complete,
  importsStarted = false,
  onStartImports,
  onReviewNextDocument,
}: Phase1BannerProps) {
  const needsDocReview = flagsCleared && unreviewedDocCount > 0 && !complete

  return (
    <div
      className={[
        styles.banner,
        complete ? styles.bannerComplete : '',
        needsDocReview ? styles.bannerDocReview : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.left}>
        {needsDocReview ? (
          <Document size="medium" className={styles.docIcon} aria-hidden />
        ) : (
          <img src={intuitAssistIcon} alt="" className={styles.icon} />
        )}
        <div className={styles.text}>
          {complete ? (
            <>
              <span className={styles.title}>Import accuracy confirmed</span>
              <span className={styles.subtitle}>
                All flagged fields and source documents have been reviewed.
              </span>
            </>
          ) : needsDocReview ? (
            <>
              <span className={styles.title}>
                {unreviewedDocCount}{' '}
                {unreviewedDocCount === 1 ? 'document left' : 'documents left'} to review
              </span>
              <span className={styles.subtitle}>
                Flags are cleared. Confirm each remaining source document before you finish import review.
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

        {needsDocReview && onReviewNextDocument && (
          <Button priority="secondary" size="medium" onClick={onReviewNextDocument}>
            Review next document
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
