import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'

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
    <div style={{ padding: "60px 20px", background: "#f8f8f8ff" }}>
      <h1 style={{ textAlign: "center", color: 'black' }}>Blogs</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {blogs.map((blog: any) => (
          <div
            key={blog.id}
            style={{
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {blog.featuredImage?.url && (
              <img
                src={`http://localhost:3000${blog.featuredImage.url}`}
                alt={blog.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />
            )}

            <div style={{ padding: "22px" }}>
              <h2 style={{ marginBottom: "10px", color: "black" }}>
                {blog.title}
              </h2>

              <p style={{ marginBottom: "14px", color: "#555" }}>
                {blog.description}
              </p>

              <Link
                rel="canonical"
                href={`/Blog/${blog.slug ?? blog.id}`}
                style={{
                  color: "#000",
                  fontWeight: 500,
                  textDecoration: "underline",
                }}
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
