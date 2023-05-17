import '../app/globals.css'
import { useEffect } from "react";
import { useRouter } from 'next/router'
import { GameStats } from '../components/gamestats'

export default function Login() 
{
  const router = useRouter()
  const { msg } = router.query

  const login = (event: any) => {
    event.preventDefault();
    const token = event.target.token.value;

    localStorage.setItem('token', token);

    router.push("/dashboard");
  };

  return (
    <>
        <div className="grid justify-center">
            <h1>{msg === "" ? "Home" : msg}</h1>
            <h2>Log in</h2>
            <div>
                <form onSubmit={login}>
                    <input name="token" id="token" type="text" placeholder='token' required></input><br/>
                    <button className='text-zinc-800 bg-white mt-2' type="submit" value="Login">Login</button>
                </form>
            </div>
        </div>
        <GameStats/>
    </>
  );
}