import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { MediaGallery } from './MediaGallery'

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
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex flex-col items-center text-center gap-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Media
          </h1>
          <p className="max-w-2xl text-lg text-gray-600">
            Browse our media gallery including images and assets.
          </p>
        </header>
        <MediaGallery media={media} />
      </div>
    </div>
  )
}
