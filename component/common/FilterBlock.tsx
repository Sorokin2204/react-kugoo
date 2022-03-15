import React, { useEffect, useRef } from 'react';
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
import { GET_ALL_ATTRIBUTE } from '../../graphql/query/attribute';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_ALL_SPEC_WITH_OPTIONS } from '../../graphql/query/spec';

type Props = {
  onChangeFilter: (selectFilter: string) => {};
  sx?: object;
};

type FilterBlock = {
  title: string;
  type: 'range' | 'checkbox';
  data: CheckboxFilterProps[] | RangeFilterProps;
};

// const filterData: FilterBlock[] = [
//   {
//     title: 'Цена',
//     type: 'range',
//     data: { min: 100, max: 5500, step: 100, minDistance: 1000 },
//   },
//   {
//     title: 'Тип',
//     type: 'checkbox',
//     data: [
//       { label: 'Внедорожный', value: 'off-road' },
//       { label: 'Городской', value: 'for-town' },
//       { label: 'Зимний', value: 'for-winter' },
//     ],
//   },
//   {
//     title: 'Для кого',
//     type: 'checkbox',
//     data: [
//       { label: 'Для взрослого', value: 'off-road' },
//       { label: 'Для ребенка', value: 'for-town' },
//       { label: 'Для пенсионера', value: 'for-winter' },
//     ],
//   },
//   {
//     title: 'Вес',
//     type: 'checkbox',
//     data: [
//       { label: 'Легкие (до 15 кг)', value: 'off-road' },
//       { label: 'Средние (15-30 кг)', value: 'for-town' },
//       { label: 'Тяжелые (свыше 30 кг)', value: 'for-winter' },
//     ],
//   },
// ];

const FilterList = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: '10px',
  [theme.breakpoints.down('lg')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(215px,1fr))',
    gridGap: '20px',
  },
}));
const FilterItem = styled(Box)(({ theme }) => ({
  '& + &': {
    marginTop: theme.spacing(14),
  },
  [theme.breakpoints.down('lg')]: {
    '& + &': {
      marginTop: 0,
    },
  },
}));
const FilterTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
}));

const FilterBlock: React.FC<Props> = ({ sx, onChangeFilter }) => {
  const [filterData, setFilterData] = useState([]);
  const { data, loading, error, refetch } = useQuery(GET_ALL_SPEC_WITH_OPTIONS);
  useEffect(() => {
    if (!loading) {
      console.log(error);

      setFilterData(
        data.getAllSpecWithOptions.map((spec) => ({
          title: spec.name,
          type: 'checkbox',
          data: spec.SpecOptions.map((specOpt) => ({
            label: specOpt.name,
            value: specOpt._id,
          })),
        })),
      );
    }
  }, [data]);

  const filterRef = useRef();

  const [limitCheckbox, setLimitCheckbox] = useState(false);

  useEffect(() => {}, [limitCheckbox]);
  return (
    <FilterList sx={{ p: 10, ...sx }}>
      {filterData.map((el, i) => {
        return (
          <FilterItem
            key={i}
            ref={(fil) => {
              // console.log(fil);
            }}>
            <FilterTitle sx={{ mb: 7.5 }} variant="t1b">
              {el.title}
            </FilterTitle>
            {el.type === 'checkbox' && (
              <FilterCheckbox
                data={el.data}
                onChange={(e) => onChangeFilter(e.target.value)}
              />
            )}
            {el.type === 'range' && <FilterRange data={el.data} />}
          </FilterItem>
        );
      })}
    </FilterList>
  );
};

export default FilterBlock;
