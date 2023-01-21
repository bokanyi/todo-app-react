import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Stack } from '@mui/system';

const DateTimePicker = ({deadline, index, createDeadline}) => {

    const [newDeadline, setNewDeadline] = useState(deadline)

    const popperSx = {
        "& .MuiPaper-root": {
            border: "1px solid black",
            backgroundColor: "magenta",
        }

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
        //   sx={{ 
        //     // p: 1,
        //     width: 180,
        //     border: "1px solid black",
        //     backgroundColor: "magenta",
            
        // }}
        
          InputLabelProps={{
            shrink: true,   
            
          }}
       
        />
    //   </Stack>
    );
  }

  export default DateTimePicker