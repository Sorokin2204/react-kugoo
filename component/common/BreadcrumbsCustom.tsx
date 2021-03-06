import { Box, Breadcrumbs, Link as LinkMui, styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';
type Props = {
  data: Array<{ name: string; ulr: string }>;
};

const BreadcrumbsStyle = styled(Breadcrumbs)(({ theme }) => ({
  '& .MuiBreadcrumbs-separator': {
    ...theme.typography.t4,
    margin: '0 5px',
  },
}));
const BreadItem = styled(Box)(({ theme }) => ({}));
const BreadLink = styled(LinkMui)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: theme.palette.grey[600],
  ...theme.typography.t4,
}));

const BreadcrumbsCustom: React.FC<Props> = ({ children, data }) => {
  return (
    <>
      <BreadcrumbsStyle aria-label="breadcrumb" sx={{ py: 10 }}>
        {data.map((link, index) => (
          <Link href={link.url} key={link.url}>
            <BreadLink href={link.url}>
              {index === 0 && (
                <img
                  src="/static/icons/home.svg"
                  style={{ marginBottom: '3px', marginRight: '6px' }}
                  width={14}
                  height={14}
                />
              )}
              {link.name}
            </BreadLink>
          </Link>
        ))}
      </BreadcrumbsStyle>
    </>
  );
};

export default BreadcrumbsCustom;
