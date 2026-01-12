import { Metadata } from "next"
import { unstable_cache } from "next/cache"


export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: { revalidate: 3600 },
  })

  if (!res.ok) return []

  const data = await res.json()

  return data.docs
    .filter((blog: any) => typeof blog.slug === "string" && blog.slug.length)
    .map((blog: any) => ({ slug: blog.slug }))
}

const getImageUrl = (img: any) =>
  img?.url ? `http://localhost:3000${img.url}` : ""

const getBlogBySlug = unstable_cache(
  async (slug: string) => {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
      next: {
        revalidate: 3600,
        tags: [`blog-${slug}`],
      },
    })

    if (!res.ok) throw new Error("Blog not found")
    return res.json()
  },
  ["blog-by-slug"],
  { revalidate: 3600 }
)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      images: blog.featuredImage ? [{ url: getImageUrl(blog.featuredImage) }] : [],
    },
  }
}

export default async function BlogDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  return (
    <main className="bg-[#f6f7f9] flex justify-center px-4 py-[72px] font-sans">
      <article className="w-full max-w-[760px] bg-white rounded-[12px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)]">

        {blog.featuredImage?.url && (
          <img
            src={`http://localhost:3000${blog.featuredImage.url}`}
            alt={blog.title}
            className="w-full h-[390px] object-cover"
          />
        )}
        <div className="pt-2 pb-6 pr-8 pl-[10px] space-y-0">
          <h1 className="text-[26px] font-semibold leading-[1.25] text-[#0a0a0a]">
            {blog.title}
          </h1>

          <p className="text-[16px] leading-[1.55] text-[#222] font-serif">
            {blog.description}
          </p>

          <div className="flex items-center gap-[6px] text-[12.5px] text-[#555]">
            <span className="font-semibold text-[#222] font-serif">
              Tag:
            </span>
            {blog.tags.map((tag: any) => (
              <span
                key={tag.id}
                className="px-[9px] py-[3px] bg-[#eec66aff] rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}




