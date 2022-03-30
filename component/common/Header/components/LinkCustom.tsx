import {
  Link as LinkMUI,
  LinkProps,
  styled as styledMUI,
  useTheme,
} from '@mui/material';
import LinkNext from 'next/link';
import React from 'react';
type Props = {
  fontSize?: string;
  active?: boolean;
};

const LinkCustom: React.FC<Props & LinkProps> = ({
  children,
  fontSize,
  ...props
}) => {
  const LinkCustomStyle = styledMUI(LinkMUI)(({ theme }) => ({
    display: 'block',
    color: theme.palette.grey[600],
    textDecoration: 'none',
  }));
  const theme = useTheme();
  return (
    <>
      <LinkNext href={props.href}>
        <LinkCustomStyle
          {...props}
          sx={{
            ...props.sx,
            fontSize: fontSize ? fontSize : theme.typography.t4,
          }}>
          {children}
        </LinkCustomStyle>
      </LinkNext>
    </>
  );
};

export default LinkCustom;
