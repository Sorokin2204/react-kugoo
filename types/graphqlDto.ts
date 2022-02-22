import { Scalars, Maybe, Category } from './graphql';
export type ProductDto = {
  _id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  price: Scalars['Int'];
  discountPrice?: Maybe<Scalars['Int']>;
  vendorCode: Scalars['String'];
  //   images?: Maybe<Array<Maybe<ProductImage>>>;
  Category: Category;
};
