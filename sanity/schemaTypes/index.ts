import { type SchemaTypeDefinition } from 'sanity'
import { casinoType } from './casino';
import { categoryType } from './category';
import { paymentMethodType } from './paymentMethod';
import { tagType } from './tag';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [casinoType, categoryType, paymentMethodType, tagType],
}
