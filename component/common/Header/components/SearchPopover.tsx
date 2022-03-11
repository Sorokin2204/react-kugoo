import React from 'react';
import {
  CircularProgress,
  Grid,
  Popover,
  PopoverProps,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { currencyFormat } from '../../../../utils/currencyFormat';
import { specIcons, SpecItem } from '../../Product';
import { productData } from '../../Catalog';
import { useQuery } from '@apollo/client';
import { GET_SEARCH_PRODUCTS } from '../../../../graphql/query/product';

type Props = {};

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
}));
const SearchPrice = styled(Typography)(({ theme }) => ({
  gridColumn: '11/12',
  gridRow: '1/2',
}));
const SearchTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(4),

  gridColumn: '2/11',
  gridRow: '1/2',
}));
const SpecList = styled(Grid)(({ theme }) => ({
  gridColumn: '2/11',
  gridRow: '2/3',
}));

const SearchPopover: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  return (
    <SearchList sx={{ p: 10 }}>
      {data?.searchProducts.length !== 0 ? (
        data?.searchProducts?.map((product, i) => (
          <SearchItem key={i}>
            <SearchImage
              src={`/static/products/${
                product.images[product.images.length - 1]?.name
              }`}
            />
            <SearchTitle variant="t2bb">{product.name}</SearchTitle>
            <SearchPrice variant="t3bb">
              {currencyFormat(product.price)}
            </SearchPrice>
            <SpecList container spacing={10}>
              {product.SpecOptions.edges.map((specOpt, i) => (
                <SpecItem
                  item
                  key={i}
                  icon={specIcons[i]}
                  iconSize={theme.spacing(8)}
                  sx={{ ...theme.typography.t4 }}>
                  {specOpt.node.name.replace('*', '').replace('до', '')}
                </SpecItem>
              ))}
            </SpecList>
          </SearchItem>
        ))
      ) : (
        <div>Ничего не найдено</div>
      )}
    </SearchList>
  );
};

export default SearchPopover;
