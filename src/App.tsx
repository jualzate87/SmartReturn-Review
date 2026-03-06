import Button from '@ids-ts/button'
import '@ids-ts/button/dist/main.css'
import styles from './styles/App.module.css'

function App() {
  return (
    <main className={styles.app}>
      <div className={styles.appContainer}>
        <h1 className={styles.appHeading}>IDS Prototyping</h1>
        <p className={styles.appBody}>
          Your environment is ready. Start building with the Intuit Design System.
        </p>
        <p className={styles.appCaption}>
          Edit <code>src/App.tsx</code> to begin prototyping.
        </p>
        <div className={styles.appActions}>
          <Button purpose="standard" priority="primary">
            Get Started
          </Button>
        </div>
      </div>
    </main>
  )
}

export default App
