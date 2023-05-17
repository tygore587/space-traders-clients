import '../app/globals.css'
import type { AppProps } from 'next/app';

export default function SpaceTraders({ Component, pageProps }: AppProps) 
{
    return <Component {...pageProps} className="h-full"/>;
}