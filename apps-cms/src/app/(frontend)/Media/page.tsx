import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Media Gallery | Your Site Name',
  description: 'Browse our media gallery including images and assets.',
  openGraph: {
    title: 'Media Gallery',
    description: 'Images and media assets',
    type: 'website',
  },
}

const getMedia = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return payload.find({
      collection: 'media',
      depth: 0,
    })
  },
  ['media'],             
  { revalidate: 3600 }
)

export default async function MediaPage() {
  const mediaData = await getMedia()
  const media = mediaData.docs || []

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "48px", fontWeight: 700 }}>
        Media
      </h1>

      {media.length === 0 && <p>No media found.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "30px",
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        {media.map((m: any) => (
          <div
            key={m.id}
            style={{
              background: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={m.url}
              alt={m.alt || m.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "16px" }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#111",
                  marginBottom: "8px",
                }}
              >
                {m.title}
              </h2>
              <p style={{ fontSize: "14px", color: "#666" }}>
                {m.filename}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
