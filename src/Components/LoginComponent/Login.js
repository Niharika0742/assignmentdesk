import React, { useState } from "react";
import {NavLink ,useHistory} from "react-router-dom";
import axios from "axios";
import baseUrl from "../baseUrl";
import "./loginstyles.css";

function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [id, setId] = useState({"idno":""});

  const errors = {
    uname: "invalid email id",
    pass: "invalid password" 
  };
  let history = useHistory();

  async function handleSubmit(event){
    event.preventDefault();
    var { uname, pass } = document.forms[0];
    if(uname.value==="admin123@gmail.com"){
      if(pass.value==="admin123")history.push("/AdminDashboard");
      else{setErrorMessages({ name: "uname", message: errors.uname});}
    }
    else{
    let database = await axios.get(`${baseUrl}/user`);
    for(let i=0;i<database.data.length;i++){
        if (database.data[i].email === uname.value) {  
            if (database.data[i].npass!== pass.value) {
              setErrorMessages({ name: "pass", message: errors.pass });
              return
            } else {
              setIsSubmitted(true);
              if(database.data[i].role==="teacher"){history.push(`/TeacherDashboard/${database.data[i].id}`);}
              else{history.push(`/StudentDashboard/${database.data[i].id}`)};
            }
        } 
    }
    if(!isSubmitted)setErrorMessages({ name: "uname", message: errors.uname});
    }
  };
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
  
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email id </label>
          <input type="email" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        <div className="signup">
            New to Portal?&ensp;<NavLink exact to="/Register"> Register</NavLink> 
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="headerHeadingBox">
                          <h3>ONLINE EXAMINATION SYSTEM</h3>     
                      </div> 
      <div className="login-form">
        <div className="title"><u>Sign In</u></div>
        {renderForm}
      </div>  
      </div>
  );
}

export default Login;