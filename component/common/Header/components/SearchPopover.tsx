import {
  Box,
  Grid,
  Popover,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { currencyFormat } from '../../../../utils/currencyFormat';
import { specIcons, SpecItem } from '../../Product';

type Props = {
  clearSearch: () => {};
  handleClose: () => {};
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
  maxHeight: '300px',
  overflowY: 'auto',
}));
const SearchItem = styled(Grid)(({ theme }) => ({
  display: 'grid',
  cursor: 'default',

  gridTemplateColumns: 'auto 1fr auto',
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
  objectFit: 'contain',
  marginRight: theme.spacing(10),
  [theme.breakpoints.down('xs')]: {
    display: 'none',
  },
}));
const SearchPrice = styled(Typography)(({ theme }) => ({
  gridColumn: '3/4',
  gridRow: '1/2',
  whiteSpace: 'nowrap',
  marginLeft: '10px',
}));
const SearchTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(4),

  gridColumn: '2/3',
  gridRow: '1/2',
}));
const SpecList = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4,min-content)',
  gridGap: theme.spacing(10),
  [theme.breakpoints.down('sm')]: {
    gridColumn: '2/3',
    gridGap: theme.spacing(5),
    gridTemplateColumns: 'repeat(2,auto)',
  },
  gridColumn: '2/3',
  gridRow: '2/3',
}));

const SearchPopover: React.FC<Props> = ({ data, clearSearch, handleClose }) => {
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
                    : '/static/common/preview-product.jpg'
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
                    iconsize={theme.spacing(8)}
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
