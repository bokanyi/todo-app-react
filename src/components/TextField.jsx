import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import DateTimePicker from './DateTimePicker'


const  transformDate = (str) => {
    let a = new Date(str)
    let months = ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec']
    let days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[a.getDay()]+', '+a.getDate()+' '+months[a.getMonth()] 
    + ' ' +a.getHours() + ':' + (a.getMinutes()<10 ? "0"+a.getMinutes() : a.getMinutes());
  }

const CustomTextField = ({
    onChange, 
    value, 
    isCompleted, 
    children, 
    deadline, 
    dateHidden,
    index,
}) => {

    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


    return (
        <Box
        sx = {{
            width: "350px",
        }}
        >
        
        <TextField 
            fullWidth 
            multiline
            id='fullWidth' 
            sx={{
            textDecoration: isCompleted ? "line-through" : "",
            }}
            size = "small"
            onChange={onChange}
            disabled={isCompleted}
            value={value}
            variant= "standard"
            >
            {children}
        </TextField>  
        <Typography
            variant="caption"
            onClick={handleClick}
        >
        { !dateHidden ? transformDate(deadline) : "" }
        </Typography>

        <Popover
            sx={{display: isCompleted ? "none" : "block"}}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
         }}
         
         >

        <DateTimePicker
        deadline={deadline}
        index={index}
        />

        </Popover>

        </Box>
      )
}

export default CustomTextField