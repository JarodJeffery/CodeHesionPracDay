import axios from "axios";
import { TAGS_DATA } from "../../Data";
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Tags.css';
import AddTag from "./AddTag";
import { useNavigate } from "react-router-dom";

export default function Tags(){
    const navigate =useNavigate();
    const [items, setItems] = useState();
    let token = localStorage.getItem("accesT");

    let data = TAGS_DATA;

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://edeaf-api-staging.azurewebsites.net/v1/admin/Tags',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token,
        },
        data : data
    };

    if(!items){
        axios.request(config)
        .then((response) => {
            console.log(response.data);
            setItems(response.data.data.items);
            //console.log(items);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return(
        <>
            <div className="Content">
                <button id="Add" onClick={() => navigate('/tags/creating')}>Add Word</button>
                <ol>
                    {items?.map((item) =>{
                        return (
                            <div className="Items">
                                <li key={item.id}>
                                    <h2 style={{color: `${item.color}`}}>{item.name}</h2>
                                    <button className="liBtn" >Edit</button>
                                    <button className="liBtn" onClick={() => navigate(`/tags/deleting/${item.id}`)}>Delete</button>
                                </li>
                            </div>
                        );
                    })}
                </ol>
            </div>
        </>
    );
}