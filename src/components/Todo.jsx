import React, {useState, useRef, useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import  Button  from './Button'
import  TextField  from './TextField'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Radio } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { TodoContext } from '../TodoContext';




const Todo = ({
  todo, 
  index, 
  moveListItem, 
  handleChange, 
  dateHidden,
}) => {
  
  const {todos, setTodos} = useContext(TodoContext)

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  })  

  const [spec, dropRef] = useDrop({
    accept: 'item',
    hover: (item, monitor) => {
        const dragIndex = item.index
        const hoverIndex = index
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top
        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
        

        moveListItem(dragIndex, hoverIndex)
        item.index = hoverIndex
    },  
  })  

  const ref = useRef(null)
  const dragDropRef = dragRef(dropRef(ref))

  const opacity = isDragging ? 0 : 1

  const removeTodo = (id)=> {
    const newTodos = [...todos];
    setTodos(newTodos.filter( todo => todo.id !==id))
  };

  const completeTodo = (id) => {
    const newTodos = [...todos];
    newTodos.find(todo =>{ 
    if(todo.id === id) todo.isCompleted? todo.isCompleted = false : todo.isCompleted = true
    })
    setTodos(newTodos); 
  };


    return (

      <Paper 
       elevation={1} 
        
      ref={dragDropRef} 
        className="todo"
        style= {{ opacity }}
        sx = {{
          display: 'flex',
          alignItems: "center",
          backgroundColor: "secondary.main",
          justifyContent : "space-between",
          gap: "1rem",
          width: "350px",
          padding: "10px",
          border: "1px solid #000", 
          borderRadius: 0,
          boxShadow: "5px 10px",
          ':hover' : {
            transform: 'translate(-2px, -2px)',
            boxShadow: "8px 13px",
            cursor: "grab",
          }

        }}
        >
          <Radio
          sx={{
            '&, &.Mui-checked': {
              color: `${todo.color}.main`,
            },}}
          checked={todo.isCompleted}
          onClick={()=>{
            completeTodo(todo.id)
          }}
          value="a"
          name="radio-buttons"
          inputProps={{ 'aria-label': 'A' }}
        />
        
        <TextField
          
        value={todo.text} 
        onChange={(e) => handleChange(e, todo.id)}
        isCompleted = {todo.isCompleted}
        deadline={todo.deadline}
        dateHidden={dateHidden}
        index={todo.id}
        >
        </TextField>

        <IconButton 
        onClick={()=> removeTodo(todo.id)} 
        aria-label="cancel" 
        size="normal" 
        sx ={{
          zIndex: "10",
          color: "black",
        }}
        >
        <CancelIcon  fontSize="normal" />
      </IconButton>
        
      </Paper>
    );
  };

  export default Todo