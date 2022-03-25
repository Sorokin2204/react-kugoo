import { useTheme } from '@emotion/react';
import { Box, MenuItem, Select, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { filterInlineData } from './Catalog';
import SelectCustom from './SelectCustom';

type Props = {
  data: typeof filterInlineData;
  onChangeSort: (selectSort: string) => {};
};

const CatalogSort: React.FC<Props> = ({ data, onChangeSort }) => {
  const theme = useTheme();

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
