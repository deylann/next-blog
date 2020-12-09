import React,{ useEffect } from 'react'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Router from 'next/router';
import NProgress from 'nprogress'; 
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps } : AppProps) {
    useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
}

export default MyApp
