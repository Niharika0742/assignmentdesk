
  
  
   import style from "./Dashboard.module.css";

   import {useState  , useEffect} from "react";
   import { useHistory } from "react-router-dom";
   import axios from "axios";
   import logo from "../../../../images/admin-logo.png"

     function Dashboard()
     {

          const [exam , setExam] = useState("Updating...");
          const [subject , setCourses] = useState("Updating...");
          const [user , setUser] = useState("Updating...");

            useEffect(() => {
                async function getAllExam(){
                    let value  = await axios.get("http://localhost:3333/exam");
                    setExam(value.data.length);
                }
                getAllExam();


                async function getAllCourses(){
                    let value  = await axios.get("http://localhost:3333/subject");
                    setCourses(value.data.length);
                }
                getAllCourses();


                async function getAllUsers(){
                    let value  = await axios.get("http://localhost:3333/user");
                    setUser(value.data.length);
                }
                getAllUsers();
            })

 
             let history = useHistory();

            function showExam(){
                 history.push("/AdminDashboard/Subject");
            }

            function showQuestions(){
                history.push("/AdminDashboard/Question");
            }

            function showUsers(){
                history.push("/AdminDashboard/StudentList");
            }


         return(
             <>             <div id={style.title}>
             <span>Welcome back ,<h3>ADMIN!</h3> </span>
             <p>Check out the dashboard to get the information of pogress.</p>
            </div>
            <div id={style.logo}><img src={logo}></img></div>
             
                            <div id={style.inboxtitle}>
                           <div id={style.displayHeadingBox}> 
                               <h1>Dashboard</h1>     
                           </div>
                           <div id={style.box3}>
                                  <p id={style.countOfUser}><h2>{user}</h2>Students</p>
                                    <button onClick={showUsers} >More info</button>
                              </div>
                              <div id={style.box2}>
                                  <p  id={style.countOfQuestion}><h2>{subject}</h2>Courses</p>
                                   <button onClick={showQuestions}>More info</button> 
                              </div>
                              <div id={style.box1}>
                               <p id={style.countOfExam}><h2>{exam}</h2>Examinations</p>
                                   <button onClick={showExam}>More info</button>
                            </div>
                              </div>
                              
                             
             </>
         );
     }

     export default Dashboard;