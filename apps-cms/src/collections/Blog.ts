import { CollectionConfig } from 'payload'
export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featuredImage', 'tags', 'updatedAt'],
  },
  access: { read: () => true },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
              label: false,
            },
          ],
        },
        {
          label: 'Setting',
          fields: [

            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'tag',
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
}
