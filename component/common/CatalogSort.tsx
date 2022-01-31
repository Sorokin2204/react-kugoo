import React from 'react';
import {
  Box,
  styled,
  Typography,
  Select,
  MenuItem,
  useThemeProps,
} from '@mui/material';
import { useTheme } from '@emotion/react';
import SelectCustom from './SelectCustom';

type Props = { data: SortData };

// type SortData = {
//   list: Array<{ value: string; label: string }>;
// };

// const sortData: SortData[] = [
//   {
//     list: [
//       { value: 'popular', label: 'По популярности' },
//       { value: 'rating', label: 'По рейтингу' },
//       { value: 'price', label: 'По цене' },
//     ],
//   },
//   {
//     list: [
//       { value: 'long-work', label: 'По дальности хода' },
//       { value: 'speed', label: 'По скорости' },
//       { value: 'power', label: 'По мощности' },
//     ],
//   },
// ];

const CatalogSort: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  const [sortCommon, setSortCommon] = React.useState('price');
  const handleChangeSortCommon = (event) => {
    setSortCommon(event.target.value);
  };
  const [sortSpec, setSortSpec] = React.useState('long-work');
  const handleChangeSortSpec = (event) => {
    setSortSpec(event.target.value);
  };
  return (
    <>
      <SortBox>
        <SortTitle variant="t3b">Сортировать: </SortTitle>
        <SelectCustom
          value={sortCommon}
          displayEmpty
          onChange={handleChangeSortCommon}
          sx={{ ml: 10 }}>
          <MenuItem value={'price'}>По цене</MenuItem>
          <MenuItem value={'rating'}>По рейтингу</MenuItem>
          <MenuItem value={'popular'}>По популярности</MenuItem>
        </SelectCustom>
        <SelectCustom
          sx={{ ml: 10 }}
          value={sortSpec}
          displayEmpty
          onChange={handleChangeSortSpec}>
          <MenuItem value={'long-work'}>По дальности хода</MenuItem>
          <MenuItem value={'speed'}>По скорости</MenuItem>
          <MenuItem value={'power'}>По мощности</MenuItem>
        </SelectCustom>
      </SortBox>
    </>
  );
};

export default CatalogSort;
const SortBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));
const SortTitle = styled(Typography)(({ theme }) => ({}));
const SortSelect = styled(Select)(({ theme }) => ({}));
