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
  title?: string;
  list: Array<{
    label: string;
    value: string;
    subLabel?: string;
    defaultChecked?: boolean;
    content?: React.ReactNode | undefined;
  }>;
};

type Props = {
  data: SpecType;
};

const RadioBox = styled(Box)(({ theme }) => ({
  gridColumn: '1/12',
  gridRow: '5/6',
}));
const RadioCustom = styled(Radio)<{ withContent: boolean }>(
  ({ theme, withContent }) => ({
    padding: '0 !important',
    marginTop: '0px',
    marginRight: '10px',
    '&.Mui-checked': {
      position: 'relative',
      '&::before': {
        content: '""',
        display: 'block',
        width: '8px',
        height: '8px',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '50%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
      '&::after': {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    '&::after': {
      content: '""',
      display: 'block',
      width: '16px',
      height: '16px',
      backgroundColor: theme.palette.common.white,
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: '50%',
    },
    '& .MuiRadio-root': {},
    '& .MuiSvgIcon-root': {
      display: 'none',
    },
    display: 'none',
    ...(withContent && { display: 'block' }),
  }),
);
const RadioTitle = styled(Typography)(({ theme }) => ({
  display: 'block',

  ...theme.typography.t2b,
}));
const RadioContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));
const RadioBody = styled(Box)(({ theme }) => ({
  height: '100%',
}));
const RadioName = styled(Typography)<{ withContent: boolean }>(
  ({ theme, withContent }) => ({
    ...theme.typography.t1,
    display: 'block',
    lineHeight: '20px',
    textAlign: 'center',
    whiteSpace: 'pre',
    ...(withContent && {
      ...theme.typography.t2b,
      textAlign: 'left',
      lineHeight: '16px',
      whiteSpace: 'normal',
    }),
  }),
);
const RadioList = styled(RadioGroup)<{
  withContent: boolean;
}>(({ theme, withContent }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2,minmax(auto,228px))',

  gridGap: theme.spacing(10),
  ...(withContent && { gridTemplateColumns: 'repeat(3,minmax(auto,240px))' }),
}));
const RadioButton = styled(FormControlLabel)<{
  active: boolean;
  small: boolean;
  withContent: boolean;
}>(({ theme, active, small, withContent }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '126px',
  border: `2px solid ${theme.palette.grey[200]}`,
  borderRadius: '10px',
  margin: 0,
  padding: `0 ${theme.spacing(15)}`,

  ...(small && { height: '80px' }),
  ...(withContent && {
    height: '160px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: `${theme.spacing(8)} ${theme.spacing(7.5)}`,
    paddingRight: '20px',
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.background.paper}`,
    '& .MuiFormControlLabel-label': {
      display: 'flex',
      height: '100%',
    },
  }),
  ...(active && {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.common.white,
  }),
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

  const withSubtitle: boolean =
    data.list.findIndex((el) => el.subLabel) == -1 ? true : false;

  const withContent: boolean =
    data.list.findIndex((el) => el.content) == -1 ? true : false;

  const [activeFilter, setActiveFilter] = useState<string | undefined>(
    defaultCheckedLabel,
  );

  useEffect(() => {
    console.log();
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
          <RadioList onChange={handleChangeFilter} withContent={!withContent}>
            {data.list.map((el, i) => (
              <RadioButton
                withContent={!withContent}
                active={activeFilter === el.value}
                key={i}
                value={el.value}
                control={<RadioCustom withContent={!withContent} />}
                small={withSubtitle}
                label={
                  <>
                    <RadioContent>
                      <RadioName withContent={!withContent}>
                        {el.label}
                      </RadioName>
                      {el.subLabel && (
                        <RadioSubtitle>{el.subLabel}</RadioSubtitle>
                      )}
                      <RadioBody>{el.content}</RadioBody>
                    </RadioContent>
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
