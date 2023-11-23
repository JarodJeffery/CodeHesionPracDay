import { TAGS_DATA } from "../../Data";
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function AddTag(){
    const navigate =useNavigate();
    let data = TAGS_DATA;
    let token = localStorage.getItem("accesT");
    let config = {
        method: 'post',
        url: 'https://edeaf-api-staging.azurewebsites.net/v1/admin/Tags',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };

    let post ={
        headers: {
            "Authorization" :"Bearer " + token,
            'Content-Type': 'application/json'
        }
    };

    function postNew(values){
        data.name = values.name;
        data.color = values.color;
        console.log(values);
        axios.post("https://edeaf-api-staging.azurewebsites.net/v1/admin/Tags ",data, post)
        .then((tags) =>{
            navigate('/tags');
        }).catch((e) => console.log(e));
        return true;
    }

    return (
        <div className="tagForm">
            <h1 id="regH1">Add Word</h1>
            <Formik
                initialValues={
                    {
                        name:'' ,
                        color:''
                    }
                }
                validate={values => {
                const errors ={};
                return errors;
                }
                }
                onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    postNew(values);
                    setSubmitting(false);
                },400);
                }}>
                {({values,handleChange,handleBlur,handleSubmit,isSubmitting,}) => (
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                    <label>Color</label>
                    <input type="color" name="color" onChange={handleChange} onBlur={handleBlur} value={values.color}/>                    
                    <button id="regBtn" type="submit" disabled={isSubmitting}>Submit</button>
                </form>
            )}
            </Formik>
        </div>
    );
}