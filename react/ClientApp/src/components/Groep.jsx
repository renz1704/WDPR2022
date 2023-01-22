import { Button } from '@mui/material';
import Image from '../pictures/groep.jpg'
import '../styles/Groep.css'

const Groep = (props) => {
    const group = props.group;
    return (
                <tr>
                <td>{group.id}</td>
                <td> {group.name}</td>
                <td> {group.description}</td>
                <th> <a href={group.websiteUrl}>{group.websiteUrl}</a></th>
                <th> <img src= {Image}></img></th>
                <th> <Button variant='contained'>Toevoegen aan show</Button> <Button variant='contained'>Acteur toevoegen</Button><Button variant='contained' sx={{backgroundColor:'red'}}>Verwijderen</Button></th>
                </tr>
    )
}

export default Groep;