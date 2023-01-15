import { useEffect, useRef, useReducer, useState } from 'react';
import { playReducer } from './play-reducer';
import Player from './Player';
import getWords from '../../services/getWords';
import WordShower from './WordShower';

const initPlayers = (count) => {
    const players = [];
    for (let i = 0; i < count; i++) {
        players.push({
            id: i,
            name: `Player ${i + 1}`,
            score: 0,
        });
    }
    return players;
};


const fetchWords = async () => {
    const response = await fetch('/api/more');
    return response.json();

}

const Stage = (props) => {
    const stageEl = useRef(null);
    const players = initPlayers();
    const [player1] = players;
    const [currentWord, setCurrentWord] = useState('');
    const [words, setWords] = useState([]);
    const [wordCache, setWordCache] = useState([]);

    console.log('1111111', wordCache, words);

    useEffect(() => {
        console.log('stage mounted');
        const { current } = stageEl;
        current.focus();
        fetchWords().then((data) => {
            const [firstWord, ...rest] = data;
            setWords([firstWord]);
            setWordCache(rest);
        });
        setInterval(async () => {
            fetchWords().then((data) => {
                setWordCache([...wordCache, ...data]);
            });
        }, 10000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setInterval(() => {
            if(wordCache.length === 0) return;
            const [firstWord, ...rest] = wordCache;
            const [firstWordInWords, ...restWords] = words;
            setWords([...restWords, firstWord]);
            setWordCache(rest);
        }, 2000);
    }, [wordCache]);

    const handleKeyUp = (e) => {
        const { key } = e;

        if (key === 'Backspace') {
            setCurrentWord(currentWord.substring(0, currentWord.length - 1))
            return;
        }
        let newWord;
        if (key.length === 1) {
            newWord = currentWord + key;
            if (words.includes(newWord)) {
                setWords(words.filter(word => word !== newWord));
                setCurrentWord('');
            } else {
                setCurrentWord(newWord);
            }
        }

    }

    return (
        <div tabIndex="0"
            autoFocus
            className="stage"
            ref={stageEl}
            onKeyUp={handleKeyUp}
        >
            <div className='word-shower-area-bg'>
                <WordShower
                    words={words}
                    currentWord={currentWord}
                />
            </div>
            <div className="forground">
                <div className="players">
                    {players.map((player) => {
                        return <Player
                            key={player.id}
                            player={player}
                        />;
                    })}
                </div>
                <div>
                </div>
            </div>
        </div>
    );
};

export default Stage;
