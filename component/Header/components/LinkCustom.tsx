import React from 'react';
import LinkNext from 'next/link';
import { Link as LinkMUI, styled as styledMUI, useTheme } from '@mui/material';
type Props = {
  href: string;
  fontSize?: string;
};

const LinkCustom: React.FC<Props> = ({ href, children, fontSize }) => {
  const LinkCustomStyle = styledMUI(LinkMUI)(({ theme }) => ({
    display: 'block',
    color: theme.palette.grey[600],
    textDecoration: 'none',
  }));
  const theme = useTheme();
  return (
    <>
      <LinkNext href={href}>
        <LinkCustomStyle
          href={href}
          sx={{ fontSize: fontSize ? fontSize : theme.typography.t4 }}>
          {children}
        </LinkCustomStyle>
      </LinkNext>
    </>
  );
};

export default LinkCustom;
