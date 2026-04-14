import { useState, useEffect } from 'react'
import Trowser from '@ids-ts/trowser'
import '@ids-ts/trowser/dist/main.css'
import { SteppedProgress, Step } from '@cgds/stepped-progress'
import UploadStep from './import/UploadStep'
import ReviewPersonalStep from './import/ReviewPersonalStep'

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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '118px',
            padding: '20px 0',
            background: '#ffffff',
            borderBottom: '1px solid var(--color-container-border-primary, #d5dee3)',
            boxShadow: '0 1px 4px rgba(76, 85, 91, 0.2)',
            flexShrink: 0,
          }}>
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

          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {currentStep === 0 && (
              <UploadStep onFileAttached={() => setCurrentStep(1)} />
            )}
            {currentStep === 1 && <ReviewPersonalStep />}
            {currentStep === 2 && <p style={{ padding: '2rem', textAlign: 'center' }}>Screen 7 — Prior year info</p>}
            {currentStep === 3 && <p style={{ padding: '2rem', textAlign: 'center' }}>Screens 8-9 — Loading</p>}
            {currentStep === 4 && <p style={{ padding: '2rem', textAlign: 'center' }}>Screen 10 — Success</p>}
          </div>
        </div>
      </Trowser>
    </div>
  )
}
