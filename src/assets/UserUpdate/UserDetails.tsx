import './User.css';
import UserForm from './UserForm';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from "axios";

export default function UserDetail({ token }){
    const navigate =useNavigate();
    const [currUser, setCurrUser] = useState({
        'id' : '',
        'email': '',
        'lastName': '',
        'roles': '',
        'name' : '',
    });

    console.log('currUser ', currUser);

    const t = token.accessT;
    if(currUser.id === ''){
        axios.get("https://edeaf-api-staging.azurewebsites.net/v1/admin/Users/current ",{
            headers: { 
                "accept" : "application/json",
                "Authorization" :"Bearer " + t, 
            },
        })
        .then((users) =>{
            //handleUserData(users.data.data);
            let id = users.data.data.id;
            let email = users.data.data.email;
            let lastName = users.data.data.lastName;
            let roles = users.data.data.roles;
            let name = users.data.data.name;
            handleUserData(id, email, lastName, roles, name);
        }).catch((e) => console.log(e));
    }

    function handleUserData(id, email, lastName, roles, name){
        setCurrUser(() =>{
            return {
                'id' : id,
                'email': email,
                'lastName': lastName,
                'roles': roles,
                'name': name
            }
        });
    }

    function goToLogin(){
        navigate('/')
    }

    if(t === null){
        return (<>
            <p>Login first</p>
            <button id="homeBtn" onClick={goToLogin}>Login</button></>
        );
    }


    function update(values){
        let data = JSON.stringify({
            "name": values.name,
            "lastName": values.surname,
            "email":values.email
          });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'https://edeaf-api-staging.azurewebsites.net/v1/admin/Users/current',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer' + token.accessT,
            },
            data : data
        };

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <UserForm updateUser={update} userInfo={currUser}/>
        </>
    );
}