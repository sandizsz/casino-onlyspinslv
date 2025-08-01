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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly name for the casino page',
      options: {
        source: 'offerTitle',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
      name: 'bonusCode',
      title: 'Bonus Code',
      type: 'string',
      description: 'Promotional bonus code for the casino',
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
      name: 'freeSpins',
      title: 'Free Spins',
      type: 'number',
      description: 'Number of free spins offered',
      validation: (Rule) => Rule.min(0)
    },
    {
      name: 'license',
      title: 'License',
      type: 'string',
      options: {
        list: [
          { title: 'Kirasao', value: 'Kirasao' },
          { title: 'Latvija', value: 'Latvija' },
          { title: 'Anjouan', value: 'Anjouan' }
        ]
      }
    },
    {
      name: 'minDeposit',
      title: 'Minimum Deposit',
      type: 'number',
      description: 'Minimum deposit amount in EUR',
      validation: (Rule) => Rule.min(0)
    },
    {
      name: 'paymentMethods',
      title: "Payment Methods",
      type: "array",
      of: [{ type: "reference", to: [{ type: "paymentMethod"}]}],
    } 
 
  ],
});