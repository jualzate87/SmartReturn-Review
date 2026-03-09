import { D4, B1, B2, B3 } from '@ids-ts/typography'
import '@ids-ts/typography/dist/main.css'
import { Card, CardContent } from '@ids-ts/cards'
import '@ids-ts/cards/dist/main.css'
import {
  RulerPencil,
  Figma,
  GridTile,
  NewPage,
  IntegrationPuzzle,
  Eyedropper,
} from '@design-systems/icons'
import idsLogo from '../assets/ids-logo.svg'
import styles from '../styles/HomePage.module.css'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <img
          src={idsLogo}
          alt="Intuit Design System"
          className={styles.heroLogo}
        />
        <D4>Ready to prototype.</D4>
        <B1 className={styles.heroSubtitle}>
          Describe what you want to build and AI will help you create it using
          the Intuit Design System.
        </B1>
      </div>

      <div className={styles.grid}>
        <Card size="standard" disableCardClick>
          <CardContent>
            <div className={styles.cardInner}>
              <div className={styles.cardHeader}>
                <RulerPencil size="medium" className={styles.cardIcon} />
                <B2 weight="demi" className={styles.cardTitle}>Build from a description</B2>
              </div>
              <B3 as="p" className={styles.cardBody}>
                Type <code className={styles.code}>/prototype</code> followed by
                what you want to build.
              </B3>
            </div>
          </CardContent>
        </Card>

        <Card size="standard" disableCardClick>
          <CardContent>
            <div className={styles.cardInner}>
              <div className={styles.cardHeader}>
                <Figma size="medium" className={styles.cardIcon} />
                <B2 weight="demi" className={styles.cardTitle}>Build from Figma</B2>
              </div>
              <B3 as="p" className={styles.cardBody}>
                Type <code className={styles.code}>/figma</code> with a Figma
                URL or pasted design data.
              </B3>
            </div>
          </CardContent>
        </Card>

        <Card size="standard" disableCardClick>
          <CardContent>
            <div className={styles.cardInner}>
              <div className={styles.cardHeader}>
                <GridTile size="medium" className={styles.cardIcon} />
                <B2 weight="demi" className={styles.cardTitle}>Start with a layout</B2>
              </div>
              <B3 as="p" className={styles.cardBody}>
                Type <code className={styles.code}>/layout</code> followed by a
                type: sidebar, dashboard, split-view, or centered.
              </B3>
            </div>
          </CardContent>
        </Card>

        <Card size="standard" disableCardClick>
          <CardContent>
            <div className={styles.cardInner}>
              <div className={styles.cardHeader}>
                <NewPage size="medium" className={styles.cardIcon} />
                <B2 weight="demi" className={styles.cardTitle}>Generate a page</B2>
              </div>
              <B3 as="p" className={styles.cardBody}>
                Type <code className={styles.code}>/page</code> followed by a
                type: settings, form, list, table, detail, or onboarding.
              </B3>
            </div>
          </CardContent>
        </Card>

        <Card size="standard" disableCardClick>
          <CardContent>
            <div className={styles.cardInner}>
              <div className={styles.cardHeader}>
                <IntegrationPuzzle size="medium" className={styles.cardIcon} />
                <B2 weight="demi" className={styles.cardTitle}>Look up a component</B2>
              </div>
              <B3 as="p" className={styles.cardBody}>
                Type <code className={styles.code}>/component</code> followed by
                a component name to see its API and usage patterns.
              </B3>
            </div>
          </CardContent>
        </Card>

        <Card size="standard" disableCardClick>
          <CardContent>
            <div className={styles.cardInner}>
              <div className={styles.cardHeader}>
                <Eyedropper size="medium" className={styles.cardIcon} />
                <B2 weight="demi" className={styles.cardTitle}>Find a design token</B2>
              </div>
              <B3 as="p" className={styles.cardBody}>
                Type <code className={styles.code}>/token-lookup</code> followed
                by what you need — a color, spacing value, or typography style.
              </B3>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
