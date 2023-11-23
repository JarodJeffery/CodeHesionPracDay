import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Home.css';
import { DATA} from "../../Data";


let data = DATA;

const Home = () => {

    let token = localStorage.getItem("accesT");
    console.log();
    const navigate =useNavigate();
    if(token.token === null){
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
                "Authorization" :"Bearer " + token, 
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
            <button id="tagsBtn" onClick={() => navigate('/tags')}>Tags Info</button>
        </div>
    );
}

export default Home;
