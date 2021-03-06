import { useLazyQuery } from '@apollo/client';
import { Box, Button, Grid, styled, Typography, useTheme } from '@mui/material';
import Grow from '@mui/material/Grow';
import React, { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { GET_ALL_PRODUCTS_CARD } from '../../graphql/query/product';
import useAppConfig from '../../hooks/useAppConfig';
import CatalogBanner from './Catalog/CatalogBanner';
import CatalogSort from './CatalogSort';
import FilterBlock from './FilterBlock';
import FilterInline, { FilterInlineType } from './FilterInline';
import Product, { ProductType } from './Product';

export const filterInlineData: FilterInlineType[] = [
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

const CatalogBox = styled(Box)(({ theme }) => ({}));
const CatalogHead = styled(Box)<CatalogType>(({ theme, type }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(25),
  [theme.breakpoints.down('md')]: {
    ...(type !== 'filter' && {
      flexDirection: 'column',
    }),
  },
}));
const CatalogTitle = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  alignSelf: 'center',

  [theme.breakpoints.down('lg')]: {},
}));
const CatalogBody = styled(Grid)<CatalogType>(({ theme, type }) => ({
  ...(type === 'filter' && {
    display: 'grid',
    gridTemplateColumns: 'minmax(auto,255px) 1fr',
    gridTemplateRows: 'auto 1fr',
    [theme.breakpoints.down('lg')]: {
      gridColumn: '1/3',
      gridRow: '1/2',
      gridTemplateColumns: ' 1fr',
    },
    gridGap: '30px',
  }),
}));
const CatalogGrid = styled(Box)<CatalogType>(({ theme, type }) => ({
  display: 'grid',
  alignSelf: 'flex-start',
  position: 'relative',
  gridGap: theme.spacing(12),
  gridTemplateColumns: `repeat(auto-fill, minmax(259px,auto))`,
  justifyContent: 'space-evenly',
  alignItems: 'center',
  gridAutoRows: '1fr',
  [theme.breakpoints.down('lg')]: {
    gridColumn: '1/2',
  },

  ...(type === 'filter' && {
    gritTemplate: '2/12',
  }),
}));
const CatalogGridItem = styled(Box)(({ theme }) => ({}));
const CatalogBtnMore = styled(Button)(({ theme }) => ({
  display: 'flex',
  margin: '0 auto',
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  alignSelf: 'flex-start',
  [theme.breakpoints.down('lg')]: {
    marginTop: theme.spacing(2),

    // gridRow: '2/3',
    // gridColumn: '2/3',
  },
}));

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '26px',
  top: 0,
  bottom: 0,
  right: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.1,
  width: 'calc(100% - 26px)',
  height: '100%',
  zIndex: '1000',
}));

type Props = {
  type: 'full' | 'filter' | 'inline';
  category: string;
};

type IFormType = {
  attributes: string[];
};

type CatalogType = {
  type: string;
};

