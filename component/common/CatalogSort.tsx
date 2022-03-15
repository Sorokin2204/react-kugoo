import React, { useEffect, useState } from 'react';
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
import { filterInlineData } from './Catalog';

type Props = {
  data: typeof filterInlineData;
  onChangeSort: (selectSort: string) => {};
};

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

const CatalogSort: React.FC<Props> = ({ data, onChangeSort }) => {
  const theme = useTheme();

  // const [sortCommon, setSortCommon] = React.useState('price');
  // const handleChangeSortCommon = (event) => {
  //   setSortCommon(event.target.value);
  // };
  // const [sortSpec, setSortSpec] = React.useState('long-work');
  // const handleChangeSortSpec = (event) => {
  //   setSortSpec(event.target.value);
  // };

  // const sortData = [
  //   {
  //     list: [
  //       {
  //         label: 'По цене',
  //         value: 'price',
  //         defaultChecked: true,
  //       },
  //       {
  //         label: 'По популярности',
  //         value: 'popular',
  //       },
  //       {
  //         label: 'По отзывам',
  //         value: 'review',
  //       },
  //     ],
  //   },
  //   {
  //     list: [
  //       {
  //         label: 'По батарее',
  //         value: 'price',
  //       },
  //       {
  //         label: 'По скорости',
  //         value: 'popular',
  //       },
  //       {
  //         label: 'По заряду',
  //         value: 'review',
  //         defaultChecked: true,
  //       },
  //     ],
  //   },
  // ];

  const [activeFilter, setActiveFilter] = useState<string>(data[0].value);
  const handleChangeFilter = (event: React.ChangeEvent<Element>) => {
    setActiveFilter(event.target.value);
  };
  useEffect(() => {
    onChangeSort(activeFilter);
  }, [activeFilter]);

  return (
    <>
      <SortBox>
        <SortTitle variant="t3b">Сортировать: </SortTitle>
        <SelectCustom defaultValue={activeFilter} onChange={handleChangeFilter}>
          {data.map((opt, i) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </SelectCustom>

        {/* {sortData.map((el, i) => (
          <SelectCustom key={i} sx={{ ml: 10 }} data={el}></SelectCustom>
        ))} */}
      </SortBox>
    </>
  );
};

export default CatalogSort;
const SortBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));
const SortTitle = styled(Typography)(({ theme }) => ({
  marginRight: '10px',
}));
const SortSelect = styled(Select)(({ theme }) => ({}));
