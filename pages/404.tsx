import React from 'react';
import { styled, Typography } from '@mui/material';

type Props = {};

const NotFoundPage: React.FC<Props> = ({}) => {
  return (
    <>
      <Typography
        variant="h1"
        sx={(theme) => ({
          py: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.palette.grey[600],
          [theme.breakpoints.down('md')]: {
            py: 100,
          },
        })}>
        Страница не найдена
      </Typography>
    </>
  );
};

export default NotFoundPage;
