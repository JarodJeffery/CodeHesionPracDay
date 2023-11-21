import React from 'react';
import { Formik } from 'formik';
import "./Login.css";

function LoginForm({ gettingDetails }) {
  return(
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{email:'', password:'' }}
        validate={values => {
          const errors ={};
          if(!values.email)
          {
            errors.email ='Required';
          }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
          {
            errors.email = 'Invalid email address';
          }
          return errors;
          }
        }
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            gettingDetails(values);
          },400);
        }}>
          {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting,}) => (
         <form onSubmit={handleSubmit}>
            <label id="loginLable" >Email </label>
            <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder='email@hotmail.co.za'/>
            {errors.email && touched.email && errors.email}
            <label id="loginLable">Password </label>
            <input type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} placeholder='1234'/>
            {errors.password && touched.password && errors.password}
            <button id="loginBtn" type="submit" disabled={isSubmitting}>Submit</button>
         </form>
       )}
     </Formik>
   </div>
  );
}

export default LoginForm;