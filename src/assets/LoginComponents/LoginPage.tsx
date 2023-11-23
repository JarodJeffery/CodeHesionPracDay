import LoginForm from './LoginForm.tsx';
import {useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css';
import { DATA } from '../../Data.tsx';

let data = DATA;
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
        data.username = value.email; 
        data.password = value.password;
        axios.request(config)
        .then((response) => {
            setTokenHere(response);
        })
        .catch((error) => {
            console.log(error);
        });
        
        return true;
    }

    function setTokenHere(response){
        updateToken(response.data.access_token);
        navigate('/home');
    }
    
    return (
        <div className='Forms'>
            <LoginForm gettingDetails={getToken} />
        </div>
    );
}

export default LoginPage;