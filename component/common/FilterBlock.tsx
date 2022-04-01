import { useQuery } from '@apollo/client';
import { Box, Grid, styled, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { GET_ALL_SPEC_WITH_OPTIONS } from '../../graphql/query/spec';
import FilterCheckbox, { CheckboxFilterProps } from './FilterCheckbox';
import FilterRange, { RangeFilterProps } from './FilterRange';

type Props = {
  onChangeFilter: (selectFilter: string) => {};
  sx?: object;
  categorySlug: string;
};

type FilterBlock = {
  title: string;
  type: 'range' | 'checkbox';
  data: CheckboxFilterProps[] | RangeFilterProps;
};

const FilterList = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: '10px',
  [theme.breakpoints.down('lg')]: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: 'repeat(auto-fill,minmax(215px,1fr))',
    gridGap: '20px',
    gridRow: '1/2',
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

const FilterBlock: React.FC<Props> = ({ sx, onChangeFilter, categorySlug }) => {
  const [filterData, setFilterData] = useState([]);
  const { data, loading, error, refetch } = useQuery(
    GET_ALL_SPEC_WITH_OPTIONS,
    {
      variables: {
        categorySlug: categorySlug,
      },
    },
  );
  useEffect(() => {
    if (!loading) {
      console.log(JSON.stringify(error, null, 2));

      setFilterData(
        data.getAllSpecWithOptions.map((spec) => ({
          _id: spec._id,
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
          <FilterItem key={i}>
            <FilterTitle sx={{ mb: 7.5 }} variant="t1b">
              {el.title}
            </FilterTitle>
            {el.type === 'checkbox' && (
              <FilterCheckbox
                data={el.data}
                onChange={(e) => onChangeFilter(e.target.value, el._id)}
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
