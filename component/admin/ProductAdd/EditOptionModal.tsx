import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import useAppConfig from '../../../hooks/useAppConfig';
import { ModalBox } from '../ModalBox';

type Props = {
  open: boolean;
  onClose: () => void;
  checkAttribute: () => void;
};

const EditOptionModal: React.FC<Props> = ({
  open,
  onClose,
  checkAttribute,
}) => {
  const [customPrice, setCustomPrice] = useState<number | null>(null);
  const [customSublabel, setCustomSublabel] = useState<string>('');
  const { editedOption, setEditedOption } = useAppConfig();

  useEffect(() => {
    setCustomPrice(editedOption?.customPrice);
    setCustomSublabel(editedOption?.customSublabel);
  }, []);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ModalBox
          sx={{
            height: 'auto',
            overflow: 'auto',
            maxWidth: '500px',
            width: '100%',
          }}>
          <Typography variant="body1" sx={{ fontSize: '20px', mb: '16px' }}>
            {`Изменение опции "${editedOption?.label}"`}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gap: '15px',
            }}>
            <TextField
              sx={{
                gridColumn: '1/2',
              }}
              value={customSublabel}
              label="Кастомный подтекст"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={(e) => setCustomSublabel(e.target.value)}
            />

            <NumberFormat
              sx={{
                gridColumn: '2/3',
              }}
              value={customPrice}
              customInput={TextField}
              label="Кастомная цена"
              InputLabelProps={{
                shrink: true,
              }}
              thousandSeparator={' '}
              prefix={'₽ '}
              onValueChange={(v) => {
                v.floatValue !== undefined
                  ? setCustomPrice(v.floatValue)
                  : setCustomPrice(null);
              }}
            />
            <Button
              sx={{
                gridColumn: '1/3',
              }}
              variant="contained"
              onClick={() => {
                checkAttribute(editedOption, customPrice, customSublabel);

                setEditedOption(null);
                onClose();
              }}>
              Сохранить
            </Button>
          </Box>
        </ModalBox>
      </Modal>
    </>
  );
};

export default EditOptionModal;
