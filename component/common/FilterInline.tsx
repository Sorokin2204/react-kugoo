import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export type FilterInlineType = {
  label: string;
  value: string;
};

type Props = {
  data: FilterInlineType[];
  onChangeSort: (selectSort: string) => {};
};

const FilterInline: React.FC<Props> = ({ data, onChangeSort }) => {
  const [activeFilter, setActiveFilter] = useState<string>(data[0].value);
  const theme = useTheme();
  const handleChangeFilter = (
    event: React.ChangeEvent<Element>,
    value: string,
  ) => {
    setActiveFilter(value);
  };
  useEffect(() => {
    onChangeSort(activeFilter);
  }, [activeFilter]);

  return (
    <FormControl>
      <FilterRadioGroup onChange={handleChangeFilter}>
        {data.map((el, i) => {
          return (
            <FilterFormControlLabel
              margin={theme.spacing(5)}
              sx={{ px: 10, py: 5, m: 0 }}
              key={i}
              value={el.value}
              control={<Radio />}
              label={el.label}
              active={activeFilter === el.value}
              defaultChecked={i === 0}
            />
          );
        })}
      </FilterRadioGroup>
    </FormControl>
  );
};

export default FilterInline;

const FilterFormControlLabel = styled(FormControlLabel)<{
  active: boolean;
  margin: string;
}>(({ theme, active, margin }) => ({
  display: 'block',
  borderRadius: '5px',
  color: theme.palette.grey[600],
  border: `1px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.grey[100],
  margin: '0',
  '&:first-of-type': {
    marginLeft: 0,
  },

  ...theme.typography.t4,
  '& .MuiRadio-root': {
    visibility: 'hidden',
    display: 'none',
  },
  ...(active && {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.common.white,
  }),
}));
const FilterRadioGroup = styled(RadioGroup)(({ theme }) => ({
  display: 'inline-flex',
  gridGap: '10px',
  flexDirection: 'row',
}));
