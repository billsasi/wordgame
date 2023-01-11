export default function Word(props) {
  const { word } = props;
  const letters = word.split('');

  return (
    <>
      {letters.map((letter, index) => {
        return (
          <div
            key={index}
            className="letter"
            style={{ marginRight: index === letters.length - 1 ? '1em' : '0' }}
          >
            {letter}
          </div>
        );
      })}
    </>
  );
}
