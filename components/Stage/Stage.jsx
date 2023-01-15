import React, { useEffect, useRef, useReducer, useState } from 'react';
import { playReducer } from './play-reducer';
import Player from './Player';
import getWords from '../../services/getWords';
import WordShower from './WordShower';
import { subscribe } from './subscribe';

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
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentDidMount() {
        console.log('stage mounted>>>>>>');
        const that = this;
        const { current } = this.stageEl;
        current.focus();

        subscribe('/api/sub', (data) => {
            console.log('data>>>>>>><<<<<<', data);
        });

        fetchWords().then((data) => {
            const [word, ...rest] = data;
            that.setState({ words: [word] });
            that.wordCache = rest;
        });
        this.timer1 = setInterval(async () => {
            const { words } = that.state;
            if (that.wordCache.length > 12) return;
            fetchWords().then((data) => {
                that.wordCache = [...this.wordCache, ...data];
            });
        }, 10000);

        this.timer2 = setInterval(async () => {
            const { words } = that.state;
            const newWords = [that.wordCache[0], ...words];
            if (newWords.length > 12) {
                newWords.pop();
            }
            that.setState({
                words: newWords
            }, () => {
                that.wordCache = that.wordCache.slice(1);
            });

        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer1);
        clearInterval(this.timer2);
    }

    handleKeyUp(e) {
        const { key } = e;
        const { currentWord, words } = this.state;
        if (key === 'Backspace') {
            this.setState({currentWord: currentWord.substring(0, currentWord.length - 1)});
            return;
        }
        let newWord;
        if (key.length === 1) {
            newWord = currentWord + key;
            if (words.includes(newWord)) {
                this.setState({words: words.filter(word => word !== newWord)});
                this.setState({currentWord: ''});
            } else {
                this.setState({currentWord: newWord});
            }
        }
    }

    render() {
        const { words = [], currentWord } = this.state;
        const { wordCache } = this;
        return (
            <div
                className="stage"
                tabIndex="0"
                autoFocus
                onKeyUp={this.handleKeyUp}
                ref={this.stageEl}
            >
                <WordShower
                    words={words}
                    currentWord={currentWord}
                />
            </div>
        );
    }

}

export default Stage;