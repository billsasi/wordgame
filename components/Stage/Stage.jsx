import { useEffect, useRef, useReducer } from 'react';
import { playReducer } from './play-reducer';
import Worm from './Worm';
import getWords from '../../data/getWords';

const initPlayers = (count) => {
  const players = [];
  for (let i = 0; i < count; i++) {
    players.push({
      wordEntryError: false,
      currentWord: '',
      id: i,
      name: `player${i}`,
      words: getWords(3),
      position: {
        x: 100,
        y: 200 + i * 100,
      },
    });
  }
  return players;
};

const initialState = {
  players: initPlayers(4),
};

const Stage = (props) => {
  const stageEl = useRef(null);
  const inputRef = useRef(null);
  const [state, dispatch] = useReducer(playReducer, initialState);
  const height = null,
    width = null;
  const { players } = state;
  const [player1] = players;

  const { currentWord, wordEntryError } = player1;

  console.log('rerender');

  return (
    <div tabIndex="0" className="stage" ref={stageEl}>
      <div className="players">
        {players.map((player) => {
          return <Worm key={player.id} player={player} />;
        })}
      </div>

      <div className="input-cntr">
        <input
          className="input"
          style={wordEntryError ? { borderColor: 'red' } : {}}
          ref={inputRef}
          value={currentWord}
          autoFocus
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              dispatch({ type: 'KEY_UP', payload: e });
            }
          }}
          onChange={({ target }) => {
            dispatch({ type: 'INPUT_CHANGE', payload: target.value });
          }}
        ></input>
      </div>
    </div>
  );
};

export default Stage;
