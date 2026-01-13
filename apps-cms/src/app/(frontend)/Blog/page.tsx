import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { BlogGrid } from './BlogGrid'

export const revalidate = 60

const getImageUrl = (img: any) =>
  img?.url ? `http://localhost:3000${img.url}` : ''

const getBlogs = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'blog' })
    return result.docs
  },
  ['blog'],
  { revalidate: 60 }
)

export async function generateMetadata(): Promise<Metadata> {
  const blogs = await getBlogs()

  return {
    title: 'Blogs | Your Company Name',
    description: 'Read the latest blogs, tutorials, and updates from our team.',
    openGraph: {
      title: 'Blogs | Your Company Name',
      description: 'Latest articles and updates',
      type: 'website',
      images: blogs
        .filter((b) => b.featuredImage)
        .map((b) => ({ url: getImageUrl(b.featuredImage) })),
    },
  }
}

export default async function BlogListPage() {
  const blogs = await getBlogs()


  return (

    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Blogs
          </h1>
          <p className="max-w-2xl text-lg text-gray-600">
            Read the latest blogs, tutorials, and updates from our team.
          </p>
        </header>
        <BlogGrid blogs={blogs} />
      </div>
    </div>
  )
}
