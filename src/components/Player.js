import { useState } from 'react'



export default function Player({name,sybmol,isActive,changeName}){
  const [isEditing,setIsEditing]= useState(false);
   const [newName,setNewName] = useState(name);

  let playerName=  <span className='player-name'>{newName}</span>;
  let btnName= 'Edit';
  
  if(isEditing){
    playerName =  <input  type='text' value={newName} onChange={handleChange}/>;
    btnName = 'Save';
  }
  function handleEditClick(){
    setIsEditing(prev=>!prev);  
    if(isEditing){
      changeName(sybmol,newName);
    }
  }

  function handleChange(e){
    setNewName(e.target.value);
  }
    return (
        <li className={isActive ? 'active' : ''}>

        <span className='player'>
          {playerName}
          <span className='player-symbol'>{sybmol}</span>
        </span>
        
        <button onClick={handleEditClick}>{btnName}</button>
      </li>
    )
}