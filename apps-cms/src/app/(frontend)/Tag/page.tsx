import type { Metadata } from "next";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 3600; 

export const metadata: Metadata = {
  title: "Tags | Your Company Name",
  description: "Browse all tags related to our blogs and articles.",
  openGraph: {
    title: "Tags | Your Company Name",
    description: "Browse all tags related to our blogs and articles.",
    type: "website",
  },
};

export default async function TagPage() {
  const payload = await getPayloadClient();

  const tagData = await payload.find({
    collection: "tag",
  });

  const tags = tagData.docs || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "60px 20px",
        fontFamily: "'Roboto', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: 700,
          color: "#111",
          textAlign: "center",
          marginBottom: "50px", 
        }}
      >
        Tags
      </h1>

      {tags.length === 0 && (
        <p style={{ color: "#111", textAlign: "center", fontSize: "18px" }}>
          No tags found.
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        {tags.map((tag: any) => (
          <div
            key={tag.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "12px 20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontWeight: 600,
              color: "#111",
              fontSize: "16px",
              textAlign: "center",
              transition: "all 0.3s",
            }}
          >
            {tag.name}
          </div>
        ))}
      </div>
    </div>
  );
}

