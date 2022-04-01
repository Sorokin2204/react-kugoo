import { ApolloClient, ApolloProvider } from '@apollo/client';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { createUploadLink } from 'apollo-upload-client';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Footer from '../component/common/Footer.tsx';
import Header from '../component/common/Header';
import cache from '../graphql/cache';
import '../styles/masonry-style.css';
import '../styles/[id].css';
import theme from '../theme';
import themeAdmin from '../themeAdmin';

const client = new ApolloClient({
  ssrMode: true,
  connectToDevTools: true,
  link: createUploadLink({
    uri: 'https://react-kugoo.herokuapp.com/graphql',
    credentials: 'same-origin',
  }),
  cache: cache,
});

const ClientSide = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Box
            component={'main'}
            sx={{
              [theme.breakpoints.down('md')]: {
                paddingBottom: '55px',
              },
            }}>
            <Component {...pageProps} />
            <Footer />
          </Box>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};
const AdminSide = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={themeAdmin}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

function MyApp(props: AppProps) {
  return (
    <>
      {props.router.pathname.split('/')[1] === 'admin' ? (
        <AdminSide {...props} />
      ) : (
        <ClientSide {...props} />
      )}
    </>
  );
}

export default MyApp;
