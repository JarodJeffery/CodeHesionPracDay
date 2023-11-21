import LoginForm from './LoginComponents/LoginForm.tsx';
import {useNavigate } from 'react-router-dom';
import axios from "axios";
import './LoginComponents/Login.css';

let data = {
    'grant_type': 'password',
    'client_id': 'web-dashboard',
    'client_secret': 'SuperSecretPassword',
    'scope': 'openid profile role email offline_access adminApi mobileApi',
    'username': '',
    'password': '' 
};
//
let config = {
    method: 'post',

    url: 'https://edeaf-api-staging.azurewebsites.net/connect/token',
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
};


const LoginPage = ({ updateToken }) => {
    const navigate =useNavigate();
    
    const getToken =async(value) =>{
        data.username =value.email; //'admin@codehesion.co.za';
        data.password = value.password; //'P@ssword1'; 
        axios.request(config)
        .then((response) => {
            //console.log(JSON.stringify(response.data.access_token));
            setTokenHere(response);
        })
        .catch((error) => {
            console.log(error);
        });
        
        return true;
    }

    function setTokenHere(response){
        console.log(JSON.stringify(response.data));
        updateToken(response.data.access_token, data.username, data.password);
        navigate('/home');
    }
    
    return (
        <div className='Forms'>
            <LoginForm gettingDetails={getToken} />
        </div>
    );
}

export default LoginPage;