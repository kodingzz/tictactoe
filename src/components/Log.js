

export default function Log({lists}){
    return (
        <ol id='log'>
            {lists.map((list)=> <li key={`${list.location.row},${list.location.col}`}>{list.player} selected {list.location.row},{list.location.col}</li>)}
        </ol>
        
    )
}