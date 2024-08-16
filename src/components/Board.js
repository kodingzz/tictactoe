
export default function Board({board,onSelectSquare}){

    
    return (
        <ol id='game-board'>
           {board.map((row,rowIndex)=>
           <li key={rowIndex}>
            <ol>
                {row.map((symbol,colIndex)=><li key={colIndex} >
                    <button disabled={symbol!==null ? true : false} onClick={()=>onSelectSquare(rowIndex,colIndex) }>{symbol}</button></li>)}
            </ol>
           </li>)}
           
        </ol>
    )  
}