export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category_Attribute_Connection = {
  __typename?: 'Category_Attribute_Connection';
  edges?: Maybe<Array<Maybe<Category_Attribute_Edge>>>;
};

export type Category_Attribute_Edge = {
  __typename?: 'Category_Attribute_Edge';
  node?: Maybe<Attribute>;
};

export type Category_Spec_Connection = {
  __typename?: 'Category_Spec_Connection';
  edges?: Maybe<Array<Maybe<Category_Spec_Edge>>>;
};

export type Category_Spec_Edge = {
  __typename?: 'Category_Spec_Edge';
  node?: Maybe<Spec>;
};

export type Product_SpecOption_Connection = {
  __typename?: 'Product_SpecOption_Connection';
  edges?: Maybe<Array<Maybe<Product_SpecOption_Edge>>>;
};

export type Product_SpecOption_Edge = {
  __typename?: 'Product_SpecOption_Edge';
  node?: Maybe<SpecOption>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  price: Scalars['Int'];
  discountPrice?: Maybe<Scalars['Int']>;
  vendorCode: Scalars['String'];
  viewsCounter: Scalars['Int'];
  images?: Maybe<Array<Maybe<ProductImage>>>;
  Category: Category;
  AttributeOptions?: Maybe<Array<AttributeOption>>;
};

export type ProductImageInput = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ProductInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  price: Scalars['Int'];
  discountPrice?: InputMaybe<Scalars['Int']>;
  vendorCode: Scalars['String'];
  category: Scalars['String'];
  images?: InputMaybe<Array<InputMaybe<ProductImageInput>>>;
  attributes?: InputMaybe<Array<InputMaybe<ProductAttributesDtoInput>>>;
  specs?: InputMaybe<Array<InputMaybe<ProductSpecDtoInput>>>;
};

export type ProductAttributesDtoInput = {
  _id: Scalars['String'];
  customPrice?: InputMaybe<Scalars['Int']>;
  customSublabel?: InputMaybe<Scalars['String']>;
};

export type ProductSpecDtoInput = {
  specId: Scalars['String'];
  specOptId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  customValue?: InputMaybe<Scalars['String']>;
  afterId?: InputMaybe<Scalars['String']>;
  beforeId?: InputMaybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  Products?: Maybe<Array<Maybe<Product>>>;
  attributes?: Maybe<Category_Attribute_Connection>;
  specs?: Maybe<Category_Spec_Connection>;
};

export type CategoryInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  parentCategory?: InputMaybe<CategoryInput>;
  Products?: InputMaybe<Array<InputMaybe<ProductInput>>>;
};

export type Attribute = {
  __typename?: 'Attribute';
  _id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  AttributeOptions?: Maybe<Array<Maybe<AttributeOption>>>;
};

export type AttributeInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type AttributeOption = {
  __typename?: 'AttributeOption';
  _id: Scalars['ID'];
  label: Scalars['String'];
  subLabel?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  defaultPrice?: Maybe<Scalars['Int']>;
  defaultChecked: Scalars['Boolean'];
  Attribute?: Maybe<Attribute>;
  Products?: Maybe<Array<Maybe<Product>>>;
};

export type AttributeOptionInput = {
  label: Scalars['String'];
  subLabel?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
  defaultPrice?: InputMaybe<Scalars['Int']>;
  defaultChecked: Scalars['Boolean'];
};

export type IntOrString = IntBox | StringBox;

export type IntBox = {
  __typename?: 'IntBox';
  value?: Maybe<Scalars['Int']>;
};

export type StringBox = {
  __typename?: 'StringBox';
  value?: Maybe<Scalars['String']>;
};

export enum SpecOptionType {
  String = 'string',
  Number = 'number',
}

export enum SpecExtraTextType {
  After = 'after',
  Before = 'before',
}

export type Spec = {
  __typename?: 'Spec';
  _id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  type?: Maybe<SpecOptionType>;
  SpecOptions?: Maybe<Array<Maybe<SpecOption>>>;
  SpecExtraTexts?: Maybe<Array<Maybe<SpecExtraText>>>;
  Category?: Maybe<Array<Maybe<Category>>>;
};

