import { Box, Slider, styled, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InputText from './InputText';

type Props = {
  data: RangeFilterProps;
};

export type RangeFilterProps = {
  min: number;
  max: number;
  step: number;
  minDistance: number;
};

const FilterRange: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  const [rangeValue, setRangeValue] = useState<[number, number]>([
    data.min,
    data.max,
  ]);
  const [minInputValue, setMinInputValue] = useState<number>(data.min);
  const [maxInputValue, setMaxInputValue] = useState<number>(data.max);

  useEffect(() => {
    setMinInputValue(rangeValue[0]);
    setMaxInputValue(rangeValue[1]);
  }, [rangeValue]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRangeValue([
        Math.min(newValue[0], rangeValue[1] - data.minDistance),
        rangeValue[1],
      ]);
    } else {
      setRangeValue([
        rangeValue[0],
        Math.max(newValue[1], rangeValue[0] + data.minDistance),
      ]);
    }
  };

  const handleMinInputChange = (event) => {
    const newMin = event.target.value;
    setMinInputValue(newMin);
  };
  const handleMaxInputChange = (event) => {
    const newMax = event.target.value;
    setMaxInputValue(newMax);
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleMinBlur = (event) => {
    const newMin = event.target.value;
    if (data.min < newMin) {
      setRangeValue([newMin, rangeValue[1]]);
    }
    if (newMin > rangeValue[1] - data.minDistance) {
      setRangeValue([rangeValue[1] - data.minDistance, rangeValue[1]]);
    } else {
      setRangeValue([data.min, rangeValue[1]]);
    }
  };
  const handleMaxBlur = (event) => {
    const newMax = event.target.value;
    if (data.max > newMax) {
      setRangeValue([rangeValue[0], newMax]);
    }
    if (newMax < rangeValue[0] + data.minDistance) {
      setRangeValue([rangeValue[0], rangeValue[0] + data.minDistance]);
    } else {
      setRangeValue([rangeValue[0], data.max]);
    }
  };
  return (
    <Box sx={{}}>
      <Slider
        sx={{
          flexBasis: '100%',
          '& .MuiSlider-track': {
            height: '1px',
          },
          '& .MuiSlider-rail': {
            height: '2px',
            backgroundColor: theme.palette.grey[200],
          },
          '& .MuiSlider-thumb': {
            width: '16px',
            height: '16px',
            '&::before': {
              boxShadow: 'none',
            },
            '&::after': {
              pointerEvents: 'none',
              content: '""',
              display: 'block',
              width: '7px',
              height: '7px',
              backgroundColor: theme.palette.common.white,
              position: 'absolute',
              top: '50%',
              left: '50%',
            },
            '&:focus, &:hover, &.Mui-active,  &.Mui-focusVisible': {
              boxShadow: 'none',
              '@media (hover: none)': {
                boxShadow: 'none',
              },
            },
          },
        }}
        getAriaLabel={() => 'Minimum distance'}
        value={rangeValue}
        onChange={handleChange1}
        valueLabelDisplay="off"
        disableSwap={true}
        min={data.min}
        max={data.max}
        step={data.step}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <RangeInput
          onBlur={handleMinBlur}
          onFocus={handleFocus}
          small
          value={minInputValue}
          placeholder={data.min.toString()}
          onInput={handleMinInputChange}
          type="number"
        />
        <RangeDivider></RangeDivider>
        <RangeInput
          onBlur={handleMaxBlur}
          onFocus={handleFocus}
          sx={{ '& .MuiInputBase-input': { textAlign: 'center' } }}
          small
          value={maxInputValue}
          placeholder={data.max.toString()}
          onInput={handleMaxInputChange}
        />
      </Box>
    </Box>
  );
};

const RangeInput = styled(InputText)(({ theme }) => ({
  maxWidth: '80px',

  '& .MuiInputBase-input': {
    textAlign: 'center',
    caretColor: 'transparent',
    maxHeight: '17px',
  },
}));

const RangeDivider = styled(Box)(({ theme }) => ({
  height: '1px',
  width: theme.spacing(8),
  backgroundColor: theme.palette.common.black,
  margin: 'auto 0',
}));
export default FilterRange;
