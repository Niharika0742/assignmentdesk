import React, { useState } from "react";
import {NavLink ,useHistory} from "react-router-dom";
import axios from "axios";
import baseUrl from "../baseUrl";

import "./registerstyles.css";

function Login() {
  
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    email:"Email has already been exists",
    pass: "password doesn't match"
  };
  const [userData , setUserData] = useState({
    uname: "",
    email: "",
    number:"",
    student_id:"",
    gender:"",
    course:"",
    branch:"",
    institution:"",
    npass:"",
    role:""
 });
 let history =useHistory();
 function onTextFieldChange(e){
    setUserData({
        ...userData,
        [e.target.name] : e.target.value
    });
}
  async function handleSubmit(event){
    event.preventDefault();
    var { uname,email,number,student_id,gender,course,branch,institution,npass,cpass } = document.forms[0];
    let values  = await axios.get(`${baseUrl}/user`);
    for(let i=0;i<values.data.length;i++){
        if( values.data[i].email===email.value){
            setErrorMessages({ name: "email", message: errors.email });
            return;
        }
    }
      if (npass.value !== cpass.value) {

        setErrorMessages({ name: "pass", message: errors.pass });
      }else {
        setIsSubmitted(true);
        setUserData(uname,email,number,student_id,gender,course,branch,institution,npass);
        await axios.post(`${baseUrl}/user` , userData);
    
      }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <table>
        <tr><td colSpan={2}><div className="input-container">
          <label>Full Name </label>
          <input onChange={(e) => onTextFieldChange(e)} style={{width:425}} type="text" name="uname" required />
        </div></td></tr>
        <tr><td><div className="input-container">
          <label>Email </label>
          <input onChange={(e) => onTextFieldChange(e)} type="email" name="email" required />
          {renderErrorMessage("email")}
        </div></td>
        <td><div className="input-container">
          <label>Phone Number </label>
          <input onChange={(e) => onTextFieldChange(e)} type="tel" name="number" required />
        </div></td></tr>
        <tr><td><div className="input-container">
          <label>Student Id </label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" name="student_id" required />
        </div></td>
        <td>
          <label>&ensp;Gender</label><br></br><br></br>&ensp;&ensp;
          <input onChange={(e) => onTextFieldChange(e)} type="radio" name="gender" value="Male" required />Male&ensp;&ensp;&ensp;&ensp;
          <input onChange={(e) => onTextFieldChange(e)} type="radio" name="gender" value="Female" required />Female
        </td></tr>
        <tr><td><div className="input-container">
          <label>Course</label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" name="course" required />
        </div></td>
        <td><div className="input-container">
          <label>Branch</label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" name="branch" required />
        </div></td></tr>
        <tr><td colSpan={2}><div className="input-container">
          <label>Name of college</label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" style={{width:425}} name="institution" required />
        </div></td>
          </tr>
        <tr><td><div className="input-container">
          <label>Create Password</label>
          <input onChange={(e) => onTextFieldChange(e)} type="password" name="npass" required />
          {renderErrorMessage("pass")}
        </div></td>
        <td><div className="input-container">
          <label>Confirm Password </label>
          <input type="password" name="cpass" required />
          {renderErrorMessage("pass")}
        </div></td></tr>
      
        </table>
        <div className="button-container">
          <input type="submit" value="Register" />
        </div>
        <div className="signup">
             Already have an account? <NavLink exact to="/">sign in</NavLink> 
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="register-form">
        <div className="title"><u>Student Register Form</u></div>
        {isSubmitted ?history.push("/"): renderForm}
      </div>
    </div>
  );
}

export default Login;