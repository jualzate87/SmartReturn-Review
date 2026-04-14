import { useState, useEffect } from 'react'
import Trowser from '@ids-ts/trowser'
import '@ids-ts/trowser/dist/main.css'
import { SteppedProgress, Step } from '@cgds/stepped-progress'
import UploadStep from './import/UploadStep'

// Internal steps: 0 = upload, 1 = review personal, 2 = prior year,
// 3 = loading, 4 = success
const STEP_TITLES: Record<number, string> = {
  0: 'Onboard new clients with 1040 import',
  1: 'Create a new client and return from a 1040.',
  2: 'Create a new client and return from a 1040.',
  3: 'Onboard new clients with 1040 import',
  4: 'Onboard new clients with 1040 import',
}

const PROGRESS_CURRENT: Record<number, number> = {
  0: 1,
  1: 2,
  2: 3,
  3: 6,
  4: 6,
}

const PROGRESS_COMPLETED: Record<number, number[]> = {
  0: [],
  1: [1],
  2: [1, 2],
  3: [1, 2, 3, 4, 5],
  4: [1, 2, 3, 4, 5],
}

export default function ImportPage() {
  const [trowserOpen, setTrowserOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    setTrowserOpen(true)
  }, [])

  const handleClose = () => {
    setTrowserOpen(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f5f8' }}>
      <Trowser
        open={trowserOpen}
        title={STEP_TITLES[currentStep]}
        dismissible
        hideOverflow
        onClose={handleClose}
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

        <div>
          {currentStep === 0 && (
            <UploadStep onFileAttached={() => setCurrentStep(1)} />
          )}
          {currentStep === 1 && <p style={{ padding: '2rem', textAlign: 'center' }}>Screen 6 — Review personal info</p>}
          {currentStep === 2 && <p style={{ padding: '2rem', textAlign: 'center' }}>Screen 7 — Prior year info</p>}
          {currentStep === 3 && <p style={{ padding: '2rem', textAlign: 'center' }}>Screens 8-9 — Loading</p>}
          {currentStep === 4 && <p style={{ padding: '2rem', textAlign: 'center' }}>Screen 10 — Success</p>}
        </div>
      </Trowser>
    </div>
  )
}
