import React, { useState, useEffect } from "react";
import { GetSystemsAsJSONAsync } from '../pages/api/SystemService'
import {System} from "../models/System"


// component 
export const UniverseMap = () => 
{
    const [systems, setSystems] = useState<System[]>();

    let systemPointRadius: number = 5;

    const fetchSystems = async () => 
    {
        const response: any = await GetSystemsAsJSONAsync();

        let data: System[] = response;

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

        /*var zoom = {
            animation: new TimelineLite(),
            scaleFactor: 1.6,
            duration: 0.5,
            ease: Power2.easeOut,
        };

        TweenLite.set(pivot, { scale: 0 });

        var resetAnimation = new TimelineLite();

        var pannable = new Draggable(proxy, {
            throwResistance: 3000,
            trigger: svg,
            throwProps: true,
            onPress: selectDraggable,
            onDrag: updateViewBox,
            onThrowUpdate: updateViewBox,
        });*/

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
                
            var fromVars = {
            // ease: zoom.ease,
                x: viewBox.x,
                y: viewBox.y,
                width: viewBox.width,
                height: viewBox.height,
            };

            let width: number = viewBox.width * scaleDelta;
            
            if (width > 30000)
            {
                viewBox.width = 30000;
                viewBox.height = 30000;

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
            
            //zoom.animation = TweenLite.from(viewBox, zoom.duration, fromVars);  
        }

        //
        // SELECT DRAGGABLE
        // =========================================================================== 
        function selectDraggable(event: any) 
        {
console.log("test");

            /*if (resetAnimation.isActive()) {
                resetAnimation.kill();
            }
                
            startClient.x = this.pointerX;
            startClient.y = this.pointerY;
            startGlobal = startClient.matrixTransform(svg.getScreenCTM().inverse());
            
            // mouse button
            if (event.button === 1) {
                TweenLite.set(proxy, { 
                    x: this.pointerX, 
                    y: this.pointerY
                });

                pannable.enable().update().startDrag(event);
            }*/
        }

        //
        // UPDATE VIEWBOX
        // =========================================================================== 
        function updateViewBox() 
        {
            /*if (zoom.animation.isActive()) {
                return;
            }*/
            
            /*point.x = this.x;
            point.y = this.y;*/

            var moveGlobal = point.matrixTransform(svg.getScreenCTM().inverse());
                
            viewBox.x -= (moveGlobal.x - startGlobal.x);
            viewBox.y -= (moveGlobal.y - startGlobal.y);
        }
    }, []);
    //-------------------------------------------------------------------------------
    //https://codepen.io/osublake/pen/oGoyYb
    const onClick = (event: any) => 
    {
        console.log(event.target.id);
    }

    return (
        <div id="universeBox" className="h-full w-full">
            <svg id="universeSvg" viewBox="-500 -500 1000 1000" className="h-full w-full bg-slate-900">
                {systems?.map((system) => (
                    <g key={system.symbol}>
                        <text key={system.symbol+"_"+system.x+"_"+system.y+"_name"} x={system.x-(3*system.symbol.length)} y={system.y-6} className="text-xs fill-white select-none">{system.symbol}</text>
                        <circle id={system.symbol} key={system.symbol+"_"+system.x+"_"+system.y} r={systemPointRadius} cx={system.x} cy={system.y} className="fill-white" onClick={onClick}/>
                    </g>
                ))}
            </svg>
        </div>
    );
};