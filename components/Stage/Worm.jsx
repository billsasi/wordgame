import Word from "./Word";

export default function Worm(props) {
    const { player } = props;
    const { position, words=[] } = player;
    const { x, y } = position;
    const wormStyle = {
        top: `${y}px`,
        left: `${x}px`,
    };
    return (
        <div className="worm" style={wormStyle}>
            {
                words.map((word, index) => {
                    return (
                        <Word key={index} word={word} />
                    )
                })
            }
        </div>
    )
};