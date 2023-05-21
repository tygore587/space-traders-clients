import '../app/globals.css'
import { useRouter } from 'next/router'
import { Button } from '@/components/button';
import { FactionList } from '@/components/factionList';
import { RegisterNewAgent } from './api/AgentService';
import { useState } from 'react';

export default function Registration() 
{
    const router = useRouter()
    const { routerMsg } = router.query

    const [msg, setMsg] = useState<string>("");

    const register = async (event: any) => {
        event.preventDefault();
        const callname = event.target.callname.value;
        const faction = event.target.faction.value;

        const response: {status: boolean, value: string} = await RegisterNewAgent(callname, faction);

        if( response.status)
        {
            localStorage.setItem('token', response.value);
            router.push("/dashboard");
        }
        else
        {
            setMsg(response.value);
        }


        
    };

    return (
        <div className="flex flex-col justify-start h-screen">
            <div className="grid justify-center">
                <h1 className='text-red-500 font-bold'>{routerMsg === "" ? "" : routerMsg}</h1>
                <h2>Registration</h2>
                <div>
                    <form onSubmit={register}>
                        <input name="callname" id="callname" type="text" placeholder='CALLNAME' required minLength={3} maxLength={14}></input><br/>
                        <input className='mt-[0.25em]' name="faction" id="faction" type="text" placeholder='Faction' required></input><br/>
                        {/*<select name="faction" id="faction" required>

    </select><br/>*/}
                        <Button text="register User" type="Submit" value="Register"/>
                    </form>
                </div>
                <h1 className='text-red-500 font-bold'>{msg === "" ? "" : msg}</h1>
            </div>
            <p className='mt-[1em] pl-[1em] text-xl font-bold text-orange-500 bg-slate-700 w-full'>Factions</p>
            <FactionList/>
        </div>
    );
}