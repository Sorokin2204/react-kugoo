import React from 'react';
import {
  Grid,
  Popover,
  PopoverProps,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { SpecItem } from '../../common/Product';
import { productData } from '../../common/Catalog';
import { currencyFormat } from './CartPopover';

type Props = {};

const SearchPopoverStyled = styled(Popover)(({ theme }) => ({}));
const SearchList = styled(Grid)(({ theme }) => ({
  display: 'none',
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  width: '100%',
  top: '100%',
  left: '0',
  borderRadius: '5px',
  boxShadow: theme.boxShadow.secondary,
  marginTop: theme.spacing(6),
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

const SearchPopover: React.FC<Props> = (props) => {
  const theme = useTheme();

  return (
    <SearchList sx={{ p: 10 }}>
      {[...Array(3)].map((el, i) => (
        <SearchItem key={i}>
          <SearchImage src={productData[0].image} />
          <SearchTitle variant="t2bb">{productData[0].title}</SearchTitle>
          <SearchPrice variant="t3bb">
            {currencyFormat(productData[0].newPrice)}
          </SearchPrice>
          <SpecList container spacing={10}>
            {productData[0].spec.map((el, i) => (
              <SpecItem
                item
                key={i}
                icon={el.icon}
                iconSize={theme.spacing(8)}
                sx={{ ...theme.typography.t4 }}>
                {el.name}
              </SpecItem>
            ))}
          </SpecList>
        </SearchItem>
      ))}
    </SearchList>
  );
};

export default SearchPopover;
