import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


export const Media: CollectionConfig = {
  slug: 'media',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'filename', 'alt', 'updatedAt'],
  },

  access: {
    read: () => true,
  },

  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: ['image/*'],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
