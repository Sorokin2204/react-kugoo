import React, { useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import FilterInline, { FilterInlineType } from './FilterInline';
import Product, { ProductType } from './Product';
import FilterBlock from './FilterBlock';
import FilterRange from './FilterRange';
import CatalogSort from './CatalogSort';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS_CARD } from '../../graphql/query/product';

type Props = {
  type: 'full' | 'filter' | 'inline';
};

const filterInlineData: FilterInlineType[] = [
  {
    label: 'Популярные',
    value: 'popular',
  },
  {
    label: 'Дешевые',
    value: 'low-price',
  },
  {
    label: 'Дорогие',
    value: 'high-price',
  },
  {
    label: 'Названию',
    value: 'name',
  },
];

export const productData: ProductType[] = [
  {
    title: 'Kugoo Kirin M4',
    oldPrice: 39.9,
    newPrice: 29.9,
    views: 350,
    buyers: 196,
    vendorCode: '2200000000026',
    spec: [
      {
        name: '2000 mAh',
        icon: '/static/icons/spec-1.svg',
      },
      {
        name: '1,2 л.с.',
        icon: '/static/icons/spec-2.svg',
      },
      {
        name: '60 км/ч',
        icon: '/static/icons/spec-3.svg',
      },
      {
        name: '5 часов',
        icon: '/static/icons/spec-4.svg',
      },
    ],
    tag: {
      name: 'Новинка',
      color: '#75D14A',
    },
    image: '/static/product-full.png',
  },
];

type CatalogType = {
  type: string;
};

const CatalogBox = styled(Box)(({ theme }) => ({}));
const CatalogHead = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(25),
}));
const CatalogTitle = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
}));
const CatalogBody = styled(Grid)<CatalogType>(({ theme, type }) => ({
  ...(type === 'filter' && {
    display: 'grid',
    gridTemplateColumns: 'minmax(auto,255px) 1fr',
    gridColumnGap: '30px',
  }),
}));
const CatalogGrid = styled(Grid)<CatalogType>(({ theme, type }) => ({
  ...(type === 'filter' && {
    gritTemplate: '2/12',
  }),
}));
const CatalogGridItem = styled(Grid)(({ theme }) => ({}));
const CatalogBtnMore = styled(Button)(({ theme }) => ({
  display: 'flex',
  margin: '0 auto',
  marginTop: theme.spacing(12),
}));

const Catalog: React.FC<Props> = ({ type }) => {
  const [getAllProductCard, getAllProductCardData] = useLazyQuery(
    GET_ALL_PRODUCTS_CARD,
  );
  useEffect(() => {
    // console.log('CATALOG DATA ', getAllProductCardData);
  }, [getAllProductCardData]);

  const onChangeSort = (sort: string) => {
    console.log('SORTING DATA ', getAllProductCardData);
    getAllProductCard({
      variables: {
        sort: sort,
      },
    });
  };

  return (
    <CatalogBox>
      {type === 'full' && (
        <CatalogHead>
          <CatalogTitle variant="h1">Электросамокаты</CatalogTitle>
          <FilterInline data={filterInlineData} onChangeSort={onChangeSort} />
        </CatalogHead>
      )}
      {type === 'filter' && (
        <CatalogHead sx={{ mb: 15 }}>
          <CatalogTitle variant="h3">Фильтр</CatalogTitle>
          <CatalogSort data={filterInlineData} />
        </CatalogHead>
      )}

      <CatalogBody type={type}>
        {type === 'filter' && (
          <FilterBlock
            sx={{
              ...(type === 'filter' && {
                gritTemplate: '1/2',
                alignSelf: 'start',
              }),
            }}
          />
        )}

        <CatalogGrid container spacing={13} type={type}>
          {!getAllProductCardData?.loading ? (
            getAllProductCardData?.data?.getAllProductCard?.map(
              (product, i) => (
                <CatalogGridItem
                  item
                  xs={type === 'filter' ? 4 : 3}
                  key={product._id}>
                  <Product data={product} />
                </CatalogGridItem>
              ),
            )
          ) : (
            <CircularProgress />
          )}
          <CatalogGridItem item xs={12} sx={{ mb: 25 }}>
            <CatalogBtnMore variant="outlined">Смотреть все</CatalogBtnMore>
          </CatalogGridItem>
        </CatalogGrid>
      </CatalogBody>
    </CatalogBox>
  );
};

export default Catalog;
