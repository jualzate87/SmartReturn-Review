import { useState, useEffect } from 'react'
import Trowser from '@ids-ts/trowser'
import '@ids-ts/trowser/dist/main.css'
import { Button } from '@ids-ts/button'
import '@ids-ts/button/dist/main.css'
import LeftPanel from './automated/LeftPanel'
import styles from '../styles/automated/AutomatedOnboardingPage.module.css'

export type ChatStep =
  | 'welcome'
  | 'generating-questionnaire'
  | 'questionnaire'
  | 'questionnaire-checklist'
  | 'generating-email'
  | 'email-draft'
  | 'email-sent'

export default function AutomatedOnboardingPage() {
  const [trowserOpen, setTrowserOpen] = useState(false)
  const [chatStep, setChatStep] = useState<ChatStep>('welcome')

  useEffect(() => {
    setTrowserOpen(true)
  }, [])

  return (
    <div style={{ minHeight: '100vh' }}>
      <Trowser
        open={trowserOpen}
        title="Automated client onboarding"
        dismissible
        hideOverflow
        showCancelFooterButton
        cancelFooterButtonLabel="Cancel"
        footerButton={[
          <Button key="open-return" priority="primary" onClick={() => {}}>Open return</Button>
        ]}
        onClose={() => setTrowserOpen(false)}
      >
        {/* Body: left panel + right panel — fills Trowser content area */}
        <div className={styles.body}>
          <div className={styles.leftPanel}>
            <LeftPanel />
          </div>
          <div className={styles.rightPanel}>
            <p style={{ padding: '1rem', color: '#6b6c72', fontSize: 14 }}>Right panel — Chat ({chatStep})</p>
          </div>
        </div>
      </Trowser>
    </div>
  )
}
