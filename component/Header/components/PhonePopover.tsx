import {
  Divider,
  Grid,
  Popover,
  PopoverProps,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

const PhonePopoverStyled = styled(Popover)(({ theme }) => ({}));

const PhoneList = styled(Grid)(({ theme }) => ({
  minWidth: theme.spacing(124),

  flexDirection: 'column',
  backgroundColor: theme.palette.common.white,
}));
const PhoneItem = styled(Grid)(({ theme }) => ({
  '& + &': {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  },

  padding: ` ${theme.spacing(8)} ${theme.spacing(10)}`,
}));
const PhoneTitle = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: theme.palette.grey[600],
}));
const PhoneNumber = styled(Typography)(({ theme }) => ({
  display: 'block',
  textWrap: 'nowrap',
}));
const PhoneTime = styled(Typography)(({ theme }) => ({ display: 'block' }));

type PhoneData = {
  title: string;
  number: string;
  workTime?: string;
};
const phoneData: PhoneData[] = [
  {
    title: 'Сервисный центр',
    number: '+ 7 (499) 350 76 92',
  },
  {
    title: 'Оптовый отдел',
    number: '+7 (499) 281-64-52',
    workTime: 'пн-сб 10:00 - 19:00',
  },

  {
    title: 'Сервисный центр',
    number: '+ 7 (499) 350 76 92',
    workTime: 'ср-вс с 10:00 до 19:00',
  },
];

function PhonePopover(props: PopoverProps) {
  const theme = useTheme();

  return (
    <PhonePopoverStyled {...props}>
      <PhoneList container>
        {phoneData.map((el, i) => (
          <>
            <PhoneItem item key={i}>
              <PhoneTitle variant="t4">{el.title}</PhoneTitle>
              <PhoneNumber variant="t2b">{el.number}</PhoneNumber>
              <PhoneTime variant="t4">{el.workTime}</PhoneTime>
            </PhoneItem>
          </>
        ))}
      </PhoneList>
    </PhonePopoverStyled>
  );
}

export default PhonePopover;
