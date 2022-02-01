import React, { useState } from 'react';
import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  styled,
  useTheme,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import SearchPopover from './SearchPopover';

type Props = {};

const Search: React.FC<Props> = ({}) => {
  const theme = useTheme();
  const [age, setAge] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <SearchWrapper>
      <SearchBox>
        <SearchSelect
          sx={{ fontSize: theme.typography.t3 }}
          value={age}
          onChange={handleChange}
          displayEmpty>
          <MenuItem value={''}>Везде</MenuItem>
          <MenuItem value={'Minsk'}>Минск</MenuItem>
          <MenuItem value={'Grodno'}>Гродно</MenuItem>
          <MenuItem value={'Brest'}>Брест</MenuItem>
        </SearchSelect>
        <SearchInput
          sx={{ fontSize: theme.typography.t3 }}
          placeholder="Искать самокат KUGOO"
        />
        <SearchButton aria-describedby={id} onClick={handleClick}>
          <SearchIcon sx={{ fontSize: 20 }} />
        </SearchButton>
      </SearchBox>
      <SearchPopover />
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',

  flexGrow: '1',
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',

  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '5px',
}));
const SearchSelect = styled(Select)<{ triangle: string }>(
  ({ theme, triangle }) => ({
    margin: theme.spacing(2),
    marginRight: theme.spacing(10),
    padding: theme.spacing(0),
    backgroundColor: theme.palette.grey[100],

    '& .MuiSelect-outlined': {
      padding: `${theme.spacing(3)} ${theme.spacing(7)}`,
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
  marginRight: theme.spacing(10),
  '& 	.MuiInputBase-input::placeholder': {
    color: theme.palette.grey[600],
    opacity: '1',
  },
}));
const SearchButton = styled(ButtonBase)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  width: theme.spacing(20),
  height: theme.spacing(20),
}));
