import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  Typography,
  useTheme,
} from '@mui/material';

export type SpecType = {
  title: string;
  list: Array<{
    label: string;
    value: string;
    subLabel?: string;
    defaultChecked?: boolean;
  }>;
};

type Props = {
  data: SpecType;
};

const RadioBox = styled(Box)(({ theme }) => ({
  gridColumn: '1/12',
  gridRow: '5/6',
}));
const RadioCustom = styled(Radio)(({ theme }) => ({
  display: 'none',
}));
const RadioTitle = styled(Typography)(({ theme }) => ({
  display: 'block',

  ...theme.typography.t2b,
}));
const RadioName = styled(Typography)(({ theme }) => ({
  display: 'block',

  ...theme.typography.t1,
  lineHeight: '20px',
  textAlign: 'center',
  whiteSpace: 'pre',
}));
const RadioList = styled(RadioGroup)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(auto,228px) minmax(auto,228px)',

  gridGap: theme.spacing(10),
}));
const RadioButton = styled(FormControlLabel)<{
  active: boolean;
  small: boolean;
}>(({ theme, active, small }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: small ? '80px' : '126px',
  //   padding: `${theme.spacing(25)} ${theme.spacing(50)}`,
  border: `2px solid ${theme.palette.grey[200]}`,
  borderRadius: '10px',
  ...(active && { borderColor: theme.palette.primary.main }),
  margin: 0,
  padding: `0 ${theme.spacing(15)}`,
}));
const RadioSubtitle = styled(Typography)(({ theme }) => ({
  display: 'block',
  ...theme.typography.t3,
  color: theme.palette.grey[600],
  textAlign: 'center',
  marginTop: theme.spacing(4.5),
}));

const RadioBlock: React.FC<Props> = ({ data }) => {
  const defaultCheckedLabel = data.list.find(
    (el) => el.defaultChecked === true,
  )?.value;

  const sizeBlock: boolean =
    data.list.findIndex((el) => el.subLabel) == -1 ? true : false;
  const [activeFilter, setActiveFilter] = useState<string | undefined>(
    defaultCheckedLabel,
  );

  useEffect(() => {
    console.log(sizeBlock);
  }, []);

  const theme = useTheme();
  const handleChangeFilter = (
    event: React.ChangeEvent<Element>,
    value: string,
  ) => {
    setActiveFilter(value);
  };

  return (
    <>
      <RadioBox>
        <RadioTitle variant="t2b" sx={{ mb: 10 }}>
          {data.title}
        </RadioTitle>

        <FormControl>
          <RadioList onChange={handleChangeFilter}>
            {data.list.map((el, i) => (
              <RadioButton
                active={activeFilter === el.value}
                key={i}
                value={el.value}
                control={<RadioCustom />}
                small={sizeBlock}
                label={
                  <>
                    <RadioName>{el.label}</RadioName>
                    {el.subLabel && (
                      <RadioSubtitle>{el.subLabel}</RadioSubtitle>
                    )}
                  </>
                }
              />
            ))}
          </RadioList>
        </FormControl>
      </RadioBox>
    </>
  );
};

export default RadioBlock;