export type SpecOption = {
  __typename?: 'SpecOption';
  _id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  default?: Maybe<Scalars['Boolean']>;
  Spec: Spec;
  SpecExtraText?: Maybe<Array<SpecExtraText>>;
};

export type SpecExtraText = {
  __typename?: 'SpecExtraText';
  _id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  type: SpecExtraTextType;
  SpecOption?: Maybe<Array<Maybe<SpecOption>>>;
  Spec: Spec;
};

export type SpecInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  type?: InputMaybe<SpecOptionType>;
};

export type SpecOptionInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  default?: InputMaybe<Scalars['Boolean']>;
};

export type SpecExtraTextInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  type: SpecExtraTextType;
};

export type Query = {
  __typename?: 'Query';
  getCategory?: Maybe<Category>;
  getAllCategory?: Maybe<Array<Maybe<Category>>>;
  getProduct?: Maybe<Product>;
  getAllProduct?: Maybe<Array<Maybe<Product>>>;
  getAttribute?: Maybe<Attribute>;
  getAllAttribute?: Maybe<Array<Maybe<Attribute>>>;
  getAllAttributeInCategory?: Maybe<Category>;
  getAllSpec?: Maybe<Array<Maybe<Spec>>>;
  getSpec?: Maybe<Spec>;
};

export type QueryGetCategoryArgs = {
  id?: InputMaybe<Scalars['String']>;
  withAttrOpts: Scalars['Boolean'];
  withSpecOpts: Scalars['Boolean'];
};

export type QueryGetProductArgs = {
  productSlug?: InputMaybe<Scalars['String']>;
};

export type QueryGetAttributeArgs = {
  attrId?: InputMaybe<Scalars['String']>;
  attrOptId?: InputMaybe<Scalars['String']>;
};

export type QueryGetAllAttributeInCategoryArgs = {
  categoryId?: InputMaybe<Scalars['String']>;
};

export type QueryGetSpecArgs = {
  specId?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteCategory?: Maybe<Scalars['String']>;
  createCategory?: Maybe<Category>;
  changeAttributeInCategory?: Maybe<Scalars['Boolean']>;
  createProduct?: Maybe<Scalars['String']>;
  createAttributeWithOptions?: Maybe<Scalars['String']>;
  updateAttributeOption?: Maybe<Scalars['String']>;
  createAttributeOptionInAttribute?: Maybe<Scalars['String']>;
  createSpec?: Maybe<Scalars['String']>;
  deleteSpec?: Maybe<Scalars['String']>;
};

export type MutationDeleteCategoryArgs = {
  catId?: InputMaybe<Scalars['String']>;
};

export type MutationCreateCategoryArgs = {
  cat?: InputMaybe<CategoryInput>;
  catAttrIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  catSpecIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MutationChangeAttributeInCategoryArgs = {
  categoryId?: InputMaybe<Scalars['String']>;
  attributeIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MutationCreateProductArgs = {
  product?: InputMaybe<ProductInput>;
};

export type MutationCreateAttributeWithOptionsArgs = {
  attr?: InputMaybe<AttributeInput>;
  attrOpt?: InputMaybe<AttributeOptionInput>;
};

export type MutationUpdateAttributeOptionArgs = {
  attrOptId?: InputMaybe<Scalars['String']>;
  newAttrOpt?: InputMaybe<AttributeOptionInput>;
};

export type MutationCreateAttributeOptionInAttributeArgs = {
  attrId?: InputMaybe<Scalars['String']>;
  attrOpt?: InputMaybe<AttributeOptionInput>;
};

export type MutationCreateSpecArgs = {
  spec?: InputMaybe<SpecInput>;
  specOpts?: InputMaybe<Array<InputMaybe<SpecOptionInput>>>;
  specExtraAfter?: InputMaybe<Array<InputMaybe<SpecExtraTextInput>>>;
  specExtraBefore?: InputMaybe<Array<InputMaybe<SpecExtraTextInput>>>;
};

export type MutationDeleteSpecArgs = {
  specId?: InputMaybe<Scalars['String']>;
};
