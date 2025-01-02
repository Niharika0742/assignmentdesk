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
    teacher_id:"",
    designation:"",
    email: "",
    number:"",
    gender:"",
    department:"",
    institution:"",
    role:"",
    npass:""
 });

 const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333";

useEffect(() => {
    async function getAllusers() {
        let value = await axios.get(`${apiUrl}/user/${id}`); // Use apiUrl here
        setUserData(value.data);
    }
    getAllusers();
}, [id]);

let history = useHistory();

function onTextFieldChange(e) {
    setUserData({
        ...userData,
        [e.target.name]: e.target.value
    });
}

async function handleSubmit(event) {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333";
    event.preventDefault();
    var { uname, teacher_id, designation, email, number, gender, department, institution, role, npass } = document.forms[0];
    setIsSubmitted(true);
    setUserData(uname, teacher_id, designation, email, number, gender, department, institution, role, npass);
    await axios.put(`${apiUrl}/user/${id}`, userData); // Use apiUrl here
};


  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="editform">
      <form onSubmit={handleSubmit}>
        <table>
        <div className="input-container">
          <label>Full Name </label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" value={userData.uname} name="uname" required />
        </div>
        <div className="input-container">
          <label>Teacher Id </label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" name="teacher_id" value={userData.teacher_id} required />
        </div>
        <div className="input-container">
          <label>Email </label>
          <input onChange={(e) => onTextFieldChange(e)} type="email" name="email" value={userData.email} required />
        </div>
        <div className="input-container">
          <label>Phone Number </label>
          <input onChange={(e) => onTextFieldChange(e)} type="tel" name="number" value={userData.number} required />
        </div>
        
          <label>&ensp;Gender</label><br></br><br></br>&ensp;&ensp;
          <input onChange={(e) => onTextFieldChange(e)} type="radio" name="gender" value="Male" />Male&ensp;&ensp;&ensp;&ensp;
          <input onChange={(e) => onTextFieldChange(e)} type="radio" name="gender" value="Female"  />Female
        <div className="input-container">
          <label>Department</label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" name="department" value={userData.department} required />
        </div>
        <div className="input-container">
          <label>Name of college</label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" name="institution" value={userData.institution} required />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input onChange={(e) => onTextFieldChange(e)} type="text" name="npass" value={userData.npass} required />
        </div>
        </table>
        <div className="button-container">
          <input type="submit" value="Update my profile" />
        </div>
      </form>
    </div>
  );

  return (
      <div className="register-form">
        <div className="title"><u>Edit Teacher Profile</u></div>
        {isSubmitted ?history.push(`/TeacherDashboard/profile/${id}`): renderForm}
      </div>
  );
}

export default Login;