const Catalog: React.FC<Props> = ({ type, category }) => {
  const theme = useTheme();
  const [getAllProductCard, getAllProductCardData] = useLazyQuery(
    GET_ALL_PRODUCTS_CARD,
  );
  const [allProductData, setAllProductData] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const { cartProducts } = useAppConfig();

  const catalogForm = useForm<IFormType>({
    mode: 'onBlur',
    defaultValues: {
      attributes: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'attributes',
    control: catalogForm.control,
  });
  let sort = useRef('');
  let filter = useRef<Array<{ spec: string; specOpt: string }>>([]);
  const limit = 8;
  let offset = useRef(0);
  const onChangeSort = (selectSort: string) => {
    offset.current = 0;
    sort.current = selectSort;
    fetchMoreProducts()
      .then((prodData) => {
        setAllProductData(prodData.data.getAllProductCard.pageProduct);
      })
      .catch((err) => console.log(JSON.stringify(err, null, 2)));
  };

  const onChangeFilter = (selectFilter: string, specId: string) => {
    offset.current = 0;
    console.log('Spec seleteted', specId);

    let indexExistAttr = filter.current.findIndex(
      (attr) => attr.specOpt === selectFilter,
    );
    if (indexExistAttr === -1) {
      filter.current.push({ spec: specId, specOpt: selectFilter });
    } else {
      filter.current.splice(indexExistAttr);
    }

    fetchMoreProducts().then((prodData) => {
      setAllProductData(prodData.data.getAllProductCard.pageProduct);
    });
  };
  const onLoadMore = () => {
    offset.current = offset.current + limit;

    fetchMoreProducts().then((prodData) => {
      setAllProductData((prev) => [
        ...prev,
        ...prodData.data.getAllProductCard.pageProduct,
      ]);
    });
  };
  useEffect(() => {
    setCategoryName(
      getAllProductCardData?.data?.getAllProductCard?.pageInfo?.category?.name,
    );
  }, [allProductData]);

  const fetchMoreProducts = () => {
    return getAllProductCard({
      variables: {
        filter: filter.current,
        sort: sort.current,
        offset: offset.current,
        limit,
        category,
      },
    });
  };

  return (
    <>
      {type === 'filter' && (
        <Box sx={{ mb: 25 }}>
          <CatalogBanner title={categoryName} />
        </Box>
      )}

      <CatalogBox>
        {type === 'full' && (
          <CatalogHead type={type}>
            <CatalogTitle
              variant="h1"
              sx={{
                [theme.breakpoints.down('md')]: {
                  marginBottom: theme.spacing(10),
                },
              }}>
              {categoryName}
            </CatalogTitle>
            <FilterInline data={filterInlineData} onChangeSort={onChangeSort} />
          </CatalogHead>
        )}
        {type === 'filter' && (
          <CatalogHead
            type={type}
            sx={{
              mb: 15,
              [theme.breakpoints.down('lg')]: {
                mb: 10,
              },
            }}>
            <CatalogTitle variant="h3">Фильтр</CatalogTitle>
            <CatalogSort data={filterInlineData} onChangeSort={onChangeSort} />
          </CatalogHead>
        )}

        <CatalogBody type={type}>
          {type === 'filter' && (
            <FilterBlock
              categorySlug={category}
              onChangeFilter={onChangeFilter}
              sx={{
                ...(type === 'filter' && {
                  gridColumn: '1/2',
                  gridRow: '1/3',
                  alignSelf: 'start',
                }),
              }}
            />
          )}
          {/* {!getAllProductCardData.loading && getAllProductCardData.data ? ( */}
          {allProductData.length !== 0 ? (
            <>
              <CatalogGrid type={type}>
                {allProductData.map((product, i) => {
                  let inCart =
                    cartProducts.findIndex(
                      (cartProd) => cartProd.productId === product._id,
                    ) !== -1;
                  return (
                    <Grow
                      in={true}
                      style={{ transformOrigin: '0 0 0' }}
                      key={product._id}
                      timeout={400}>
                      <CatalogGridItem>
                        <Product data={product} inCart={inCart} />
                      </CatalogGridItem>
                    </Grow>
                  );
                })}
              </CatalogGrid>
              {!getAllProductCardData.loading &&
              getAllProductCardData?.data?.getAllProductCard?.pageInfo
                ?.hasNextPage ? (
                <CatalogBtnMore variant="outlined" onClick={onLoadMore}>
                  Загрузить еще
                </CatalogBtnMore>
              ) : (
                <Box
                  sx={{
                    my: 12,
                    height: '52px',
                  }}></Box>
              )}
            </>
          ) : !getAllProductCardData.loading ? (
            <Typography
              variant="h1"
              sx={(theme) => ({
                py: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.grey[600],
                [theme.breakpoints.down('md')]: {
                  py: 100,
                },
              })}>
              Товаров не найдено
            </Typography>
          ) : (
            <></>
          )}
        </CatalogBody>
      </CatalogBox>
    </>
  );
};

export default Catalog;
