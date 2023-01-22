import { Button } from '@mui/material';
import Image from '../pictures/groep.jpg'
import '../styles/Groep.css'

const Groep = (props) => {
    const group = props.group;
    return (
        <div className="group-content">
            <p className='group-content-name'>{group.name}</p>
            <img className='group-content-lastname' src={Image}></img>
            <p className='group-content-url'><a href={group.websiteUrl}>{group.websiteUrl}</a></p>
            <div className='group-content-buttons'>
                <Button variant='contained'>Acteurs Toevoegen</Button>
                <Button variant='contained'>Toevoegen aan een Show</Button>
            </div>
        </div>
    )
}

export default Groep;