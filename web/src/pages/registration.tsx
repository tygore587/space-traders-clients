import '../app/globals.css'
import { useRouter } from 'next/router'
import { Button } from '@/components/button';
import { FactionList } from '@/components/factionList';
import { RegisterNewAgent } from './api/AgentService';
import { useEffect, useState } from 'react';
import { useFaction, useToken } from '@/data/commonContext';
import { GetFactionListAsync } from './api/FactionService';
import { IFaction } from '@/models/Faction';

export default function Registration() 
{
    const {tokenDispatch} = useToken();
    const {factions, factionDispatch} = useFaction();

    const router = useRouter()
    const { routerMsg } = router.query


    const fetchFactions= async () => 
    {
        const response: any = await GetFactionListAsync();

        let data: IFaction[] = response;

        factionDispatch({type: "add", faction: data});
    };

    useEffect(() => 
    {
        if (factions.length === 0){
            fetchFactions();
        }
    }, []);


    const [msg, setMsg] = useState<string>("");

    const register = async (event: any) => {
        event.preventDefault();
        const callname = event.target.callname.value;
        const faction = event.target.faction.value;

        const response: {status: boolean, value: string} = await RegisterNewAgent(callname, faction);

        if( response.status)
        {
            //localStorage.setItem('token', response.value);
            tokenDispatch({token: response.value});

            alert("Save the following Token as it's the Login for your Agent: \r\n\r\n" + response.value);

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
                        <select name="faction" id="faction" className="font-bold text-slate-800" required>
                            {factions?.map((faction) => 
                                <option key={faction.symbol} className={faction.isRecruiting ? "text-green-700" : "text-red-700"} value={faction.symbol}>{faction.name}</option>
                            )}
                        </select><br/>
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