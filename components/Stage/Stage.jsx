import React, { useEffect, useRef, useReducer, useState } from 'react';
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

class Stage extends React.Component {
    constructor(props) {
        super(props);
        this.stageEl = React.createRef();
        this.players = initPlayers();
        this.wordCache = [];
        this.state = {
            currentWord: '',
            words: [],
        };
    }

    componentDidMount() {
        console.log('stage mounted>>>>>>');
        const that = this;
        fetchWords().then((data) => {
            const [word, ...rest] = data;
            that.setState({ words: [word] });
            that.wordCache = rest;
        });
        setInterval(async () => {
            const { words } = that.state;
            if (that.wordCache.length > 12) return;
            fetchWords().then((data) => {
                that.wordCache = [...this.wordCache, ...data];
            });
        }, 10000);

        setInterval(async () => {
            const { words } = that.state;
            const newWords = [that.wordCache[0], ...words];
            if(newWords.length > 12) {
                newWords.pop();
            }
            that.setState({
                words: newWords
            }, () => {
                that.wordCache = that.wordCache.slice(1);
            });
            
        }, 1000);
    }

    render() {
        const { words = [], currentWord } = this.state;
        const { wordCache } = this;
        return (
            <div className="stage">

                <WordShower
                    words={words}
                    currentWord={currentWord}
                />

                <div>
                    Words: {words.join(',')}
                </div>

                <div>
                    wordCache: {wordCache.join(',')}
                </div>

                <div>
                    wordCache: {wordCache.length}
                </div>
            </div>
        );
    }

}

export default Stage;