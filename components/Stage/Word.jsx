export default function Word(props) {
    const { word } = props;
    const letters = word.split('');
    return (
        <>
            {
                letters.map((letter, index) => {
                    return (
                        <div key={index} className="letter">
                            {letter}
                        </div>
                    )
                })
            }
        </>
    );
};