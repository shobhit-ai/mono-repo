import type { CollectionConfig } from 'payload'

export const Tag: CollectionConfig = {
  slug: 'tag',

  admin: {
    useAsTitle: 'name',
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        description: 'Unique URL-friendly identifier for this tag',
      },
    },
  ],
}
