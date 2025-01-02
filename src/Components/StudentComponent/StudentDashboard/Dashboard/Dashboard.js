

import axios from "axios";
import React, {useState , useEffect} from "react"; 

import {NavLink , useParams} from "react-router-dom"; 
import style from "./Dashboard.module.css";
 import male from "../../../../images/male.png"
 import female from "../../../../images/female.png"
 import logo from "../../../../images/home.png"

function Result() {
 const {id} = useParams();
 const [image,setImage]=useState();
 const [user , setUser] = useState({
     uname:"",
     student_id:"",
     email:"",
     number:"",
     gender:"",
     course:"",
     branch:"",
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
                         <p>Student at {user.institution}</p>
                        </div>
                        <div id={style.logo}><img src={logo}></img></div>
                        <div id={style.inbox}>  
                            <div id={style.inboxtitle}>
                            <h4>Before You Kick Off:</h4></div> 
                            <p>Welcome to Online Examination System.Here are some tips in order to get you through the system with an ease.</p>
                            <ul>
                                <li>First things first,all the Examinations are listed on the "Test Section(menu bar)"</li>
                                <li>Secondly,all the course related practise tests are listed on the "Practise Section(menu bar)"</li>
                                <li>you'll only be able to see the examinations according to your course-department.</li>
                                <li>Every examination has its own time limit,which is set by the lecturer.</li>
                                <li>You need to enter/start examination within the given time frame (date and time) ELSE you can't join the examination.</li>
                                <li>Once you finished your test,you'll ONLY be able to view your results on the Results Section.</li>
                                <li>For re-exam, please consult with your respective lecturer.</li>
                            </ul>
                        </div>
                        <h3>--------------------------------------------------------- ALL THE BEST -----------------------------------------------------------------</h3>
                        
                     
                     
     </>
 );
}

export default Result;