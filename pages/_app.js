import '../styles/globals.css'
import { useRouter } from 'next/router';
import PrivateLayout from '../layouts/PrivateLayout';

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // if (router.pathname.startsWith('/account')) {
  //   return (
  //     <Component {...pageProps} key={router.pathname} />
  //   )
  // }
  //
  return <Component {...pageProps} key={router.pathname} />
}

export default MyApp
