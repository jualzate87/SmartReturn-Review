import styles from '../../styles/data-review/DocumentPreview.module.css'

interface DocumentPreviewProps {
  imageSrc: string
  alt: string
}

export default function DocumentPreview({ imageSrc, alt }: DocumentPreviewProps) {
  return (
    <div className={styles.container}>
      <img
        src={imageSrc}
        alt={alt}
        className={styles.documentImage}
      />
    </div>
  )
}
