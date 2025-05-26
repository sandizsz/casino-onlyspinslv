import { type SchemaTypeDefinition } from 'sanity'
import { casinoType } from './casino';
import { categoryType } from './category';
import { paymentMethodType } from './paymentMethod';
import { tagType } from './tag';
import { blogPostType } from './blogPost';
import author from './author';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [casinoType, categoryType, paymentMethodType, tagType, blogPostType, author],
}
