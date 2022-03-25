import { Edit } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import useAppConfig from '../../hooks/useAppConfig';

const ProductAttrBox = styled(Box)(({ theme }) => ({}));
const ProductAttrHead = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `2px solid ${theme.palette.grey[500]}`,
  backgroundColor: `${theme.palette.grey[500]}`,
  color: ` ${theme.palette.common.white}`,
  borderRadius: '5px',
  padding: '10px',
  ...(active && {
    border: `2px solid ${theme.palette.success.main}`,
    backgroundColor: `${theme.palette.success.main}`,
    color: `${theme.palette.common.white}`,
  }),
}));
const ProductAttrLabel = styled(FormControlLabel)<{
  active: boolean;
  custom: boolean;
}>(({ theme, active, custom }) => ({
  userSelect: 'none',
  margin: 0,
  border: `2px solid ${theme.palette.grey[500]}`,
  color: theme.palette.grey[500],
  borderRadius: '5px',
  padding: '10px',
  marginTop: '10px',
  '& .MuiFormControlLabel-label': {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  '& .MuiSvgIcon-root': {
    fill: theme.palette.grey[500],
  },
  ...(active && {
    border: `2px solid ${theme.palette.success.main}`,
    color: `${theme.palette.success.main}`,
    '& .MuiSvgIcon-root': {
      fill: theme.palette.success.main,
    },
  }),
  ...(custom && {
    border: `2px solid ${theme.palette.primary.main}`,
    color: `${theme.palette.primary.main}`,
    '& .MuiSvgIcon-root': {
      fill: theme.palette.primary.main,
    },
  }),
}));
const ProductAttrCheckbox = styled(Checkbox)(({ theme }) => ({
  display: 'none',
}));

type Props = {
  open: boolean;
  attrData: object;
  setOpen: () => void;
  handleCheckboxChange: (optId: string) => void;
  handleClose: () => void;
};

const ProductAttribute: React.FC<Props> = ({
  open,
  setOpen,
  attrData,
  handleCheckboxChange,
  handleClose,
}) => {
  const { setEditedOption } = useAppConfig();

  return (
    <ProductAttrBox>
      <ProductAttrHead
        onClick={() => setOpen()}
        active={attrData.opts.findIndex((opt) => opt.checked === true) !== -1}>
        <Typography sx={{ fontWeight: '600' }}>{attrData.name}</Typography>
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </ProductAttrHead>
      <Collapse in={open}>
        <FormGroup sx={{ display: 'flex' }}>
          {attrData.opts.map((opt) => (
            <ProductAttrLabel
              active={opt.checked}
              custom={(opt.customPrice || opt.customSublabel) && opt.checked}
              key={opt._id}
              control={
                <ProductAttrCheckbox
                  onChange={() => {
                    handleCheckboxChange(opt._id);
                  }}
                />
              }
              label={
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <Typography variant="body1" sx={{ fontWeight: '600' }}>
                      {opt.label}
                    </Typography>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: '500',
                          ...(opt.customSublabel && {
                            textDecoration: 'line-through',
                          }),
                        }}>
                        {opt.subLabel}
                      </Typography>
                      {opt.customSublabel && (
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: '500',
                            marginLeft: '6px',
                            padding: '4px',
                            borderRadius: '10px',

                            backgroundColor: 'primary.main',
                            color: 'common.white',
                            ...(!opt.checked && {
                              backgroundColor: grey[500],
                              color: 'common.white',
                            }),
                          }}>
                          {opt.customSublabel}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginLeft: 'auto',
                    }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: '600',
                        ...(opt.customPrice !== null && {
                          textDecoration: 'line-through',
                        }),
                      }}>
                      {`${opt.defaultPrice ?? 0}₽`}
                    </Typography>
                    {opt.customPrice !== null && (
                      <Typography
                        variant="body"
                        sx={{
                          fontWeight: '600',
                          borderRadius: '10px',
                          padding: '4px',
                          backgroundColor: 'primary.main',
                          color: 'common.white',
                          ...(!opt.checked && {
                            backgroundColor: grey[500],
                            color: 'common.white',
                          }),
                        }}>
                        {`${opt.customPrice}₽`}
                      </Typography>
                    )}
                  </Box>

                  <IconButton
                    sx={{ p: 0, ml: 1 }}
                    onClick={() => {
                      setEditedOption(opt);
                      handleClose();
                    }}>
                    <Edit />
                  </IconButton>
                </>
              }
            />
          ))}
        </FormGroup>
      </Collapse>
    </ProductAttrBox>
  );
};

export default ProductAttribute;
