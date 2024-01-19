import Head from 'next/head'
import '../styles/globals.scss'
import Footer from '../components/footer'
import MainHeader from '../components/mainheader'
import SubHeader from '../components/subHeader'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-input-range/lib/css/index.css'
import { Row } from 'reactstrap'
import {wrapper} from "../store/index"
import {ApolloProvider} from '@apollo/client';
import { client } from '../apollo-client'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from 'react-redux'


function MyApp({ Component, pageProps }) {
  let navigate = useRouter();
    const store = useStore((state) => state)
  return (
    <>
    <PersistGate persistor={store.__persistor} loading = {<div>loading</div>}></PersistGate>
    <ApolloProvider client={client}>
    <Head>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
      </Head>
      {navigate.pathname !== '/gallery' ?
        <>
        <MainHeader />
        <SubHeader />
        <Component {...pageProps} />
        <Footer />
        </>
        : 
        <>
          <Component {...pageProps} />
        </>
      }
      </ApolloProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp);
