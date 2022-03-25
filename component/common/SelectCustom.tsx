import { Select, SelectProps, styled } from '@mui/material';
import React from 'react';
import useAppConfig from '../../hooks/useAppConfig';

type SelectData = {
  list: Array<{
    label: string;
    value: string;
    defaultChecked?: boolean;
  }>;
};

type SelectCustomProps = SelectProps & Props;

type Props = {
  typeSelect?: 'rounded';
  beforeText?: string;
};

const SelectCustom: React.FC<SelectCustomProps> = (props) => {
  const { cartProducts, updateInCart } = useAppConfig();
  const [sortValue, setSortValue] = React.useState<string>(props.defaultValue);
  const handleChangeSortValue = (event) => {
    setSortValue(event.target.value);
  };
  return (
    <>
      <SelectStyled
        {...props}
        value={sortValue}
        displayEmpty
        onChange={(event, value) => {
          props?.onChange(event);
          handleChangeSortValue(event);
        }}>
        {props.children}
      </SelectStyled>
    </>
  );
};
const SelectStyled = styled(Select)<Props>(
  ({ theme, typeSelect, beforeText }) => ({
    padding: '0',
    color: theme.palette.primary.main,
    ...theme.typography.t4,
    display: 'flex',
    alignItems: 'center',
    ...(typeSelect === 'rounded' && {
      maxWidth: '300px',
      borderRadius: '300px',
      backgroundColor: `${theme.palette.common.white}`,
      color: theme.palette.text.primary,
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.palette.common.white,
        width: '30px',
        height: '30px',
        position: 'absolute',
        right: '2px',
        top: '54%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        borderRadius: '300px',
        pointerEvents: 'none',
      },
    }),
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1.5px solid ${theme.palette.primary.main} !important`,
      ...(typeSelect === 'rounded' && {
        border: `1.5px solid rgba(93, 108, 123, 0.1) !important`,
      }),
    },
    '& .MuiSelect-select': {
      padding: `${theme.spacing(5)} ${theme.spacing(10)}`,
      paddingRight: '40px !important',
      position: 'relative',
      display: 'flex',
      '&::after': {
        content: '""',
        display: 'block',
        marginLeft: theme.spacing(5),
        mask: `url(/static/icons/arrow-down.svg) no-repeat 0 0`,
        width: '9px',
        height: '5px',
        maskSize: 'contain',
        zIndex: 10,
        backgroundColor: theme.palette.primary.main,
        userSelect: 'none',
        pointerEvents: 'none',
        position: 'absolute',
        right: '10px',
        top: '48%',
        transform: 'translate(-50%,-50%)',
        ...(typeSelect === 'rounded' && {
          backgroundColor: theme.palette.common.black,
        }),
      },
      ...(beforeText && {
        '&::before': {
          content: `"${beforeText}"`,
          display: 'block',
          marginRight: theme.spacing(2.5),
          ...theme.typography.t4,
          color: theme.palette.grey[600],
          userSelect: 'none',
          pointerEvents: 'none',
        },
      }),
    },
  }),
);
export default SelectCustom;
