import { useState } from 'react'
import Trowser from '@ids-ts/trowser'
import '@ids-ts/trowser/dist/main.css'
import StepFlow, { Step, useStepFlow } from '@ids-ts/step-flow'
import '@ids-ts/step-flow/dist/main.css'
import { Button } from '@ids-ts/button'
import '@ids-ts/button/dist/main.css'
import styles from '../styles/ImportPage.module.css'

// step index 0 = screen 4 (Upload), 1 = screen 5 (File attached),
// 2 = screen 6 (Review personal), 3 = screen 7 (Prior year),
// 4 = screen 8 (Creating - empty), 5 = screen 9 (Creating - active),
// 6 = screen 10 (Success)
const STEP_TITLES: Record<number, string> = {
  0: 'Onboard new clients with 1040 import',
  1: 'Onboard new clients with 1040 import',
  2: 'Create a new client and return from a 1040.',
  3: 'Create a new client and return from a 1040.',
  4: 'Onboard new clients with 1040 import',
  5: 'Onboard new clients with 1040 import',
  6: 'Onboard new clients with 1040 import',
}

// Maps internal step index to StepFlow activeStepIndex (0-based, 5 steps)
const STEP_FLOW_INDEX: Record<number, number> = {
  0: 0,
  1: 0,
  2: 1,
  3: 2,
  4: 5,
  5: 5,
  6: 5,
}

// Whether to show footer buttons per step
const FOOTER_CONFIG: Record<number, { showCancel: boolean; showNext: boolean; showSuccess: boolean }> = {
  0: { showCancel: false, showNext: true, showSuccess: false },
  1: { showCancel: false, showNext: true, showSuccess: false },
  2: { showCancel: true, showNext: true, showSuccess: false },
  3: { showCancel: true, showNext: true, showSuccess: false },
  4: { showCancel: false, showNext: false, showSuccess: false },
  5: { showCancel: true, showNext: true, showSuccess: false },
  6: { showCancel: true, showNext: false, showSuccess: true },
}

export default function ImportPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const stepFlowState = useStepFlow()

  const handleNext = () => {
    if (currentStep < 6) {
      const nextStep = currentStep + 1
      const currentFlowIndex = STEP_FLOW_INDEX[currentStep]
      const nextFlowIndex = STEP_FLOW_INDEX[nextStep]
      // Only advance the StepFlow indicator when the visual step index actually increases
      if (nextFlowIndex > currentFlowIndex) {
        stepFlowState.goToNext()
      }
      setCurrentStep(nextStep)
    }
  }

  const handleClose = () => {
    setCurrentStep(0)
    stepFlowState.goToStep(0)
  }

  const footer = FOOTER_CONFIG[currentStep]

  return (
    <Trowser
      open={true}
      title={STEP_TITLES[currentStep]}
      dismissible
      stepFlow
      hideOverflow
      onClose={handleClose}
    >
      <StepFlow
        {...stepFlowState}
        progressType="indicator"
        width="large"
      >
        <Step title="Upload file" hasNextButton={false} hasPreviousButton={false}>
          <div className={styles.contentArea}>
            <p>Step {currentStep + 1} content</p>
          </div>
        </Step>
        <Step title="General information" hasNextButton={false} hasPreviousButton={false}>
          <div className={styles.contentArea} />
        </Step>
        <Step title="Other information" hasNextButton={false} hasPreviousButton={false}>
          <div className={styles.contentArea} />
        </Step>
        <Step title="Client details" hasNextButton={false} hasPreviousButton={false}>
          <div className={styles.contentArea} />
        </Step>
        <Step title="Create return" hasNextButton={false} hasPreviousButton={false}>
          <div className={styles.contentArea} />
        </Step>
      </StepFlow>

      <div className={styles.footer}>
        {footer.showCancel && (
          <Button priority="tertiary" onClick={handleClose}>Cancel</Button>
        )}
        {!footer.showCancel && <span />}
        <div className={styles.footerRight}>
          {footer.showSuccess && (
            <>
              <Button priority="secondary" onClick={() => {}}>View client profile</Button>
              <Button priority="primary" onClick={() => {}}>Open return</Button>
            </>
          )}
          {footer.showNext && (
            <Button priority="primary" onClick={handleNext}>Next</Button>
          )}
        </div>
      </div>
    </Trowser>
  )
}
