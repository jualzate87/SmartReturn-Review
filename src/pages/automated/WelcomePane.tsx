import intuitAssistGif from '../../assets/intuit-assist-animation.gif'
import styles from '../../styles/automated/WelcomePane.module.css'

interface WelcomePaneProps {
  onPromptClick: (prompt: string) => void
}

const STARTER_PROMPTS = [
  'Create client questionnaire and document checklist',
  "Summarize last year's 1040",
]

export default function WelcomePane({ onPromptClick }: WelcomePaneProps) {
  return (
    <div className={styles.container}>
      {/* Intuit Assist animated logo */}
      <div className={styles.logoWrapper}>
        <img
          src={intuitAssistGif}
          alt="Intuit Assist"
          className={styles.logoGif}
        />
      </div>

      {/* Starter prompt chips */}
      <div className={styles.promptsRow}>
        {STARTER_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            className={styles.prompt}
            onClick={() => onPromptClick(prompt)}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
