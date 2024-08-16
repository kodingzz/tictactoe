
import Player from './components/Player'
import Board from './components/Board'
import Log from './components/Log';
import GameOver from './components/GameOver';
import { useState } from 'react'
import { WINNING_COMBINATION } from './winning-combination';


  const PLAYERS={
    X:'Player 1',
    O:'Player 2',
  }

  const initialGameBoard =[
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ]


  function changeCurrentPlayer(turns){
    let currentPlayer='X';

    if(turns.length>0&&turns[0].player==='X'){
      currentPlayer='O';
    }
      return currentPlayer;
    }
 
  function deriveWinner(gameBoard,gamePlayer){
    let winner=null;
  
    for(let combination of WINNING_COMBINATION){
        const firstSymbol =gameBoard[combination[0].row][combination[0].col];
        const secondSymbol =gameBoard[combination[1].row][combination[1].col];
        const thirdSymbol =gameBoard[combination[2].row][combination[2].col];
        
        if(firstSymbol&& firstSymbol===secondSymbol&&secondSymbol===thirdSymbol){
          winner =gamePlayer[firstSymbol];
          break;
        }
      
    }
    return winner;
  }
  function deriveGameBoard(gameTurns){
    let gameBoard = [...initialGameBoard.map(item=>[...item])];

  
    for(let turn of gameTurns){
    const {location,player} = turn;
    const {row,col} = location;
    gameBoard[row][col]= player;
    }
    return gameBoard;
  }

  
function App() {


    //  react로 코드 작성시 최대한 적은 state로 많은 값들을 파생하고 계산하는것이 좋다.
    const [gameTurns,setGameTurns] =useState([]);
    const [gamePlayer,setGamePlayer] =useState(PLAYERS);
    const currentPlayer =changeCurrentPlayer(gameTurns);
    const gameBoard =deriveGameBoard(gameTurns);
    
    const winner= deriveWinner(gameBoard,gamePlayer);
    let isDraw = gameTurns.length===9 && !winner; 

    function handleSelectSquare(rowIndex,colIndex){
     
      setGameTurns(prevTurn=>{
        let currentPlayer =changeCurrentPlayer(prevTurn);

        const updatedTurn =[
          {
          location:{row:rowIndex,col:colIndex},
          player: currentPlayer
          },
          ...prevTurn,
          
      ];
        return updatedTurn;
      })
      
    }
   
    //  rematch 버튼을 눌렀을때 상태 최신화
    function handleRestart(){
      setGameTurns([]); 

    }

    // gamePlayer 이름 변경시켰을때 상태 최신화
    function handlePlayerNameChange(symbol,newName){
      setGamePlayer(prevPlayers=>{
        return {
          ...prevPlayers,
          [symbol] : newName,
        }
       
      })
    }

  
  

  return (
    <main>
   
      <div id='game-container'>
      {/* PLAYERS */}
      <ol id='players' className='highlight-player'>
        <Player name={gamePlayer.X} sybmol="X" isActive={currentPlayer==='X'} changeName={handlePlayerNameChange} />
        <Player name={gamePlayer.O} sybmol="O" isActive={currentPlayer==='O'} changeName={handlePlayerNameChange}/>
      </ol>

      {/* GAMEBORAD */}
      <Board board={gameBoard} onSelectSquare={handleSelectSquare}/>
      
      {/* GameOver */}
      {(winner || isDraw) && <GameOver winner={winner} restart={handleRestart}/>}
    </div>
 
    
      {/* LOG */}
      <Log  lists={gameTurns}/>
    </main>
  )
}

export default App



