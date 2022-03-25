import { useQuery } from '@apollo/client';
import { Box, Link, Popover, PopoverProps, styled } from '@mui/material';
import { random } from 'lodash';
import React, { useState } from 'react';
import { GET_ALL_CATEGORY } from '../../../../graphql/query/category';

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

export const categoryIcons: string[] = [
  '/static/icons/electric-scooter-1.svg',
  '/static/icons/electric-scooter-2.svg',
  '/static/icons/electric-bike.svg',
  '/static/icons/vacuum-cleaner.svg',
  '/static/icons/weighing-scale.svg',
];

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

const CatalogPopover: React.FC<PopoverProps> = (props) => {
  const { data: { getAllCategory: categoryData } = {} } =
    useQuery(GET_ALL_CATEGORY);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [activeFilterData, setActiveFilterData] = useState<
    CatalogFilter[] | null
  >(null);

  const handleClickLink = (
    event: React.MouseEvent<Element, MouseEvent>,
    linkId: string,
  ) => {
    setActiveLink(linkId);
  };

  return (
    <Catalog {...props}>
      <Category sx={{ pt: 10, pr: 17, pb: 14, pl: 12 }}>
        <CategoryList>
          {categoryData?.map((el, index) => (
            <CategoryItem key={el._id}>
              <CategoryLink
                active={activeLink == el._id}
                onMouseEnter={(event) => handleClickLink(event, el._id)}
                href={`/${el.slug}`}
                icon={categoryIcons[index]}>
                {el.name}
              </CategoryLink>
            </CategoryItem>
          ))}
        </CategoryList>
      </Category>
      <Filter>
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
