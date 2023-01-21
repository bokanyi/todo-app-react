import React, {useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import  Button  from './Button'
import  TextField  from './TextField'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Radio } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';



const Todo = ({
  todo, 
  completeTodo, 
  removeTodo, 
  index, 
  moveListItem, 
  handleChange, 
  dateHidden,
  createDeadline 
}) => {

  const [isDisabled, setIsDisabled] = useState(todo.isCompleted)
  

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
          // maxWidth: "100%",
          padding: "10px",
          border: "1px solid #000", 
          borderRadius: 0,
          boxShadow: "5px 10px",

        }}
        >
          <Radio
          sx={{
            '&, &.Mui-checked': {
              color: `${todo.color}.main`,
              // color: "black" ,
            },}}
          checked={isDisabled}
          onClick={()=>{
            isDisabled ? setIsDisabled(false) : setIsDisabled(true)
            completeTodo(todo.id)
          }}
          value="a"
          name="radio-buttons"
          inputProps={{ 'aria-label': 'A' }}
          // color={todo.color}
        />
          {/* <Button
          onClick={()=>{
            isDisabled ? setIsDisabled(false) : setIsDisabled(true)
            completeTodo(todo.id)
          }}
          >
            {todo.isCompleted ? "✏️" : "📌"}
            </Button> */}
        
        
        <TextField
          
        disabled={isDisabled}
        value={todo.text} 
        onChange={(e) => handleChange(e, todo.id)}
        isCompleted = {todo.isCompleted}
        deadline={todo.deadline}
        dateHidden={dateHidden}
        index={todo.id}
        createDeadline={createDeadline}
        // setDeadline={setDeadline}
        >
        </TextField>

        {/* <Button
        onClick={()=> removeTodo(todo.id)}
        >
          ✖️
        </Button> */}
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