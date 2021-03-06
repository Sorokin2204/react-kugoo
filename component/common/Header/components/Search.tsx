import { useLazyQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  InputBase,
  MenuItem,
  Select,
  styled,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GET_SEARCH_PRODUCTS } from '../../../../graphql/query/product';
import SearchPopover from './SearchPopover';

type Props = {};

const Search: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const [age, setAge] = useState('');
  const [searchText, setSearchText] = useState('');
  const [openSearch, setOpenSearch] = React.useState(false);

  const [getSearchProducts, { data, loading, previousData }] =
    useLazyQuery(GET_SEARCH_PRODUCTS);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const handleClose = () => {
    setOpenSearch(false);
  };
  const handleOpen = () => {
    if (searchText) setOpenSearch(true);
  };

  const fetchSearchProduct = () => {
    if (searchText) {
      getSearchProducts({
        variables: {
          searchText: searchText,
        },
      })
        .then((dataS) => {
          setOpenSearch(true);
        })
        .catch((err) => console.log(JSON.stringify(err, null, 2)));
    } else {
      setOpenSearch(false);
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      fetchSearchProduct();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const dataSearch = loading ? previousData : data;

  return (
    <ClickAwayListener onClickAway={() => handleClose()}>
      <SearchWrapper>
        <SearchBox>
          <Box
            sx={{
              display: 'flex',
              padding: theme.spacing(1),
              flexGrow: '1',
              borderRadius: '5px 0px 0px 5px',
              border: `2px solid ${theme.palette.primary.main}`,
              borderRight: 'none',
              [theme.breakpoints.down('md')]: {
                border: `2px solid transparent`,
                backgroundColor: theme.palette.grey[100],
              },
            }}>
            <SearchSelect
              sx={{ fontSize: theme.typography.t3 }}
              value={age}
              onChange={handleChange}
              displayEmpty>
              <MenuItem value={''}>??????????</MenuItem>
              <MenuItem value={'Minsk'}>??????????</MenuItem>
              <MenuItem value={'Grodno'}>????????????</MenuItem>
              <MenuItem value={'Brest'}>??????????</MenuItem>
            </SearchSelect>
            <SearchInput
              value={searchText}
              onClick={() => handleOpen()}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              sx={{ fontSize: theme.typography.t3 }}
              placeholder="???????????? ?????????????? KUGOO"
            />
          </Box>
          <SearchButton>
            <SearchIcon
              sx={() => ({
                fontSize: 20,
                [theme.breakpoints.down('md')]: {
                  fontSize: 17,
                },
              })}
            />
          </SearchButton>
        </SearchBox>
        {openSearch && (
          <SearchPopover
            data={dataSearch}
            clearSearch={clearSearch}
            handleClose={handleClose}
          />
        )}
      </SearchWrapper>
    </ClickAwayListener>
  );
};

export default Search;

const SearchWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    flexBasis: '100%',
    marginTop: theme.spacing(7.5),
  },
  flexGrow: '1',
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginRight: theme.spacing(10),
  [theme.breakpoints.down('md')]: {
    marginRight: '0',
  },

  borderRadius: '5px',
}));
const SearchSelect = styled(Select)<{ triangle: string }>(
  ({ theme, triangle }) => ({
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    marginRight: theme.spacing(10),
    padding: theme.spacing(0),
    backgroundColor: theme.palette.grey[100],

    '& .MuiSelect-outlined': {
      padding: `${theme.spacing(2)} ${theme.spacing(7)}`,
      paddingRight: theme.spacing(12) + '! important',
      position: 'relative',
      '&::after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        right: theme.spacing(5),
        top: '43%',
        background: `url(/static/icons/triangle-rounded.svg) no-repeat`,
        width: '8px',
        height: '7px',
      },
    },
    '& .MuiSelect-icon': {
      display: 'none',
    },
    '& fieldset': {
      border: 'none',
    },
  }),
);
const SearchInput = styled(InputBase)(({ theme }) => ({
  flexGrow: '1',
  [theme.breakpoints.down('md')]: {
    marginLeft: theme.spacing(5),
  },
  marginRight: theme.spacing(10),
  '& 	.MuiInputBase-input::placeholder': {
    ...theme.typography.t4,
    color: theme.palette.grey[600],
    opacity: '1',
  },
  '& 	.MuiInputBase-input': {
    ...theme.typography.t4,
    paddingTop: '3px',
    paddingBottom: '4px',
  },
}));
const SearchButton = styled(ButtonBase)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  width: theme.spacing(17.5),
  height: theme.spacing(17.5),
  borderRadius: '0px 5px 5px 0px',
  [theme.breakpoints.down('md')]: {
    color: theme.palette.grey[600],
    backgroundColor: theme.palette.grey[100],
  },
}));
