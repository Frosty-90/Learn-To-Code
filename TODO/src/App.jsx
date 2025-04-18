import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"

import { useState, useEffect } from "react"

function App() {

  // const todos = [
  // { input: 'Hello! Add your first todo!', complete: true },
  // { input: 'Get the groceries!', complete: false },
  // { input: 'Learn how to web design', complete: false },
  // { input: 'Say hi to gran gran', complete: true },
  // ]

  const [todos, setTodos] = useState([{ input: 'Hello! Add your first todo!', complete: true }])

  const [selectedTab, setSelectedTab] = useState('Open')


  function handleAddTodo(newTodo){

    const newTodoList = [...todos, {input: newTodo, cmplete:false}]
    setTodos(newTodoList)
    handleSaveData(newTodoList)

  }

  function handleEditTodo(index){
    let newTodoList =[...todos]
    let completedTodo = newTodoList[index];
    completedTodo['complete'] = true;
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)

  }

  function handleDeleteTodo(index){
    let newTodoList = todos.filter((val, valIndex)=>{
      return valIndex !==index
    })

    setTodos(newTodoList);
    handleSaveData(newTodoList)
  }

  function handleSaveData(saveTodo){
    localStorage.setItem('todo-app', JSON.stringify({todos : saveTodo}))
  }


  useEffect(()=>{
    if(!localStorage || !localStorage.getItem('todo-app')) {return}
    // console.log('here')
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
  }, [])





  return (

    <>
      <Header todos={todos}/>
      <Tabs selectedTab = {selectedTab} setSelectedTab={setSelectedTab} todos={todos}/>
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos}/>
      <TodoInput handleAddTodo={handleAddTodo}/>
    </>


  )
}

export default App
