

import axios from "axios";
import React, {useState , useEffect} from "react"; 

import {NavLink , useParams} from "react-router-dom"; 
import style from "./Dashboard.module.css";
 import male from "../../../../images/male.png"
 import female from "../../../../images/female.png"
 import logo from "../../../../images/teacherlogo.png"

function Result() {
 const {id} = useParams();
 const [image,setImage]=useState();
 const [user , setUser] = useState({
     uname:"",
     teacher_id:"",
     designation:"",
     email:"",
     number:"",
     gender:"",
     department:"",
     institution:""
 });

  useEffect(()=>{    
     async function getAllusers(){
         let value = await axios.get(`http://localhost:3333/user/${id}`);
         setUser(value.data);
     }
         getAllusers();
  },[id]);
  useEffect(()=>{    
     async function getProfile(){
         let value = await axios.get(`http://localhost:3333/user/${id}`);
         if(value.data.gender==="Male"){
             setImage(male);
         }
         else{setImage(female)}
     }
         getProfile();
  },[id]);


 return (
     <>
                        <div id={style.title}>
                         <span>Welcome back ,<br></br><h3>{user.uname}!</h3> </span>
                         <p>{user.designation} at {user.institution}</p>
                        </div>
                        <div id={style.logo}><img src={logo}></img></div>
                        <div id={style.inbox}>  
                            <div id={style.inboxtitle}>
                            <h4>Before You Kick Off:</h4></div> 
                            <p>Welcome to Online Examination System.Here are some tips in order to get you through the system with an ease.</p>
                            <ul>
                                <li>First things first,all the Examinations are listed on the "Test Section(menu bar)"</li>
                                <li>Secondly,all the course related practise tests are listed on the "Course Section(menu bar)"</li>
                                <li>Every examination should have its own name,question sets,date and timing details set by LECTURER.</li>
                                <li>you'll only be able to create the examinations according to your course-department.</li>
                                <li>You need to schedule the  examination within the time frame (date and time) ELSE the always opens for student.</li>
                                <li>Once student completes their test,you'll be able to view their detailed results from Results Section.</li>
                                <li>Also, the result portion can be downloaded on pdf format.</li>
                            </ul>
                        </div>
                        <h3>--------------------------------------------------------- ALL THE BEST -----------------------------------------------------------------</h3>
                        
                     
                     
     </>
 );
}

export default Result;