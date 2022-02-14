import React, { useEffect, useState } from 'react';
import { Button, Modal, styled, TextField, Typography } from '@mui/material';
import { ModalBox } from '../ModalBox';
import NumberFormat from 'react-number-format';

type Props = {
  open: boolean;
  onClose: () => {};
  opt: object;
  handleSaveEditedOption: () => {};
};

const EditOptionModal: React.FC<Props> = ({
  open,
  onClose,
  opt,
  handleSaveEditedOption,
}) => {
  const [customPrice, setCustomPrice] = useState<number | null>(null);
  const [customSublabel, setCustomSublabel] = useState<string>('');

  useEffect(() => {
    console.log('Custom price in modal ' + customPrice);
  }, [customPrice]);

  useEffect(() => {
    setCustomPrice(opt?.customPrice);
    setCustomSublabel(opt?.customSublabel);
  }, []);

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ModalBox>
          <Typography variant="body1">Изменение {opt?.label}</Typography>

          <TextField
            value={customSublabel}
            label="Кастомный подтекст"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(e) => setCustomSublabel(e.target.value)}
          />

          <NumberFormat
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
            onClick={() =>
              handleSaveEditedOption(opt, customPrice, customSublabel)
            }>
            Сохранить
          </Button>
        </ModalBox>
      </Modal>
    </>
  );
};

export default EditOptionModal;
