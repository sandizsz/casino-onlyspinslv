import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
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
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'richText',
      title: 'Rich Content',
      description: 'Additional content to display on the author page',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
          ],
        },
        { type: 'table' },
      ],
      group: 'content',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter URL',
      type: 'url',
      description: 'Full URL to Twitter profile (leave empty to hide icon)',
      group: 'content',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      description: 'Full URL to Facebook profile (leave empty to hide icon)',
      group: 'content',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Full URL to LinkedIn profile (leave empty to hide icon)',
      group: 'content',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'url',
      description: 'Full URL to TikTok profile (leave empty to hide icon)',
      group: 'content',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
      description: 'Full URL to YouTube channel (leave empty to hide icon)',
      group: 'content',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title used for SEO (if empty, author name will be used)',
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Description used for SEO (if empty, bio will be used)',
      group: 'seo',
      validation: Rule => Rule.max(160).warning('Meta descriptions longer than 160 characters may be truncated by search engines'),
    }),
  ],
});
