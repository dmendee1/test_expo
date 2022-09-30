import '../styles/globals.css'
import {useRouter} from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return <Component {...pageProps} router={router}/>
}

export default MyApp
