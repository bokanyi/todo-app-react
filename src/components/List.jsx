import { Box } from '@mui/material'
import React, { useCallback } from 'react'
import { useContext } from 'react'
import { TodoContext } from '../TodoContext'
import  Todo from './Todo'


export const List = ({
    // todos, 
    // setTodos, 
    dateHidden, 
    // filtered, 
    // removeTodo, 
    // createDeadline
}) => {

    const {todos, setTodos, openTodos, filtered} = useContext(TodoContext)

    const moveTodotListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = todos[dragIndex]
            const hoverItem = todos[hoverIndex]
            setTodos(todos => {
                const updatedTodos = [...todos]
                updatedTodos[dragIndex] = hoverItem
                updatedTodos[hoverIndex] = dragItem
                return updatedTodos
            })
        },
        [todos],
    )

    const handleChange = (e, id) =>{
        const changedTodo = [...todos]
        changedTodo.find(todo => todo.id === id).text = e.target.value
        setTodos(changedTodo)
      }
    
    //   const completeTodo = (id) => {
    //     const newTodos = [...todos];
    //     newTodos.find(todo => todo.id === id).isCompleted
    //     ? newTodos.find(todo => todo.id === id).isCompleted = false
    //     : newTodos.find(todo => todo.id === id).isCompleted = true
    //     setTodos(newTodos); 
    //   };
    
    return (
        <Box className='todo-list' 
        sx = {{
            display: 'flex',
            // flexDirection: "column-reverse",
            flexDirection: "column",
            gap: "1rem",
            maxHeight: "500px",
            padding: "1em",
            overflow: "auto",
            // width: "400px",
        }}
        >
            { (!filtered? todos : openTodos).map((todo, index) => (
            <Todo
                key={todo.id}
                index={index}
                todo={todo}
                // completeTodo={completeTodo}
                // removeTodo={removeTodo}
                moveListItem={!filtered ? moveTodotListItem: ()=>{return}}
                handleChange={handleChange}
                dateHidden={dateHidden}
                // createDeadline={createDeadline}
            />
            ))}
        </Box>
    )

}