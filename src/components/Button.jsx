import Button from '@mui/material/Button';

const CustomButton = ({onClick, children, style}) =>{

    return (
        <Button 
            sx={{
                minHeight: "2rem",
                minWidth: "2rem", 
                p:"0.5rem 1rem",
                borderRadius: 0,
                fontWeight: 300,

            }}
            style={style}
            onClick={onClick}
            color = 'button'
            variant="contained"
            >
            {children}
        </Button>
    
      )
}

export default CustomButton