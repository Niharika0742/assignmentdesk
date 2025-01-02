import React, { useState ,useEffect} from "react";
import {NavLink ,useHistory,useParams} from "react-router-dom";
import axios from "axios";

import "./registerstyles.css";


function Login() {
  const {id} = useParams();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
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
    npass:""
 });

 useEffect(()=>{    
    async function getAllusers(){
        let value = await axios.get(`http://localhost:3333/user/${id}`);
        setUserData(value.data);
    }
        getAllusers();
 },[id]);
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

      if (npass.value !== cpass.value) {

        setErrorMessages({ name: "pass", message: errors.pass });
      }else {
        setIsSubmitted(true);
        setUserData(uname,email,number,student_id,gender,course,branch,institution,npass);
        await axios.put(`http://localhost:3333/user/${id}`, userData);
    
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
          <input onChange={(e) => onTextFieldChange(e)} style={{width:425}} type="text" value={userData.uname} name="uname" required />
        </div></td></tr>
        <tr><td><div className="input-container">
          <label>Email </label>
          <input onChange={(e) => onTextFieldChange(e)} style={{width:200}}type="email" name="email" value={userData.email} required />
        </div></td>
        <td><div className="input-container">
          <label>Phone Number </label>
          <input onChange={(e) => onTextFieldChange(e)} type="tel" name="number" value={userData.number} required />
        </div></td></tr>
        <tr><td><div className="input-container">
          <label>Student Id </label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" name="student_id" value={userData.student_id} required />
        </div></td>
        <td>
          <label>&ensp;Gender</label><br></br><br></br>&ensp;&ensp;
          <input onChange={(e) => onTextFieldChange(e)} type="radio" name="gender" value="Male" />Male&ensp;&ensp;&ensp;&ensp;
          <input onChange={(e) => onTextFieldChange(e)} type="radio" name="gender" value="Female"  />Female
        </td></tr>
        <tr><td><div className="input-container">
          <label>Course</label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" name="course" value={userData.course} required />
        </div></td>
        <td><div className="input-container">
          <label>Branch</label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" name="branch" value={userData.branch} required />
        </div></td></tr>
        <tr><td colSpan={2}><div className="input-container">
          <label>Name of college</label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" style={{width:425}} name="institution" value={userData.institution} required />
        </div></td>
          </tr>
        <tr><td><div className="input-container">
          <label>Create Password</label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" name="npass" value={userData.npass} required />
          {renderErrorMessage("pass")}
        </div></td>
        <td><div className="input-container">
          <label>Confirm Password </label>
          <input type="text" name="cpass" value={userData.npass} required />
          {renderErrorMessage("pass")}
        </div></td></tr>
      
        </table>
        <div className="button-container">
          <input type="submit" value="Update my profile" />
        </div>
      </form>
    </div>
  );

  return (
      <div className="register-form">
        <div className="title"><u>Edit Profile</u></div>
        {isSubmitted ?history.push(`/StudentDashboard/profile/${id}`): renderForm}
      </div>
  );
}

export default Login;