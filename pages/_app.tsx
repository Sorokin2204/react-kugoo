import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Footer from '../component/common/Footer.tsx';
import Header from '../component/common/Header';
import theme from '../theme';
import themeAdmin from '../themeAdmin';
import './catalog/[id].css';

// interface AppConfig {
//   isPaused: boolean;
// }

// const appConfigVar = makeVar<AppConfig>(initialAppConfig);

// const cache: InMemoryCache = new InMemoryCache({
//   typePolicies: {
//     Category: {
//       fields: {
//         customPrice: {
//           read(_, variable) {
//             return variable;
//           },
//         },
//       },
//     },
//   },
// });

const client = new ApolloClient({
  ssrMode: true,
  // uri: 'http://localhost:5000/graphql',
  link: createHttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
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
