'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {table} from '@sanity/table'

import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  // Keep the default studio components

  plugins: [
    table(),
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Regular document types
            S.listItem()
              .title('Casinos')
              .schemaType('casino')
              .child(
                S.documentList()
                  .title('Casinos')
                  .filter('_type == "casino"')
              ),
            S.listItem()
              .title('Categories')
              .schemaType('category')
              .child(
                S.documentList()
                  .title('Categories')
                  .filter('_type == "category"')
              ),
              S.listItem()
              .title('Tags')
              .schemaType('tag')
              .child(
                S.documentList()
                  .title('Tags')
                  .filter('_type == "tag"')
              ),
            S.listItem()
              .title('Payment Methods')
              .schemaType('paymentMethod')
              .child(
                S.documentList()
                  .title('Payment Methods')
                  .filter('_type == "paymentMethod"')
              ),
            S.listItem()
              .title('Blog Posts')
              .schemaType('blogPost')
              .child(
                S.documentList()
                  .title('Blog Posts')
                  .filter('_type == "blogPost"')
              ),
            S.listItem()
              .title('Authors')
              .schemaType('author')
              .child(
                S.documentList()
                  .title('Authors')
                  .filter('_type == "author"')
              ),
            // Add a divider
            S.divider(),
            // Orderable casino list
            orderableDocumentListDeskItem({
              type: 'casino',
              title: 'Order Casinos',
              id: 'orderable-casinos',
              filter: '_type == "casino"',
              S,
              context,
            }),
          ])
      },
    }),
    visionTool({defaultApiVersion: apiVersion}),
  ],

  document: {
    // Use this instead - it properly returns a Promise
    productionUrl: async () => {
      return undefined;
    },
    // This reduces the frequency of validation
    unstable_liveEdit: process.env.NODE_ENV !== 'development',
  },
})
