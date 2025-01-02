
   import {NavLink , useLocation,useParams,Switch , Route , BrowserRouter , useHistory} from "react-router-dom";

   import {useState,useEffect } from "react";
   import axios from "axios";
   import style from "./StudentDashboard.module.css";

    import Subject from "./Subject/Subject"; 
    import Dashboard from "./Dashboard/Dashboard";
    import profile from "./ProfileComponenet/Profile";
    import editprofile from "./ProfileComponenet/Editprofile";
    import Result from "./ProfileComponenet/Result";
    import Exam from "./ExamComponent/Exam";
    import Practise from "./PractiseComponent/Practise";
    import TestPractise from "./PractiseTestComponent/TestPractise";
    import Test from "./TestComponent/Test";

      function StudentDashboard(){
        const {id} = useParams();
        const [user,setUser]=useState();
        useEffect(()=>{    
            async function getAllusers(){
                let value = await axios.get(`http://localhost:3333/user/${id}`);
                setUser(value.data.uname);
            }
                getAllusers();
         },[id]);
       
         let history = useHistory();

         function logout(){
             sessionStorage.clear();
            history.push("/");
         }     
          return (
              <>
             <BrowserRouter>
                 <div id={style.header}>
                
                      <div id={style.headerHeadingBox}>
                          <h3>ONLINE EXAMINATION SYSTEM</h3> 
                          
                      </div> 

                        <div id={style.headerMenuBox}> 
                            <NavLink exact to={`/StudentDashboard/${id}`}> <span>Home</span> </NavLink>
                            <NavLink exact to={`/StudentDashboard/Practise/${id}`}> <span>Practise</span> </NavLink>
                            <NavLink exact to={`/StudentDashboard/Subject/${id}`}> <span>Test</span> </NavLink>
                            <NavLink exact to={`/StudentDashboard/Result/${id}`}> <span>Results</span></NavLink>
                            <NavLink exact to={`/StudentDashboard/profile/${id}`}> <span>Profile</span></NavLink>
                            <NavLink onClick={logout} exact to="/"> <span>Logout</span> </NavLink>
                       </div> 

                   </div>
                   <div id={style.box}>
                   <div id={style.image}><h>ONLINE<br></br>EXAMINATION<br></br>SYSTEM</h></div>
                  <div id={style.display}>
                      <Switch>
                           <Route exact path="/StudentDashboard/:id" component={Dashboard}></Route> 
                           <Route exact path="/StudentDashboard/Subject/:id" component={Subject} ></Route>
                           <Route exact path="/StudentDashboard/profile/:id" component={profile} ></Route>
                           <Route exact path="/StudentDashboard/editprofile/:id" component={editprofile} ></Route>
                           <Route exact path="/StudentDashboard/Result/:id" component={Result} ></Route>
                           <Route exact path="/StudentDashboard/Practise/:id" component={Practise} ></Route>
                           <Route exact path="/StudentDashboard/Exam/:id" component={Exam} ></Route>
                           <Route exact path="/StudentDashboard/TestPractise/:id" component={TestPractise} ></Route>
                           <Route exact path="/StudentDashboard/Test/:id/:category" component={Test} ></Route>
                      </Switch>
                   </div></div>
             </BrowserRouter>
             
              </>
          ); 

      }

      export default StudentDashboard;