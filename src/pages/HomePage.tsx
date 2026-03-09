import { H2, B1, B2, B3 } from '@ids-ts/typography'
import '@ids-ts/typography/dist/main.css'
import { Card, CardContent } from '@ids-ts/cards'
import '@ids-ts/cards/dist/main.css'
import styles from '../styles/HomePage.module.css'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <H2>Ready to prototype.</H2>
        <B1>
          Describe what you want to build and Claude will create it using real
          Intuit Design System components and design tokens.
        </B1>
      </div>

      <div className={styles.grid}>
        <Card size="standard">
          <CardContent>
            <B2 weight="demi">Build from a description</B2>
            <B3>
              Type <code>/prototype</code> followed by what you want to build.
            </B3>
          </CardContent>
        </Card>

        <Card size="standard">
          <CardContent>
            <B2 weight="demi">Build from Figma</B2>
            <B3>
              Type <code>/figma</code> with a Figma URL or pasted design data.
            </B3>
          </CardContent>
        </Card>

        <Card size="standard">
          <CardContent>
            <B2 weight="demi">Start with a layout</B2>
            <B3>
              Type <code>/layout</code> followed by a type: sidebar, dashboard,
              split-view, or centered.
            </B3>
          </CardContent>
        </Card>

        <Card size="standard">
          <CardContent>
            <B2 weight="demi">Generate a page</B2>
            <B3>
              Type <code>/page</code> followed by a type: settings, form, list,
              table, detail, or onboarding.
            </B3>
          </CardContent>
        </Card>

        <Card size="standard">
          <CardContent>
            <B2 weight="demi">Look up a component</B2>
            <B3>
              Type <code>/component</code> followed by a component name to see
              its API and usage patterns.
            </B3>
          </CardContent>
        </Card>

        <Card size="standard">
          <CardContent>
            <B2 weight="demi">Find a design token</B2>
            <B3>
              Type <code>/token-lookup</code> followed by what you need — a
              color, spacing value, or typography style.
            </B3>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
