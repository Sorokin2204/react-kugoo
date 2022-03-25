import { useState } from 'react';

const useModal = (): [boolean, () => void] => {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = (): void => {
    setOpen(!open);
  };

  return [open, handleToggle];
};

export default useModal;
