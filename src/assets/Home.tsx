import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Home.css';

let data = {
    'grant_type': 'password',
    'client_id': 'web-dashboard',
    'client_secret': 'SuperSecretPassword',
    'scope': 'openid profile role email offline_access adminApi mobileApi',
    'username': '',
    'password': '' 
};

let config = {
    method: 'post',

    url: 'https://edeaf-api-staging.azurewebsites.net/connect/token',
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
};

const Home = (token) => {
    const navigate =useNavigate();
    if(token.token.accessT == null){
        return <>
        <p id ="NoAccess">Login first</p>
        <button id="homeBtn" onClick={goToLogin}>Login</button>
        </>;
    }

    function goToLogin(){
        navigate('/')
    }

    function goToReg(){
        navigate('/reg');
    }

    function goToUser(){
        navigate('/user');
    }

    const [content, updateContent] =  useState();
    if(!content){
        axios.get("https://edeaf-api-staging.azurewebsites.net/v1/admin/Categories ",{
            headers: { 
                "accept" : "application/json",
                "Authorization" :"Bearer " + token.token.accessT, 
            },
        })
        .then((users) =>{
            //console.log(users.data);
            updateContentData(users.data);
        }).catch((e) => console.log(e));
    }

    function updateContentData(arr){ 
        updateContent(arr);
    }

    return(
        <div>
            <h1 id="CatH1">Catagories</h1>
            <ol className="categories">
                {content != null && content.data.map((item)=>{
                    return (<li key={item.id}>
                        <Link to={`/Words/${item.id}`} className="Links">{item.name}</Link>
                    </li>);
                })}
            </ol>
            <button id="homeBtn" onClick={goToReg}>Register new User</button>
            <button id="updateUser" onClick={goToUser}>Update User Info</button>
        </div>
    );
}

export default Home;
