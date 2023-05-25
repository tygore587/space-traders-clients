import { ButtonHTMLAttributes } from "react"

interface IButton
{
    text: string,
    type: string,
    value: string
}

export const Button = ({text = "new Button", type = "", value = ""}:IButton) =>
{
    return (
        <button 
            className='text-zinc-800 bg-white mt-2 px-[0.4em] py-[0.1em] border-[0.2em] border-solid rounded-lg border-sky-600 hover:border-sky-500' 
            type="submit"
            value={value}>
            {text}
        </button>
    )
}