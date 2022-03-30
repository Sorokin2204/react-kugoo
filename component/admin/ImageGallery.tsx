import { AddPhotoAlternate, Delete, ZoomOutMap } from '@mui/icons-material';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { arrayMoveImmutable } from 'array-move';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UseFieldArrayReturn } from 'react-hook-form';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { ProductImage } from '../../types/graphql';

const GalleryBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: '10px',
  padding: '30px',
  [theme.breakpoints.down('md')]: {
    padding: '15px',
  },
}));
const GalleryList = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,200px)',
  justifyContent: 'center',
  gridGap: '20px',
  [theme.breakpoints.down('md')]: {
    gridGap: '10px',
  },
}));
const GalleryImg = styled('img')(({ theme }) => ({
  display: 'block',
  width: 'auto',
  height: '100%',
}));
const GalleryItemBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxWidth: '200px',
  height: '150px',
  maxHeight: '150px',
  borderRadius: '10px',
  overflow: 'hidden',
  backgroundColor: theme.palette.grey[300],
}));

const GalleryBackdrop = styled(Box)(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'rgba(0,0,0, 0.3)',
}));
const GalleryDelete = styled(IconButton)(({ theme }) => ({}));
const GalleryMove = styled(IconButton)(({ theme }) => ({}));

const GalleryDrop = styled(Box)(({ theme }) => ({
  border: `5px dashed ${theme.palette.grey[600]}`,
  marginTop: '40px',
}));
const DropText = styled(Typography)(({ theme }) => ({
  fontSize: '28px',
  fontWeight: '600',
  color: theme.palette.grey[600],
  maxWidth: '70%',
  [theme.breakpoints.down('md')]: {
    fontSize: '20px',
  },
}));
const DropIcon = styled(AddPhotoAlternate)(({ theme }) => ({
  fontSize: 50,
  color: theme.palette.grey[600],
  marginTop: '30px',
  [theme.breakpoints.down('md')]: {
    marginTop: '15px',
  },
}));
const GalleryDropBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '40px',
  [theme.breakpoints.down('md')]: {
    padding: '20px',
  },
}));

type Props = {
  images: UseFieldArrayReturn;
  setImages: Dispatch<SetStateAction<ProductImage>>;
};

const DragHandle = SortableHandle(() => (
  <GalleryMove>
    <ZoomOutMap
      sx={{
        fontSize: '35px',
        color: 'primary.main',
      }}
    />
  </GalleryMove>
));
const SortableItem = SortableElement(({ value, onDelete }) => {
  return (
    <GalleryItem
      imgName={value.objectUrl ?? `/static/products/${value.name}`}
      onDelete={onDelete}
    />
  );
});

const SortableList = SortableContainer(({ items, onDelete }) => {
  return (
    <GalleryList>
      {items?.map((value, index) => (
        <SortableItem
          key={`item-${value.name}`}
          index={index}
          value={value}
          onDelete={() => onDelete(index)}
        />
      ))}
    </GalleryList>
  );
});

const GalleryItem: React.FC<{ imgName: string }> = ({ imgName, onDelete }) => {
  const [hover, setHover] = useState(false);

  return (
    <GalleryItemBox
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <GalleryImg src={imgName} />
      <GalleryBackdrop sx={{ ...(!hover && { display: 'none' }) }}>
        <DragHandle />
        <GalleryDelete
          onClick={() => {
            onDelete();
          }}>
          <Delete color="error" sx={{ fontSize: '35px' }} />
        </GalleryDelete>
      </GalleryBackdrop>
    </GalleryItemBox>
  );
};
const ImageGallery: React.FC<Props> = ({ images, setImages }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      let newFiles = [];
      acceptedFiles.map((acceptedFile) => {
        if (images.length + newFiles.length <= 20) {
          const objectUrl = URL.createObjectURL(acceptedFile);
          newFiles.push({
            name: acceptedFile.name,
            objectUrl: objectUrl,
            file: acceptedFile,
          });
        }
      });

      setImages((prev) => [...prev, ...newFiles]);
    },
    [images],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg,image/png',
    maxFiles: 20,
    maxSize: 10486000,
    onDrop,
  });

  const handlerDelete = (index) => {
    setImages((prev) => prev.filter((item, i) => i !== index));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setImages((prev) => arrayMoveImmutable(prev, oldIndex, newIndex));
  };

  return (
    <GalleryBox>
      <SortableList
        items={images}
        axis="xy"
        onSortEnd={onSortEnd}
        onDelete={handlerDelete}
        useDragHandle
      />
      <GalleryDrop>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <GalleryDropBox>
            <DropText variant="h4">
              {!isDragActive ? (
                <>
                  Перетащите сюда картинку, которую хотите добавить или кликните
                  для выбора файла.
                  <br /> <br /> Макс.размер файла - 5 МБ
                  <br /> Макс.количество файлов - 20
                </>
              ) : (
                <>Поместить картинку сюда ...</>
              )}
            </DropText>
            {!isDragActive && <DropIcon />}
          </GalleryDropBox>
        </div>
      </GalleryDrop>
    </GalleryBox>
  );
};

export default React.memo(ImageGallery);
