import React, { useState, useEffect } from "react";
import { GetSystemsAsJSONAsync } from '../pages/api/SystemService'
import {System} from "../models/System"


export const UniverseMap = ({callback}:any) => 
{
    const [systems, setSystems] = useState<System[]>();

    let coordMaxValue: number = 0;
    let systemPointRadius: number = 25;

    let draggin: boolean = false;

    const fetchSystems = async () => 
    {
        const response: any = await GetSystemsAsJSONAsync();

        let data: System[] = response;

        if (data != null && data.length > 0)
        {
            data?.forEach(wp => {
                coordMaxValue=Math.max(coordMaxValue, Math.abs(wp.x), Math.abs(wp.y));
            });

            coordMaxValue = Math.ceil(coordMaxValue * 2.2);
        }

        setSystems(data);
    };

    useEffect(() => 
    {
        fetchSystems();
    }, []);

    // ------------------------------------------------------------
    useEffect(() => 
    {
        var box: any = document.querySelector('#universeBox');

        var svg: any = document.querySelector('#universeSvg');
        var proxy: any = document.createElement("div");

        var point = svg?.createSVGPoint();
        var startClient = svg?.createSVGPoint();
        var startGlobal = svg?.createSVGPoint();

        var viewBox = svg.viewBox.baseVal;

        svg.addEventListener("wheel", onWheel);
        svg.addEventListener("mousedown", StartDrag);
        svg.addEventListener("mousemove", Drag);
        svg.addEventListener("mouseup", EndDrag);

    //
    // ON WHEEL
    // =========================================================================== 
        function onWheel(event: any) {
            event.preventDefault();
            
            var normalized;  
            var delta = event.wheelDelta;

            if (delta) {
                normalized = (delta % 120) == 0 ? delta / 120 : delta / 12;
            } else {
                delta = event.deltaY || event.detail || 0;
                normalized = -(delta % 3 ? delta * 10 : delta / 3);
            }
            
            var scaleDelta = normalized > 0 ? 0.8/*1 / 2/*zoom.scaleFactor*/ : 1.2/*2/*zoom.scaleFactor*/;
            
            point.x = event.clientX;
            point.y = event.clientY;
            
            var startPoint = point.matrixTransform(svg.getScreenCTM().inverse());

            let width: number = viewBox.width * scaleDelta;
            
            if (width > coordMaxValue)
            {
                viewBox.width = coordMaxValue;
                viewBox.height = coordMaxValue;

                viewBox.x = -0.5 * viewBox.width
                viewBox.y = -0.5 * viewBox.height
            }
            else if(width < 250)
            {
                systemPointRadius = 2;
                return;
            }
            else
            {
                viewBox.x -= (startPoint.x - viewBox.x) * (scaleDelta - 1);
                viewBox.y -= (startPoint.y - viewBox.y) * (scaleDelta - 1);
                viewBox.width *= scaleDelta;
                viewBox.height *= scaleDelta;

                systemPointRadius *= scaleDelta;
            }
        }

        //
        // SELECT DRAGGABLE
        // =========================================================================== 
        function StartDrag(event: any) 
        {
            draggin = true;
            startGlobal = point.matrixTransform(svg.getScreenCTM());
            startGlobal.x = event.clientX;
            startGlobal.y = event.clientY;
            /*
            console.log(point.matrixTransform(svg.getScreenCTM().inverse()));
            console.log(event.clientX + " | " + event.clientY);*/
        }

        //
        // UPDATE VIEWBOX
        // =========================================================================== 
        function Drag(event: any) 
        {
            if (!draggin) return;

            point.x = event.clientX;
            point.y = event.clientY;

            var moveGlobal = point.matrixTransform(svg.getScreenCTM().inverse());
                
            viewBox.x -= (moveGlobal.x - startGlobal.x);
            viewBox.y -= (moveGlobal.y - startGlobal.y);
        }

        function EndDrag(event: any) 
        {
            draggin = false;
        }
    }, []);
    //-------------------------------------------------------------------------------
    //https://codepen.io/osublake/pen/oGoyYb
    const onClick = (event: any) => 
    {
        console.log(systems);
        callback(event.target.id);
    }

    return (
        <div id="universeBox" className="h-full w-full">
            <svg id="universeSvg" viewBox="-500 -500 1000 1000" className="h-full w-full bg-slate-900">
                {systems?.map((system) => (
                    <g key={system.symbol}>
                        <text key={system.symbol+"_"+system.x+"_"+system.y+"_name"} 
                            x={system.x-(3*system.symbol.length)} y={system.y-6-systemPointRadius} 
                            className="text-[50] fill-white select-none">{system.symbol}</text>
                        <circle id={system.symbol} key={system.symbol+"_"+system.x+"_"+system.y} r={systemPointRadius} cx={system.x} cy={system.y} 
                            className="fill-white hover:stroke-blue-500 hover:stroke-[10px]" 
                        onClick={onClick}/>
                    </g>
                ))}
            </svg>
        </div>
    );
};