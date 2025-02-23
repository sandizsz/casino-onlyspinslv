import { defineType } from 'sanity';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export const casinoType = defineType({
  name: 'casino',
  title: 'Casino',
  type: 'document',
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: 'offerTitle',
      media: 'casinoImage'
    }
  },
  fields: [
    orderRankField({ type: "casino" }),
    {
      name: 'casinoImage',
      title: 'Casino Image',
      type: 'image',
    },
    {
      name: 'offerTitle',
      title: 'Offer Title',
      type: 'string',
    },
    {
      name: 'offerDescription',
      title: 'Offer Description',
      type: 'text',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(10),
    },
    {
      name: 'offerUrl',
      title: 'Default Offer URL',
      type: 'url',
    },
    {
      name: 'categoryUrls',
      title: 'Category Specific URLs',
      description: 'Optional: Add different tracking URLs for specific categories',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }]
          },
          {
            name: 'url',
            title: 'Tracking URL',
            type: 'url',
          },
          {
            name: 'urlNumber',
            title: 'URL Number',
            type: 'string',
            description: 'Optional: Add a number suffix to the URL (e.g., "3" for offer3)'
          }
        ],
        preview: {
          select: {
            category: 'category.title',
            url: 'url',
            urlNumber: 'urlNumber'
          },
          prepare({ category, url, urlNumber }) {
            return {
              title: category || 'No category selected',
              subtitle: `${url}${urlNumber ? ` (Number: ${urlNumber})` : ''}`
            }
          }
        }
      }],
    },
    {
      name: 'termsConditionsUrl',
      title: 'Terms & Conditions URL',
      type: 'url',
    },
    {
      name: 'offerText',
      title: 'Offer Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [
            {title: 'Bullet', value: 'bullet'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ]
          }
        }
      ]
    },
    {
      name: 'categories',
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category"}]}],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      validation: (Rule) => Rule.unique()
    },
    {
      name: 'paymentMethods',
      title: "Payment Methods",
      type: "array",
      of: [{ type: "reference", to: [{ type: "paymentMethod"}]}],
    }
  ],
});