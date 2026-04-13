import Trowser from '@ids-ts/trowser'
import '@ids-ts/trowser/dist/main.css'
import { Button } from '@ids-ts/button'
import '@ids-ts/button/dist/main.css'
import styles from '../styles/ImportPage.module.css'

const STEP_TITLES: Record<number, string> = {
  0: 'Onboard new clients with 1040 import',
  1: 'Onboard new clients with 1040 import',
  2: 'Create a new client and return from a 1040.',
  3: 'Create a new client and return from a 1040.',
  4: 'Onboard new clients with 1040 import',
  5: 'Onboard new clients with 1040 import',
  6: 'Onboard new clients with 1040 import',
}

export default function ImportPage() {
  const currentStep = 0

  return (
    <Trowser
      open={true}
      title={STEP_TITLES[currentStep]}
      dismissible
      onClose={() => {}}
    >
      <div className={styles.contentArea}>
        {/* Step content will go here */}
      </div>
      <div className={styles.footer}>
        <Button priority="tertiary" onClick={() => {}}>Cancel</Button>
        <div className={styles.footerRight}>
          <Button priority="primary" onClick={() => {}}>Next</Button>
        </div>
      </div>
    </Trowser>
  )
}
