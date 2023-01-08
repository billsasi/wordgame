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
        x: 100 + i * 100,
        y: 200,
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
  const [state, dispatch] = useReducer(playReducer, initialState);
  const height = null,
    width = null;
  const { players } = state;
  const [player1] = players;

  useEffect(() => {
    console.log(getWords(10));
    setTimeout(() => {
      console.log('stageEl', stageEl.current);
    }, 1000);
  }, []);

  return (
    <div
      tabIndex="0"
      className="stage"
      ref={stageEl}
      onKeyUp={(event) =>
        dispatch({
          type: 'KEY_UP',
          payload: {
            event,
          },
        })
      }
    >
      {players.map((player) => {
        return <Worm key={player.id} player={player} />;
      })}
      <div style={{ border: '1px solid red' }}>
        Current Word: {player1.currentWord}
      </div>
    </div>
  );
};

export default Stage;
