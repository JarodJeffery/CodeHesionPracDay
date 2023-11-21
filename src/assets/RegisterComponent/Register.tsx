import { Formik } from 'formik';
import '../Register.css';

function Register({ addNew }) {
  return(
    <div>
      <h1 id="regH1">Register</h1>
      <Formik
        initialValues={{email:'', name:'',surname:'',  role:''}}
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
            addNew(values);
            setSubmitting(false);
          },400);
        }}>
          {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting,}) => (
         <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
            {errors.email && touched.email && errors.email}
            <label>Name</label>
            <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name}/>
            {errors.name && touched.name && errors.name}
            <label>Role</label>
            <input type="text" name="role" onChange={handleChange} onBlur={handleBlur} value={values.role}/>
            {errors.role && touched.role && errors.role}
            <label>Surname</label>
            <input type="text" name="surname" onChange={handleChange} onBlur={handleBlur} value={values.surname}/>
            {errors.surname && touched.surname && errors.surname}
            <button id="regBtn" type="submit" disabled={isSubmitting}>Submit</button>
         </form>
       )}
     </Formik>
   </div>
  );
}

export default Register;