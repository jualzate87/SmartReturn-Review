import { useState } from 'react'
import Trowser from '@ids-ts/trowser'
import '@ids-ts/trowser/dist/main.css'
import StepFlow, { Step, useStepFlow } from '@ids-ts/step-flow'
import '@ids-ts/step-flow/dist/main.css'
import { Button } from '@ids-ts/button'
import '@ids-ts/button/dist/main.css'

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

export default function ImportPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const stepFlowState = useStepFlow()

  const handleNext = () => {
    if (currentStep < 6) {
      const nextStep = currentStep + 1
      const currentFlowIndex = STEP_FLOW_INDEX[currentStep]
      const nextFlowIndex = STEP_FLOW_INDEX[nextStep]
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

  // Build footer buttons array for Trowser footerButton prop
  const footerButtons: React.ReactElement[] = []

  if (currentStep === 6) {
    footerButtons.push(
      <Button key="view-profile" priority="secondary" onClick={() => {}}>View client profile</Button>
    )
    footerButtons.push(
      <Button key="open-return" priority="primary" onClick={() => {}}>Open return</Button>
    )
  } else if (currentStep !== 4) {
    // Show Next on all steps except loading step (4)
    footerButtons.push(
      <Button key="next" priority="primary" onClick={handleNext}>Next</Button>
    )
  }

  // Cancel shows on steps 2, 3, 5, 6
  const showCancel = [2, 3, 5, 6].includes(currentStep)
  // Feedback shows on screens 4-7 and 10 (steps 0-3 and 6)
  const showFeedback = [0, 1, 2, 3, 6].includes(currentStep)

  return (
    <Trowser
      open={true}
      title={STEP_TITLES[currentStep]}
      dismissible
      hideOverflow
      feedback={showFeedback}
      showCancelFooterButton={showCancel}
      cancelFooterButtonLabel="Cancel"
      onClose={handleClose}
      footerButton={footerButtons.length > 0 ? footerButtons : undefined}
    >
      <StepFlow
        {...stepFlowState}
        progressType="indicator"
        width="large"
      >
        <Step title="Upload file" hasNextButton={false} hasPreviousButton={false}>
          {/* UploadStep content — Task 3 */}
          <p style={{ padding: '2rem', textAlign: 'center' }}>Screen 4 — Upload step</p>
        </Step>
        <Step title="General information" hasNextButton={false} hasPreviousButton={false}>
          <p style={{ padding: '2rem', textAlign: 'center' }}>Screen 5 — File attached</p>
        </Step>
        <Step title="Other information" hasNextButton={false} hasPreviousButton={false}>
          <p style={{ padding: '2rem', textAlign: 'center' }}>Screen 6 — Review personal</p>
        </Step>
        <Step title="Client details" hasNextButton={false} hasPreviousButton={false}>
          <p style={{ padding: '2rem', textAlign: 'center' }}>Screen 7 — Prior year</p>
        </Step>
        <Step title="Create return" hasNextButton={false} hasPreviousButton={false}>
          <p style={{ padding: '2rem', textAlign: 'center' }}>Screens 8–10 — Loading + Success</p>
        </Step>
      </StepFlow>
    </Trowser>
  )
}
