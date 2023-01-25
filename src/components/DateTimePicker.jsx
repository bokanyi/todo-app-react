import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState, useContext} from 'react';
import { Stack } from '@mui/system';
import { TodoContext } from '../TodoContext';

const DateTimePicker = ({
  deadline, index, 
}) => {

  const {todos, setTodos} = useContext(TodoContext)

    const [newDeadline, setNewDeadline] = useState(deadline)

    const popperSx = {
        "& .MuiPaper-root": {
            border: "1px solid black",
            backgroundColor: "magenta",
        }

    }

    const createDeadline = (id, newDeadline) => {
      let newTodos = [...todos];
      const index = newTodos.findIndex(todo => todo.id==id)
      newTodos[index].deadline = newDeadline
      setTodos(newTodos)
    }

    return (
    //   <Stack component="form" noValidate >

        <TextField
          
          id="datetime-local"
          label="Deadline"
          type="datetime-local"
          variant='standard'
          value={newDeadline}
          onChange={((e) => {
            setNewDeadline(e.target.value)
            createDeadline(index, e.target.value)
        })}
        
          InputLabelProps={{
            shrink: true,   
            
          }}
       
        />
    //   </Stack>
    );
  }

  export default DateTimePicker