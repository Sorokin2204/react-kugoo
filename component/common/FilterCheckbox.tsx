import React, { Ref, RefObject, useEffect, useRef, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormControlProps,
  FormGroup,
  styled,
  useTheme,
} from '@mui/material';
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
  // const groupRef = useRef();
  const groupCheckbox = useRef();
  const [maxHeightState, setMaxHeightState] = useState(0);
  const [fullHeightState, setFullHeightState] = useState(0);
  const [collapse, setCollapse] = useState(false);
  // const maxHeightEnd = useRef(0);
  const maxHeight = useRef(0);
  useEffect(() => {
    // setMaxHeightState(maxHeight.current);
    console.log(maxHeight.current);
  }, [maxHeight]);

  // useEffect(() => {
  //   // console.log(groupCheckbox.current.children);
  //   Array(5).map((item, index) => {
  //     console.log(groupCheckbox.current.children[index].clientHeight);
  //   });
  // }, [groupCheckbox]);

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
            // console.log(groupReff?.children);
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
            // groupReff?.children?.map((checkbox, index) => {
            //   if (index < 5) {
            //     let sum;
            //     sum += checkbox.clientHeight;
            //     console.log(sum);
            //   }
            // });

            // Array(5).map((item, index) => {
            //   console.log(groupReff.children);
            // });
            // groupCheckbox.current = groupReff;
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
                // ref={(filterRef) => {
                //   if (i <= 5 && filterRef) {
                //     maxHeight.current += filterRef.clientHeight;
                //     if (i === 5) maxHeightEnd.current = maxHeight.current;
                //   }
                // }}
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
      </Box>{' '}
      {maxHeightState !== 0 && (
        <BtnCollapse
          onClick={() => {
            setCollapse(!collapse);
          }}
          icon="/static/icons/arrow-down.svg"
          reverse={true}
          iconH={theme.spacing(3.5)}
          iconW={theme.spacing(5)}
          iconColor={theme.palette.primary.main}
          sx={{
            marginTop: '12px !important',
            '&::before': {
              marginTop: '4px',
              marginLeft: '6px',
              ...(collapse && { transform: 'rotate(180deg)' }),
            },
            fontFamily: 'inherit',
            margin: '0 auto',
            // ...theme.typography.t2,
            color: theme.palette.primary.main,
          }}>
          {!collapse ? 'Показать' : 'Скрыть'}
        </BtnCollapse>
      )}
    </Box>
  );
};

export default FilterCheckbox;
