import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormControlProps,
  FormGroup,
  styled,
} from '@mui/material';

type Props = { data: CheckboxFilterProps[] } & FormControlProps;

export type CheckboxFilterProps = { label: string; value: string };

const FilterCheckboxIcon = styled('span')(({ theme }) => ({
  '&:before': {
    content: '""',
    display: 'block',
    width: '16px',
    height: '16px',
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[600]}`,
    borderRadius: `2px`,
    marginRight: theme.spacing(5),
  },
}));

const FilterCheckboxIconChecked = styled(FilterCheckboxIcon)(({ theme }) => ({
  '&:before': {
    background: 'url(/static/icons/check.svg) no-repeat 50% 40%/ 10px 8px',
    backgroundColor: theme.palette.common.white,
    border: '1px solid transparent',
  },
}));

const FilterCheckboxStyle = styled(Checkbox)(({ theme }) => ({
  padding: '0px',
}));
const FilterFormControlLabelStyle = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiTypography-root': {
    ...theme.typography.t3,
  },
  margin: '0px',
  '& + &': {
    marginTop: theme.spacing(6),
  },
}));

const FilterCheckbox: React.FC<Props> = ({ data, ...props }) => {
  return (
    <FormGroup>
      {data.map((el, i) => (
        <FilterFormControlLabelStyle
          {...props}
          key={i}
          label={el.label}
          value={el.value}
          control={
            <FilterCheckboxStyle
              icon={<FilterCheckboxIcon />}
              checkedIcon={<FilterCheckboxIconChecked />}
              disableRipple={true}
            />
          }
        />
      ))}
    </FormGroup>
  );
};

export default FilterCheckbox;
