Reset the prototype to a clean starting point.

## What to Do

1. Replace `src/App.tsx` with the starter template:

```tsx
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
```

2. Replace `src/styles/App.module.css` with the starter styles:

```css
#root {
  width: 100%;
  min-height: 100vh;
}

.app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--space-container-padding-x-large, 32px);
}

.app-container {
  max-width: 560px;
  text-align: center;
}

.app-heading {
  font-size: var(--font-size-heading-2, 40px);
  font-weight: var(--font-weight-heading, 600);
  line-height: var(--line-height-heading, 1.3);
  font-family: var(--font-family-heading);
  color: var(--color-text-primary, #393A3D);
  margin: 0 0 var(--space-medium, 16px);
}

.app-body {
  font-size: var(--font-size-body-1, 20px);
  font-weight: var(--font-weight-body, 400);
  line-height: var(--line-height-body, 1.5);
  font-family: var(--font-family-body);
  color: var(--color-text-secondary, #6B6C72);
  margin: 0 0 var(--space-small, 12px);
}

.app-caption {
  font-size: var(--font-size-body-3, 14px);
  font-weight: var(--font-weight-body, 400);
  line-height: var(--line-height-body, 1.5);
  font-family: var(--font-family-body);
  color: var(--color-text-tertiary, #6B6C72);
  margin: 0 0 var(--space-large, 24px);
}

.app-caption code {
  font-size: var(--font-size-body-3, 14px);
  background-color: var(--color-container-background-secondary, #F4F5F8);
  padding: 2px 6px;
  border-radius: var(--radius-small, 4px);
}

.app-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-component-gap-medium, 8px);
}
```

3. Confirm the reset is complete. Let the designer know they can start fresh with `/prototype`.
