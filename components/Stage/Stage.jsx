import { useEffect, useRef, useReducer } from 'react';
import { playReducer } from './play-reducer';
import Worm from './Worm';
import getWords from '../../data/getWords';

const initPlayers = (count) => {
  const players = [];
  for (let i = 0; i < count; i++) {
    players.push({
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

  const { currentWord } = player1;

  return (
    <div
      tabIndex="0"
      className="stage"
      ref={stageEl}
      onKeyUp={(event) =>
        dispatch({
          type: 'KEY_DOWN',
          payload: {
            event,
          },
        })
      }
    >
      <div className="players">
        {players.map((player) => {
          return <Worm key={player.id} player={player} />;
        })}
      </div>

      <div style={{ border: '1px solid red' }}>
        Current Word:
        <input
          ref={inputRef}
          value={currentWord}
          autoFocus
          onChange={(e) => {
            console.log('changed!');
            dispatch({ type: 'INPUT_CHANGE', payload: e });
          }}
        ></input>
      </div>
    </div>
  );
};

export default Stage;
