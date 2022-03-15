import React from 'react';
import { Box, styled, Tab, Tabs, Typography } from '@mui/material';

type Props = {};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabsCustom = styled(Tabs)(({ theme }) => ({
  // '& .MuiTabs-flexContainer': {
  //   display: 'grid',
  //   gridTemplateColumns: 'repeat(auto-fit,1fr)',
  // },
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-around',
  },
}));
const TabCustom = styled(Tab)(({ theme }) => ({
  ...theme.typography.t3b,
  textTransform: 'none',
  paddingTop: '6px',
  justifyContent: 'flex-start',
  // minHeight: '42px',
}));

const SpecList = styled(Box)(({ theme }) => ({
  display: 'grid',
  justifyContent: 'space-between',
  gridTemplateColumns: 'repeat(2,minmax(auto,475px))',
  columnGap: theme.spacing(30),
  [theme.breakpoints.down('smd')]: {
    gridTemplateColumns: 'repeat(1,minmax(auto,1fr))',
  },
}));
const SpecItem = styled(Box)(({ theme }) => ({
  // display: 'flex',
  alignItems: 'center',
  // justifyContent: 'space-between',
  minHeight: '64px',
  padding: '10px 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  columnGap: '10px',
  // paddingBottom: theme.spacing(10),
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
}));
const SpecLabel = styled(Typography)(({ theme }) => ({}));
const SpecValue = styled(Typography)(({ theme }) => ({
  // whiteSpace: 'pre',
  textAlign: 'right',
  [theme.breakpoints.down('smd')]: {
    textAlign: 'left',
  },
}));
const specFullData = [
  { label: 'Масса нетто', value: '22 кг' },
  { label: 'Мощность', value: '500 W' },
  { label: 'Аккумулятор', value: '10 000 mAh' },
  { label: 'Максимальная скорость', value: 'до 40 км/ч*' },
  { label: 'Максимальный пробег', value: 'до 30 км*' },
  { label: 'Время полной зарядки ', value: '6 часов' },
  { label: 'Максимальная нагрузка', value: '140 кг' },
  { label: 'Размер колес', value: '10' },
  { label: 'Тип колес', value: 'Надувные' },
  {
    label: 'Габариты (ДВШ), см',
    value: 'В разложенном виде: 113/86-116/60 \n В сложенном виде: 113/37/22',
  },
  { label: 'Подсветка', value: 'Передняя фара, стоп-сигнал, боковая' },
  { label: 'Привод', value: 'Задний' },
  { label: 'Тормозная система', value: 'Передняя и задняя дисковая' },
  { label: 'Комплектация', value: 'Товарный чек, гарантийный талон, з/у' },
  { label: 'Гарантия ', value: '12 месяцев' },
];
const ProductInfo: React.FC<Props> = ({ data }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabsCustom
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <TabCustom label="Характеристики" {...a11yProps(1)} />
          </TabsCustom>
        </Box>
        <TabPanel value={value} index={0}>
          <SpecList sx={{ mt: 5 }}>
            {data?.map((el, i) => (
              <SpecItem key={i}>
                <SpecLabel variant="t2">{el.node.Spec.name}</SpecLabel>
                <SpecValue variant="t2b">{el.node.name}</SpecValue>
              </SpecItem>
            ))}
          </SpecList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </>
  );
};

export default ProductInfo;
