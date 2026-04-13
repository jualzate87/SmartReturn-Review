import { useState, useEffect } from 'react'
import Trowser from '@ids-ts/trowser'
import '@ids-ts/trowser/dist/main.css'
import { SteppedProgress, Step } from '@cgds/stepped-progress'
import { Button } from '@ids-ts/button'
import '@ids-ts/button/dist/main.css'

const STEP_TITLES: Record<number, string> = {
  0: 'Onboard new clients with 1040 import',
  1: 'Onboard new clients with 1040 import',
  2: 'Create a new client and return from a 1040.',
  3: 'Create a new client and return from a 1040.',
  4: 'Onboard new clients with 1040 import',
  5: 'Onboard new clients with 1040 import',
  6: 'Onboard new clients with 1040 import',
}

// Maps internal step (0-6) to SteppedProgress current (1-based)
const PROGRESS_CURRENT: Record<number, number> = {
  0: 1,
  1: 2,
  2: 2,
  3: 3,
  4: 6,
  5: 6,
  6: 6,
}

// completed = array of 1-based step indices that are done
const PROGRESS_COMPLETED: Record<number, number[]> = {
  0: [],
  1: [1],
  2: [1],
  3: [1, 2],
  4: [1, 2, 3, 4, 5],
  5: [1, 2, 3, 4, 5],
  6: [1, 2, 3, 4, 5],
}

export default function ImportPage() {
  const [trowserOpen, setTrowserOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    setTrowserOpen(true)
  }, [])

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(s => s + 1)
  }

  const handleClose = () => {
    setTrowserOpen(false)
  }

  // Footer buttons per step
  const footerButtons: React.ReactElement[] = []
  if (currentStep === 6) {
    footerButtons.push(
      <Button key="view-profile" priority="secondary" onClick={() => {}}>View client profile</Button>,
      <Button key="open-return" priority="primary" onClick={() => {}}>Open return</Button>
    )
  } else if (currentStep !== 4) {
    footerButtons.push(
      <Button key="next" priority="primary" onClick={handleNext}>Next</Button>
    )
  }

  const showCancel = [2, 3, 5, 6].includes(currentStep)

  return (
    <div style={{ minHeight: '100vh', background: '#f4f5f8' }}>
      <Trowser
        open={trowserOpen}
        title={STEP_TITLES[currentStep]}
        dismissible
        hideOverflow
        showCancelFooterButton={showCancel}
        cancelFooterButtonLabel="Cancel"
        onClose={handleClose}
        footerButton={footerButtons.length > 0 ? footerButtons : undefined}
      >
        <div style={{ padding: 'var(--space-container-padding-large) var(--space-container-padding-large) 0' }}>
          <SteppedProgress
            completed={PROGRESS_COMPLETED[currentStep]}
            current={PROGRESS_CURRENT[currentStep]}
            direction="horizontal"
            size="small"
          >
            <Step>Upload file</Step>
            <Step>General information</Step>
            <Step>Other information</Step>
            <Step>Client details</Step>
            <Step>Create return</Step>
          </SteppedProgress>
        </div>

        <div style={{ padding: '2rem', textAlign: 'center' }}>
          {currentStep <= 1 && <p>Screen 4/5 — Upload content goes here</p>}
          {currentStep === 2 && <p>Screen 6 — Review personal info</p>}
          {currentStep === 3 && <p>Screen 7 — Prior year info</p>}
          {currentStep === 4 && <p>Screen 8 — Loading (empty)</p>}
          {currentStep === 5 && <p>Screen 9 — Loading (active)</p>}
          {currentStep === 6 && <p>Screen 10 — Success</p>}
        </div>
      </Trowser>
    </div>
  )
}
