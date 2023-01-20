import { Button } from "@mui/material";

const Show = (props) => {
    return(
        <>
                <div className='show-content-show'>
                    <img src={props.show.imageUrl} className='show-content-show-image'></img>
                    <p className='show-contet-show-name'>{props.show.name}</p>
                    <Button variant="outlined" style={{minWidth: '150px', minHeight: '60px'}}>Meer info</Button>
                </div>
        </>
    )
}

export default Show;