import {useNavigate } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router';
import { useState } from 'react';
import WordList from './WordList';
import './Word.css';

const Words = () => {
    
    let token = localStorage.getItem("accesT");
    const [allbooks, setBooks] = useState();

    const navigate =useNavigate();
    const { id } = useParams();

    if(!allbooks){
        axios.get("https://edeaf-api-staging.azurewebsites.net/v1/admin/Words ",{
            headers: { 
                "accept" : "application/json",
                "Authorization" :"Bearer " + token, 
            },
        })
        .then((books) =>{
            handleBooks(books.data.data.items);
        }).catch((e) => console.log(e));
    }

    
    function handleBooks(booksArray){
        setBooks((prev) =>{
            return booksArray;
        });
    }

    function goToHome(){
        navigate('/home');
    }


    return(
        <>
            {allbooks ? <WordList books={allbooks} id={id}/>: <p>No content</p>}
            <button id="backBtn" onClick={goToHome}>Home</button>
        </>
    );
};

export default Words;