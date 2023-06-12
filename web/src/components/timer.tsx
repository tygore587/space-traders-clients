import { useEffect, useState } from "react";


interface ITimer {
    start: number
    callback?: Function
}

export const Timer = ({start, callback}: ITimer) => 
{
    const [counter, setCounter] = useState(Math.ceil(start));
  
    useEffect(() => {
      const timer: any = counter >= 0 && setInterval(() => setCounter(counter - 1), 1000);
      return () => {
        clearInterval(timer);

        if (counter === 0 && callback){
            callback();
        }
      }

    }, [counter]);
  
    return (
        <span>{counter}</span>
    );
}
  