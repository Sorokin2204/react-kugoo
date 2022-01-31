import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  useTheme,
} from '@mui/material';

export type FilterInlineType = {
  label: string;
  value: string;
};

type Props = {
  data: FilterInlineType[];
};

const FilterInline: React.FC<Props> = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const theme = useTheme();
  const handleChangeFilter = (
    event: React.ChangeEvent<Element>,
    value: string,
  ) => {
    setActiveFilter(value);
  };
  return (
    <FormControl>
      <FilterRadioGroup onChange={handleChangeFilter}>
        {data.map((el, i) => (
          <FilterFormControlLabel
            margin={theme.spacing(5)}
            sx={{ px: 10, py: 5, m: 0, ml: 5 }}
            key={i}
            value={el.value}
            control={<Radio />}
            label={el.label}
            active={activeFilter === el.value}
          />
        ))}
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
  display: 'flex',
  flexDirection: 'row',
}));