import { defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'richText',
      title: 'Rich Text Section',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: { hotspot: true }
        },
        {
          type: 'table'
        }
      ],
      description: 'Add detailed rich text content for this casino category.'
    },
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO meta title for this category',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'SEO meta description for this category',
      rows: 2,
    },
  ],
});
