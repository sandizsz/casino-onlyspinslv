import { defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Category title used in navigation and listings',
      group: 'content',
    },
    {
      name: 'pageHeading',
      title: 'Page Heading (H1)',
      type: 'string',
      description: 'Custom heading to display as H1 on the category page (if empty, Title will be used)',
      group: 'content',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
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
      description: 'Add detailed rich text content for this casino category.',
      group: 'content',
    },
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO meta title for this category',
      group: 'seo',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'SEO meta description for this category',
      rows: 2,
      group: 'seo',
      validation: Rule => Rule.max(160).warning('Meta descriptions longer than 160 characters may be truncated by search engines'),
    },
  ],
});
