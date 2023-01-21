import React from 'react';
import BezoekersPortaalHeader from '../../BezoekersPortaalHeader';
import { useEffect, useState } from 'react';
import axios from "axios"
import UserService from '../../../services/UserService';
import { arrows_circle_down } from 'react-icons-kit/linea/arrows_circle_down'
import { basic_exclamation } from 'react-icons-kit/linea/basic_exclamation'
import { Icon } from 'react-icons-kit'
function Page_Gegevens() {
  const [email, SetEmail] = useState();
  const [firstname, SetFirstname] = useState();
  const [lastname, SetLastname] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  //Voor de passwordcheck:
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [charactersValidated, setCharactersValidated] = useState(false);


  useEffect(() => {
    console.log(firstname)
  }, [firstname])

  const handleSubmit = () => {

    axios.put("https://localhost:7293/updateAccount",
      {
        id: UserService.getUser().id,
        email: email,
        firstname: firstname,
        lastname: lastname
      }).then(res => console.log(res.data));
    alert("Gegevens gewijzigd, als u opnieuw inlogd is de verandering in werking getreden.");
  }

  const handlePassword = async () => {
    try {
        const response = await fetch('https://localhost:7293/passwordreset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: UserService.getUser().email,
                currentPassword: oldPassword,
                newPassword: newPassword
            })
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            alert("Wachtwoord gewijzigd, als u opnieuw inlogd is de verandering in werking getreden.");
        } else {
            console.log(data);
            throw new Error(data.message);
        }
    } catch (error) {
        console.log(error);
    }
};




  const handleChange = (value) => {
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const special = new RegExp('(?=.*[!@#$%^&*])');
    const characters = new RegExp('(?=.{7,})');

    if (lower.test(value)) {
      setLowerValidated(true);
    } else {
      setLowerValidated(false);
    }

    if (upper.test(value)) {
      setUpperValidated(true);
    } else {
      setUpperValidated(false);
    }

    if (special.test(value)) {
      setSpecialValidated(true);
    } else {
      setSpecialValidated(false);
    }

    if (characters.test(value)) {
      setCharactersValidated(true);
    } else {
      setCharactersValidated(false);

    }
  }

  return (
    <>
      <BezoekersPortaalHeader></BezoekersPortaalHeader>

      <form className="updateAccountForm" onSubmit={handleSubmit}>
        <h1>Gegevens wijzigen</h1>

        <p>Email</p>
        <input
          type="email"
          onChange={(event) => SetEmail(event.target.value)}
        ></input>

        <p>Naam</p>
        <input
          type={"name"}
          onChange={(event) => SetFirstname(event.target.value)}
        ></input>


        <p>Achternaam</p>
        <input

          type={"name"}
          onChange={(event) => SetLastname(event.target.value)}
        ></input>

        <button
          type="onSubmit"
          className="btn-submit"
          id="button"
        >
          Gegevens wijzigen
        </button>
      </form>

      <hr></hr>

      <form className="updatePasswordForm" onSubmit={handlePassword}>
        <h4>Wachtwoord wijzigen</h4>

        <p>Oude wachtwoord</p>
        <input
          type="password"
          onChange={(event) => setOldPassword(event.target.value)}
        ></input>

        <p>Nieuwe Wachtwoord</p>
        <input
          type="password"
          onChange={(event) => { setNewPassword(event.target.value); handleChange(event.target.value) }}
        ></input>
        <main className="tracker-box">
          <div className={upperValidated ? 'validated' : 'not-validated'}>
            {upperValidated ? (
              <span className="list-icon green">
                <Icon icon={arrows_circle_down} size={20} />
              </span>
            ) : (<span className="list-icon">
              <Icon icon={basic_exclamation} size={20} />
            </span>
            )} U moet minimaal 1 hoofdletter gebruiken</div>
          <div className={lowerValidated ? 'validated' : 'not-validated'}>
            {lowerValidated ? (
              <span className="list-icon green">
                <Icon icon={arrows_circle_down} size={20} />
              </span>
            ) : (<span className="list-icon">
              <Icon icon={basic_exclamation} size={20} />
            </span>
            )} U moet minimaal 1 kleine letter gebruiken</div>
          <div className={specialValidated ? 'validated' : 'not-validated'}>
            {specialValidated ? (
              <span className="list-icon green">
                <Icon icon={arrows_circle_down} size={20} />
              </span>
            ) : (<span className="list-icon">
              <Icon icon={basic_exclamation} size={20} />
            </span>
            )} U moet minimaal 1 speciaal karakter gebruiken</div>
          <div className={charactersValidated ? 'validated' : 'not-validated'}>
            {charactersValidated ? (
              <span className="list-icon green">
                <Icon icon={arrows_circle_down} size={20} />
              </span>
            ) : (<span className="list-icon">
              <Icon icon={basic_exclamation} size={20} />
            </span>
            )} U moet minimaal 7 karakters gebruiken</div>
        </main>
        <button
          type="onSubmit"
          className="btn-submit"
          id="button"
          disabled={oldPassword && newPassword == ""}
        >
          Wachtwoord wijzigen
        </button>
      </form>




    </>
  )

}
export default Page_Gegevens