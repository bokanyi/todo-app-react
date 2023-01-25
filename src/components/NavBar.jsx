import { Box } from "@mui/system"
import  Button  from './Button'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircleIcon from '@mui/icons-material/Circle';
import { useState } from "react";


export const NavBar = ({ 
    addTodo, 
    setDateHidden, 
    dateHidden, 
    filtered, 
    setFiltered
}) => {

    const handleClick = () => {
        addTodo(color)
        setColor('primary')
    }

    const [color, setColor] =useState('primary')

    const colors = [
        'primary',
        'error',
        'warning',
        'info',
        'success',
      ]

    return(
        <>
            <Box
            sx={{
                width: 350,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap:"10px"
            }}
            >

        <FormControl 
        // variant="standard"
        sx={{ 
            // background: "#000",
            width:"80px",
            height:"60px",
            "& fieldset": { border: 'none' },   
         }}
       
        >
                <Select
                sx={{

                }}

                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={color}
                onChange={(e)=> setColor(e.target.value)}
                >
                {colors.map((color) => (
                    <MenuItem
                    key={color}
                    value={color}
                    >
                    <CircleIcon color={color}/>
                    </MenuItem>
                ))}
                </Select>
            </FormControl>


            <Button onClick={handleClick} 
            
            
            style={{
                width: 250,
            }}
            
               
            >ADD TASK
            </Button>

            <Button  
            onClick={()=> setFiltered(!filtered)}
            >{!filtered ? "Only open" : "All tasks"}
            </Button>

            <Button  
            onClick={() => setDateHidden(!dateHidden)}
            >{dateHidden ? "Show deadlines" : "Hide deadlines"}
            </Button>
            </Box>
        </>
    )
}