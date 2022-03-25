import React from 'react';
import {
  Box,
  CircularProgress,
  Grid,
  Popover,
  PopoverProps,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { currencyFormat } from '../../../../utils/currencyFormat';
import { specIcons, SpecItem } from '../../Product';
import { productData } from '../../Catalog';
import { useQuery } from '@apollo/client';
import { GET_SEARCH_PRODUCTS } from '../../../../graphql/query/product';
import Link from 'next/link';

type Props = {
  clearSearch: () => {};
};

const SearchPopoverStyled = styled(Popover)(({ theme }) => ({}));
const SearchList = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  width: '100%',
  top: '100%',
  left: '0',
  borderRadius: '5px',
  boxShadow: theme.boxShadow.secondary,
  marginTop: theme.spacing(6),
  zIndex: '1000',
}));
const SearchItem = styled(Grid)(({ theme }) => ({
  display: 'grid',
  '& + &': {
    paddingTop: theme.spacing(10),
    marginTop: theme.spacing(10),
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  },
}));
const SearchImage = styled('img')(({ theme }) => ({
  gridColumn: '1/2',
  gridRow: '1/3',
  minWidth: '50px',
  maxWidth: '50px',
  minHeight: '50px',
  maxHeight: '50px',
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
  objectFit: 'cover',
  marginRight: theme.spacing(10),
  [theme.breakpoints.down('xs')]: {
    display: 'none',
  },
}));
const SearchPrice = styled(Typography)(({ theme }) => ({
  gridColumn: '11/12',
  gridRow: '1/2',
  whiteSpace: 'nowrap',
  marginLeft: '10px',
}));
const SearchTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(4),

  gridColumn: '2/11',
  gridRow: '1/2',
}));
const SpecList = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4,auto)',
  gridGap: theme.spacing(10),
  [theme.breakpoints.down('sm')]: {
    gridColumn: '2/3',
    gridGap: theme.spacing(5),
    gridTemplateColumns: 'repeat(2,auto)',
  },
  gridColumn: '2/3',
  gridRow: '2/3',
}));

const SearchPopover: React.FC<Props> = ({ data, clearSearch }) => {
  const theme = useTheme();
  const matchMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SearchList sx={{ p: 10 }}>
      {data?.searchProducts.length !== 0 ? (
        data?.searchProducts?.map((product, i) => (
          <Link
            key={product._id}
            href={`/${product.Category.slug}/${product.slug}`}>
            <SearchItem onClick={() => clearSearch()}>
              <SearchImage
                src={
                  product.images[product.images.length - 1]?.name
                    ? `/static/products/${
                        product.images[product.images.length - 1]?.name
                      }`
                    : '/static/preview-product.jpg'
                }
              />
              <SearchTitle variant="t2bb">{product.name}</SearchTitle>
              <SearchPrice variant="t3bb">
                {currencyFormat(product.price)}
              </SearchPrice>
              <SpecList>
                {product.SpecOptions.edges.map((specOpt, i) => (
                  <SpecItem
                    key={i}
                    icon={specIcons[i]}
                    iconSize={theme.spacing(8)}
                    sx={{ ...theme.typography.t4 }}>
                    {specOpt.node.name.replace('*', '').replace('до', '')}
                  </SpecItem>
                ))}
              </SpecList>
            </SearchItem>
          </Link>
        ))
      ) : (
        <div>Ничего не найдено</div>
      )}
    </SearchList>
  );
};

export default SearchPopover;
