import '../app/globals.css'
import { useEffect } from "react";
import { useRouter } from 'next/router'
import { GameStats } from '../components/gamestats'
import { Button } from '@/components/button';
import { useToken } from '@/data/commonContext';

const buttonClass: string = 'text-zinc-800 bg-white px-[0.4em] py-[0.1em] border-[0.2em] border-solid rounded-lg border-sky-600 hover:border-sky-500';


export default function Login() 
{
  const {tokenDispatch} = useToken();

  const router = useRouter()
  const { msg } = router.query

  const login = (event: any) => {
    event.preventDefault();
    const userToken = event.target.token.value;

    tokenDispatch({token: userToken});

    //localStorage.setItem('token', userToken);

    router.push("/dashboard");
  };

  return (
    <div>
        <div className="grid justify-center">
            <h1>{msg === "" ? "Home" : msg}</h1>
            <h2>Log in</h2>
            <div>
                <form onSubmit={login}>
                    <input name="token" id="token" type="text" placeholder='token' required></input><br/>
                    <Button text="Login" type="Submit" value="Login"/>
                </form>
                <button className={buttonClass} onClick={() => router.push("/registration")}>Registration</button>
            </div>
        </div>
        <GameStats/>
    </div>
  );
}