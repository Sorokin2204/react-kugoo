import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { styled, Box, IconButton, Typography } from '@mui/material';
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import { ProductImage } from '../../types/graphql';
import { arrayMoveImmutable } from 'array-move';
import {
  AddCircle,
  AddCircleOutline,
  AddCircleOutlined,
  AddPhotoAlternate,
  AddRounded,
  Delete,
  DragIndicator,
  MoveDown,
  PlusOneRounded,
  ZoomOutMap,
} from '@mui/icons-material';
import Image from 'next/image';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { UseFieldArrayReturn } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

const GalleryBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: '10px',
  padding: '30px',
}));
const GalleryList = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,200px)',
  justifyContent: 'center',
  gridGap: '20px',
}));
// const GalleryImg = styled('img')(({ theme }) => ({
//   display: 'block',
//   width: '100%',
//   height: 'auto',
//   borderRadius: '10px',
// }));
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
}));
const DropIcon = styled(AddPhotoAlternate)(({ theme }) => ({
  fontSize: 50,
  color: theme.palette.grey[600],
  marginTop: '30px',
}));
const GalleryDropBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '40px',
}));

type Props = {
  images:
    | UseFieldArrayReturn
    | React.MutableRefObject<Maybe<Maybe<ProductImage>[]> | undefined>;
  setImages: Dispatch<SetStateAction<ProductImage>>;
  //   form: UseFormReturn;
};

const ImageGallery: React.FC<Props> = ({ images, setImages }) => {
  console.log('render');
  const [imagesState, setImagesState] = useState(
    images.current.map((img) => ({
      ...img,
      id: (Math.random() * 10000).toString(36),
    })),
  );

  const onDrop = useCallback((acceptedFiles) => {
    // console.log(acceptedFiles);
    const objectUrl = URL.createObjectURL(acceptedFiles[0]);
    setImagesState((prev) => [...prev, { newName: objectUrl }]);
    console.log(objectUrl);

    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const DragHandle = sortableHandle(() => (
    <GalleryMove>
      <ZoomOutMap
        sx={{
          fontSize: '35px',
          color: 'primary.main',
        }}
      />
    </GalleryMove>
  ));

  const ImageMemo = function ImageMemo({ src }) {
    return (
      <img
        style={{
          display: 'block',
          width: 'auto',
          // width: '100%',
          height: '100%',
          // height: 'auto',
          // borderRadius: '10px',
        }}
        src={src}
      />
    );
  };

  const GalleryItem: React.FC<{ imgName: string }> = ({
    imgName,
    onDelete,
  }) => {
    const [hover, setHover] = useState(false);

    return (
      <GalleryItemBox
        key={imgName}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <ImageMemo src={imgName} />
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
  const SortableItem = useMemo(
    () =>
      SortableElement(({ value, onDelete }) => {
        return (
          <GalleryItem
            key={value.name}
            imgName={
              value.name ? `/static/products/${value.name}` : value.newName
            }
            onDelete={onDelete}
          />
        );
      }),
    [images],
  );

  const SortableList = SortableContainer(({ items }) => {
    return (
      <GalleryList>
        {items.map((value, index) => (
          <SortableItem
            key={value.id}
            index={index}
            value={value}
            onDelete={() => {
              //   images.remove(index);
              //   images.current = images.current.filter((item, i) => i !== index);
              setImagesState((prev) => prev.filter((item, i) => i !== index));
            }}
          />
        ))}
      </GalleryList>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // images.swap(oldIndex, newIndex);
    // images.current = arrayMoveImmutable(images.current, oldIndex, newIndex);
    setImagesState((prev) => arrayMoveImmutable(prev, oldIndex, newIndex));
  };

  return (
    <GalleryBox>
      <SortableList
        items={imagesState}
        axis="xy"
        onSortEnd={onSortEnd}
        useDragHandle
      />{' '}
      <GalleryDrop>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <GalleryDropBox>
            <DropText variant="h4">
              {!isDragActive ? (
                <>
                  Перетащите сюда картинку, которую хотите добавить или кликните
                  для выбора файла
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
