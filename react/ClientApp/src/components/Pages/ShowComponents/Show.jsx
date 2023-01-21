import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const Show = (props) => {
    const navigate = useNavigate();
    const prop = props.show;

    const handleClick = () => {
        navigate('/meerinfo', {state: {prop}})
    }

    return(
        <>
        
                <div className='show-content-show'>
                    <img src={prop.imageUrl} className='show-content-show-image'></img>
                    <p className='show-contet-show-name'>{prop.name}</p>
                    <Button variant="outlined" style={{minWidth: '150px', minHeight: '60px'}} onClick={handleClick}>Meer info</Button>
                </div>
        </>
    )
}

export default Show;