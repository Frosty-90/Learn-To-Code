import { useState } from "react"
export function TodoInput(props){
    const {handleAddTodo} = props

    const [inputValue, setInputValue] = useState('')
    // console.log(inputValue)

    return(
        <div className="input-container">
            <input value={inputValue} 
            onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                    if(!inputValue){ return}
                    handleAddTodo(inputValue)
                    setInputValue('')
                }
            }}
            
            onChange={(e)=>{
                setInputValue(e.target.value)
            }} placeholder="Add Task..."/>
            
            <button onClick={()=>{
                if(!inputValue) { return }
                handleAddTodo(inputValue)
                setInputValue('')
            }}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}