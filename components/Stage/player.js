export const initPlayers = (count) => {
    return [
        {
            id: 1,
            name: 'Player 1',
            color: 'red',
            score: 0,
            direction: 'right',
            words: ['hello', 'world'],
            position: {
                x: 50,
                y: 100
            }
        }        
    ]
};