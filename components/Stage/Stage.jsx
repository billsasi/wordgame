import { useEffect, useState, useRef } from "react";
import { initPlayers } from "./player";

const Stage = (props) => {
    const stageEl = useRef(null);
    const [players, setPlayers] = useState(initPlayers(4));
    const height = null, width = null;  
    useEffect(()=>{
        setTimeout(()=>{
            const rect = stageEl.current.getClientRects();
            console.log(rect);
            setPlayers([
                {
                    ...players[0],
                    position: {
                        x: players[0].position.x + 10 ,
                        y: players[0].position.y + 10
                    }
                    
                }
            ]
            )
        },1000); 
    },[players]);

    return (
        <div className="stage" ref={stageEl}>
            {
                players.map((player, index) => {
                    const {position, words} = player;
                    const {x, y} = position;
                    return (
                        <div className="worm" key={index} style={{left: x, top: y}}>
                           {words.join(",")}
                           {height}{width}
                        </div>
                    )
                })   
            }
        </div>
    )
}

export default Stage; 