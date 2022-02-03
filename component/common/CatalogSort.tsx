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

  const sortData = [
    {
      list: [
        {
          label: 'По цене',
          value: 'price',
          defaultChecked: true,
        },
        {
          label: 'По популярности',
          value: 'popular',
        },
        {
          label: 'По отзывам',
          value: 'review',
        },
      ],
    },
    {
      list: [
        {
          label: 'По батарее',
          value: 'price',
        },
        {
          label: 'По скорости',
          value: 'popular',
        },
        {
          label: 'По заряду',
          value: 'review',
          defaultChecked: true,
        },
      ],
    },
  ];
  return (
    <>
      <SortBox>
        <SortTitle variant="t3b">Сортировать: </SortTitle>
        {sortData.map((el, i) => (
          <SelectCustom key={i} sx={{ ml: 10 }} data={el}></SelectCustom>
        ))}
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
