import { useState } from 'react'
import './index.css'
import { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { List } from './components/List'
import { NavBar } from './components/NavBar'
import { Box } from '@mui/material'

const basicTasks =  [{ 
  id:1,
  color: "primary",
  text: "Write a new task" ,
  isCompleted: false,
  deadline:"2023-01-20T20:11",
},
{ 
  id:2,
  color: "primary",
  text: "Drag and drop" ,
  isCompleted: false,
  deadline:"2023-01-20T20:11",
},
{ 
  id:3,
  color: "primary",
  text: "Click on pin if you done" ,
  isCompleted: false,
  deadline: "2023-01-20T20:11",
}
]

const initialState = localStorage.getItem("todos") ?
  JSON.parse(localStorage.getItem("todos")) 
    : basicTasks

function App() {

  const [todos,  setTodos] = useState(initialState)
  const [openTodos,  setOpenTodos] = useState([])
  const [filtered, setFiltered] = useState(false)
  const [dateHidden, setDateHidden] = useState(false)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    filterOpen()
  },[todos])

  const transformDate = (date) => {
    let a = new Date(date)
    return a.toISOString().split('T')[0]+'T'+a.getHours() + ':' + (a.getMinutes()<10 ? "0"+a.getMinutes() : a.getMinutes());
  }

  const addTodo = color => {
    const newTodos = [...todos, { "color": color, "text": "", "isCompleted": false, "id": Date.now(), "deadline":transformDate(+Date.now()) }];
    
    console.log(newTodos)
    setTodos(newTodos);
  };

  const filterOpen = () => {
    const openTodos = todos.filter(todo => todo.isCompleted===false)
    setOpenTodos(openTodos)
    // console.log(openTodos)
  }

  const removeTodo = (id)=> {
    const newTodos = [...todos];
    setTodos(newTodos.filter( todo => todo.id !==id))
  };

  const createDeadline = (id, newDeadline) => {
    let newTodos = [...todos];
    const index = newTodos.findIndex(todo => todo.id==id)
    newTodos[index].deadline = newDeadline
    setTodos(newTodos)
  }
  // const clearLocalStorage = () => {
  //   setTodos(basicTasks)
  // }

  return (
    <DndProvider backend={HTML5Backend}>

      <Box className="app">
          
          <List
          todos={!filtered? todos : openTodos}
          setTodos={setTodos}
          dateHidden={dateHidden}
          filtered={filtered}
          removeTodo={removeTodo}
          createDeadline={createDeadline}
          />
          <NavBar
          addTodo={addTodo}
          setDateHidden={setDateHidden}
          dateHidden={dateHidden}
          filtered={filtered}
          setFiltered={setFiltered}
          // clearLocalStorage={clearLocalStorage}
          />
          {/* <TodoForm addTodo={addTodo}/> */}
      </Box>
    </DndProvider>
  )
}

export default App
