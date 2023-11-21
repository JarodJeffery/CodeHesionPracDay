import { Formik } from 'formik';

export default function UserForm( {updateUser, userInfo} ){ 
    return (
        <div className="userForm">
            <h1 id="regH1">Update User</h1>
            <Formik
                initialValues={
                    {
                        email:userInfo.email, 
                        name:userInfo.name ,
                        surname:userInfo.lastName
                    }
                }
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
                    updateUser(values);
                    setSubmitting(false);
                },400);
                }}>
                {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting,}) => (
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder={userInfo.email}/>
                    {errors.email && touched.email && errors.email}
                    <label>Name</label>
                    <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name}  placeholder={userInfo.name}/>
                    {errors.name && touched.name && errors.name}
                    <label>Surname</label>
                    <input type="text" name="surname" onChange={handleChange} onBlur={handleBlur} value={values.surname} placeholder={userInfo.lastName}/>
                    {errors.surname && touched.surname && errors.surname}
                    <button id="regBtn" type="submit" disabled={isSubmitting}>Submit</button>
                </form>
            )}
            </Formik>
        </div>
    );
}