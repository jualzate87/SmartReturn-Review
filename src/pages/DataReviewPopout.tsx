import ReviewTab from './data-review/ReviewTab'
import DocumentPreview from './data-review/DocumentPreview'
import DetailFields from './data-review/DetailFields'
import w2BingEquipment from '../assets/w2-bing-equipment.png'

export default function DataReviewPopout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <ReviewTab />
      <div style={{ height: '40%', flexShrink: 0, overflow: 'hidden' }}>
        <DocumentPreview imageSrc={w2BingEquipment} alt="W-2 Bing Equipment" />
      </div>
      <DetailFields
        formTitle="Details: Wages, Salaries, Tips (W-2)"
        tabs={[
          { label: 'Bing Equipment', active: true },
          { label: 'Tech circle', active: false },
        ]}
      />
    </div>
  )
}
