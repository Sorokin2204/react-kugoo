import {
  Divider,
  Grid,
  Popover,
  PopoverProps,
  Popper,
  PopperProps,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { phoneData } from '../../../../data/phoneData';
import PopperCustom from '../../PopperBox';

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
const PhoneNumber = styled('a')(({ theme }) => ({
  display: 'block',
  textWrap: 'nowrap',
  textDecoration: 'none',

  color: theme.palette.text.primary,
  ...theme.typography.t2b,
}));
const PhoneTime = styled(Typography)(({ theme }) => ({ display: 'block' }));

function PhonePopover(props: PopperProps) {
  const theme = useTheme();
  return (
    <PopperCustom {...props}>
      <PhoneList container>
        {phoneData.map((el, i) => (
          <>
            <PhoneItem item key={i}>
              <PhoneTitle variant="t4">{el.title}</PhoneTitle>
              <PhoneNumber href={`tel:${el.number.replace(/\D/g, '')}`}>
                {el.number}
              </PhoneNumber>
              <PhoneTime variant="t4">{el.workTime}</PhoneTime>
            </PhoneItem>
          </>
        ))}
      </PhoneList>
    </PopperCustom>
  );
}

export default PhonePopover;
