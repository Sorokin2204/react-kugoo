import {
  Box,
  Checkbox,
  FormControlLabel,
  FormControlProps,
  FormGroup,
  styled,
  useTheme,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import ButtonIcon from './ButtonIcon';

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
  '&:not(:last-child)': {
    marginBottom: theme.spacing(6),
  },
}));

const BtnCollapse = styled(ButtonIcon)(({ theme }) => ({}));

const FilterCheckbox: React.FC<Props> = ({ data, ...props }) => {
  const theme = useTheme();
  const groupCheckbox = useRef();
  const [maxHeightState, setMaxHeightState] = useState(0);
  const [fullHeightState, setFullHeightState] = useState(0);
  const [collapse, setCollapse] = useState(false);

  const maxHeight = useRef(0);

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          ...(maxHeightState === 0 || collapse
            ? { height: `${fullHeightState}px` }
            : { height: `${maxHeightState}px` }),
          overflow: 'hidden',
        }}>
        <FormGroup
          ref={(groupReff) => {
            if (groupReff?.children?.length > 5) {
              let sum = 0;
              for (let index = 0; index < 5; index++) {
                sum += groupReff?.children[index].scrollHeight + 12;
              }
              setMaxHeightState(sum - 12);
            } else {
              setMaxHeightState(0);
            }
            setFullHeightState(groupReff?.clientHeight);
          }}
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
          }}>
          {data.map((el, i) => {
            return (
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
            );
          })}
        </FormGroup>
      </Box>
      {maxHeightState !== 0 && (
        <ButtonIcon
          onClick={() => {
            setCollapse(!collapse);
          }}
          icon="/static/icons/arrow-down.svg"
          reverse={true}
          iconh={theme.spacing(3.5)}
          iconw={theme.spacing(5)}
          iconcolor={theme.palette.primary.main}
          sx={{
            marginTop: '12px !important',
            '&::before': {
              marginTop: '4px',
              marginLeft: '6px',
              ...(collapse && { transform: 'rotate(180deg)' }),
            },
            fontFamily: 'inherit',
            margin: '0 auto',

            color: theme.palette.primary.main,
          }}>
          {!collapse ? 'Показать' : 'Скрыть'}
        </ButtonIcon>
      )}
    </Box>
  );
};

export default FilterCheckbox;
