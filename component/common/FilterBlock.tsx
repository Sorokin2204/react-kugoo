import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import FilterCheckbox, { CheckboxFilterProps } from './FilterCheckbox';
import FilterRange, { RangeFilterProps } from './FilterRange';

type Props = {
  sx?: object;
};

type FilterBlock = {
  title: string;
  type: 'range' | 'checkbox';
  data: CheckboxFilterProps[] | RangeFilterProps;
};

const filterData: FilterBlock[] = [
  {
    title: 'Цена',
    type: 'range',
    data: { min: 100, max: 5500, step: 100, minDistance: 1000 },
  },
  {
    title: 'Тип',
    type: 'checkbox',
    data: [
      { label: 'Внедорожный', value: 'off-road' },
      { label: 'Городской', value: 'for-town' },
      { label: 'Зимний', value: 'for-winter' },
    ],
  },
  {
    title: 'Для кого',
    type: 'checkbox',
    data: [
      { label: 'Для взрослого', value: 'off-road' },
      { label: 'Для ребенка', value: 'for-town' },
      { label: 'Для пенсионера', value: 'for-winter' },
    ],
  },
  {
    title: 'Вес',
    type: 'checkbox',
    data: [
      { label: 'Легкие (до 15 кг)', value: 'off-road' },
      { label: 'Средние (15-30 кг)', value: 'for-town' },
      { label: 'Тяжелые (свыше 30 кг)', value: 'for-winter' },
    ],
  },
];

const FilterList = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: '10px',
}));
const FilterItem = styled(Grid)(({ theme }) => ({
  '& + &': {
    marginTop: theme.spacing(14),
  },
}));
const FilterTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
}));

const FilterBlock: React.FC<Props> = ({ sx }) => {
  return (
    <FilterList sx={{ p: 10, ...sx }}>
      {filterData.map((el, i) => (
        <FilterItem key={i}>
          <FilterTitle sx={{ mb: 7.5 }} variant="t1b">
            {el.title}
          </FilterTitle>
          {el.type === 'checkbox' && <FilterCheckbox data={el.data} />}
          {el.type === 'range' && <FilterRange data={el.data} />}
        </FilterItem>
      ))}
    </FilterList>
  );
};

export default FilterBlock;
