import { defineType } from 'sanity';

export const paymentMethodType = defineType({
  name: 'paymentMethod',
  title: 'Payment Method',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Payment Method Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
});
