/* eslint-disable no-unused-vars */
import { TodoCard } from "./TodoCard";

export function TodoList(props){
    const {selectedTab, todos, handleEditTodo, handleDeleteTodo} = props

    // const tab='All'

    const filteredTodoList = selectedTab ==='All'?
    todos:
    selectedTab === 'Completed' ?
        todos.filter(val => val.complete) :
        todos.filter(val => !val.complete);
    
    return(
        <>

            { 
                filteredTodoList.map((todo, todoIndex)=>{
                    const originalIndex = todos.indexOf(todo);
                    return(
                        <TodoCard 
                        key={todoIndex}
                        todoIndex={originalIndex}
                        todo={todo}
                        {...props}/>
                    )
                    

                })
            }

        </>
    )
}