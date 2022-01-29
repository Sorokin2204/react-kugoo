import React, {
  MouseEventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from 'react';
import { Box, Link, Popover, PopoverProps, styled } from '@mui/material';

import { random } from 'lodash';

type Props = {};

type CatalogFilter = {
  title: string;
  list: Array<{ name: string; url: string }>;
};

type CatalogPopover = {
  id: string;
  name: string;
  icon: string;
  path: string;
  filter?: CatalogFilter[];
};

const loremText = `Современные технологии достигли такого уровня, что повышение уровня гражданского сознания не оставляет шанса для прогресса профессионального сообщества. Господа, постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании новых принципов формирования материально-технической и кадровой базы. А также тщательные исследования конкурентов могут быть разоблачены. В рамках спецификации современных стандартов, явные признаки победы институционализации формируют глобальную экономическую сеть и при этом - представлены в исключительно положительном свете. Как принято считать, действия представителей оппозиции призывают нас к новым свершениям, которые, в свою очередь, должны быть превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.`;
const loremWords = loremText
  .replace(/\,/g, '')
  .replace(/\./g, '')
  .replace(/\-/g, '')
  .replace('(', '')
  .replace(')', '')
  .split(' ')
  .filter((el) => el.length > 5);

// const filter = [
//   {
//     title: 'Особености',
//     list: listData,
//   },
// ];

const randomFilterData = () => {
  const countColumn = random(1, 2);
  const filter = [...Array(random(1, 2))].map((ell) => ({
    title: loremWords[random(0, loremWords.length)],
    list: [...Array(random(1, 5))].map((el) => {
      const word = loremWords[random(0, loremWords.length)];
      return {
        name: word,
        url: `/${word}`,
      };
    }),
  }));

  return filter;
};

const catalogData: CatalogPopover[] = [
  {
    id: 'electric-1',
    name: 'Электросамокаты',
    icon: '/static/icons/electric-scooter-1.svg',
    path: '/catalog/electric-scooter',
    filter: randomFilterData(),
  },
  {
    id: 'electric-2',
    name: 'Электроскутеры',
    icon: '/static/icons/electric-scooter-2.svg',
    path: '/catalog/electric-scooter',
    filter: randomFilterData(),
  },
  {
    id: 'electric-3',
    name: 'Электровелосипеды',
    icon: '/static/icons/electric-bike.svg',
    path: '/catalog/electric-scooter',
    filter: randomFilterData(),
  },
  {
    id: 'electric-4',
    name: 'Робот-пылесосы',
    icon: '/static/icons/vacuum-cleaner.svg',
    path: '/catalog/electric-scooter',
    filter: randomFilterData(),
  },
  {
    id: 'electric-5',
    name: 'Весы',

    icon: '/static/icons/weighing-scale.svg',
    path: '/catalog/electric-scooter',
    filter: randomFilterData(),
  },
];

const CatalogPopover: React.FC<PopoverProps> = (props) => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [activeFilterData, setActiveFilterData] = useState<
    CatalogFilter[] | null
  >(null);

  useEffect(() => {
    console.log(randomFilterData());

    setActiveLink(catalogData[0].id);
  }, []);

  useEffect(() => {
    const foundFilterData = catalogData.find(
      (el) => el.id == activeLink,
    )?.filter;
    foundFilterData && setActiveFilterData(foundFilterData);
  }, [activeLink]);

  const handleClickLink = (
    event: React.MouseEvent<Element, MouseEvent>,
    linkId: string,
  ) => {
    setActiveLink(linkId);
    console.log(activeFilterData);
  };

  return (
    <Catalog {...props}>
      <Category sx={{ pt: 10, pr: 17, pb: 14, pl: 12 }}>
        <CategoryList>
          {catalogData.map((el, i) => (
            <CategoryItem key={i}>
              <CategoryLink
                active={activeLink == el.id}
                onMouseEnter={(event) => handleClickLink(event, el.id)}
                href={el.path}
                icon={el.icon}>
                {el.name}
              </CategoryLink>
            </CategoryItem>
          ))}
        </CategoryList>
      </Category>
      <Filter sx={{ pl: 20, pt: 10, pr: 10, pb: 10 }}>
        <FilterBlockList>
          {activeFilterData?.map((el, i) => (
            <FilterBlockItem key={i}>
              <FitlerTitle sx={{ mb: 7 }}>{el.title}</FitlerTitle>
              <FilterList>
                {el.list.map((item, i) => (
                  <FilterItem key={i}>
                    <FilterLink href={item.url}>{item.name}</FilterLink>
                  </FilterItem>
                ))}
              </FilterList>
            </FilterBlockItem>
          ))}
        </FilterBlockList>
      </Filter>
    </Catalog>
  );
};

export default CatalogPopover;
const Catalog = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    display: 'flex',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(5),
    minHeight: theme.spacing(128),
  },
}));
const Category = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
}));
const Filter = styled(Box)(({ theme }) => ({}));
const FilterBlockList = styled(Box)(({ theme }) => ({ display: 'flex' }));
const FilterBlockItem = styled(Box)(({ theme }) => ({
  '& + &': {
    marginLeft: theme.spacing(30),
  },
}));
const FitlerTitle = styled(Box)(({ theme }) => ({
  ...theme.typography.t2b,
  textTransform: 'capitalize',
}));
const FilterList = styled(Box)(({ theme }) => ({}));
const FilterItem = styled(Box)(({ theme }) => ({
  '& + &': {
    marginTop: theme.spacing(5),
  },
}));
const FilterLink = styled(Link)(({ theme }) => ({
  textTransform: 'capitalize',
  textDecoration: 'none',
  ...theme.typography.t3,
  color: theme.palette.grey[600],
}));
const CategoryList = styled(Box)(({ theme }) => ({}));
const CategoryItem = styled(Box)(({ theme }) => ({
  '& + &': {
    marginTop: theme.spacing(7),
  },
}));
const CategoryLink = styled(Link)<{ icon: string; active: boolean }>(
  ({ theme, icon, active }) => ({
    display: 'flex',
    alignItems: 'center',

    ...theme.typography.t2b,
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    textDecoration: 'none',
    '&::before': {
      content: '""',
      display: 'block',
      marginTop: '2px',
      marginRight: theme.spacing(5),
      mask: `url(${icon}) no-repeat 0 0`,
      width: '16px',
      height: '16px',
      maskSize: 'contain',
      backgroundColor: active
        ? theme.palette.primary.main
        : theme.palette.grey[600],
    },
  }),
);
