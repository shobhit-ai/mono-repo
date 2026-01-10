import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'user',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'email',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
