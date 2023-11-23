import Register from "./Register";
import axios from "axios";
import {useNavigate } from 'react-router-dom';
import './Register.css';
import { ACCESS_TOKEN } from "../../Data";
let data = {
    "name": "",
    "surname": "",
    "email": "",
    "role": ""
};
//


const RegisterPage =() =>{
    ACCESS_TOKEN.token = localStorage.getItem("accesT");
    let token = ACCESS_TOKEN.token;
    const navigate =useNavigate();
    
    if(token == null){
        return <>
        <p>Login first</p>
        <button onClick={goToLogin}>Login</button>
        </>;
    }

    function goToLogin(){
        navigate('/');
    }

    const config = {
        headers: {
            "Authorization" :"Bearer " + token,
            'Content-Type': 'application/json'
        }
    };

    console.log(token);
    const addNewUser = async(value) => {
        data.name = value.name;
        data.surname = value.surname;
        data.role = value.role;
        data.email = value.email;
        console.log(data);
        axios.post("https://edeaf-api-staging.azurewebsites.net/v1/admin/Users ",data, config)
        .then((users) =>{
            console.log(users.data);
            alert("User Added");
            navigate('/home');
        }).catch((e) => console.log(e));
        return true;
    }

    return (
        <div className='regForm'>
            <Register addNew={addNewUser} />
        </div>
    );
}

export default RegisterPage;