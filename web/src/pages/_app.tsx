import { DataProvider } from '@/data/commonContext';
import '../app/globals.css'
import type { AppProps } from 'next/app';
import { Agent } from '@/models/Agent';

export default function SpaceTraders({ Component, pageProps }: AppProps) 
{
    return <DataProvider agentInit={new Agent} shipInit={[]} contractInit={[]} factionInit={[]} universeInit={[]}>
                <Component {...pageProps} className="h-full"/>
           </DataProvider>;
}