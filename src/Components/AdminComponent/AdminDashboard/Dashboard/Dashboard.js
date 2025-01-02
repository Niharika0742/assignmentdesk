
  
  
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
          const [questions , setAllQuestions] = useState("Updating...");
            
          

            useEffect(() => {
                async function getAllExam(){
                    let value  = await axios.get("http://localhost:3333/exam");
                    setExam(value.data.length);
                }
                getAllExam();

                async function getAllQuestions(){
                    let value  = await axios.get("http://localhost:3333/question");
                    setAllQuestions(value.data.length);
                }
                getAllQuestions();


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
            function showdepartment(){
                history.push("/AdminDashboard/StudentList");
            }
            function showTeacher(){
                history.push("/AdminDashboard/StudentList");
            }


         return(
             <>             
             
                            <div id={style.inboxtitle}>
                           <div id={style.displayHeadingBox}> 
                               <h1>DASHBOARD</h1>     
                           </div>
                           <div id={style.box4}>
                               <p id={style.countOfExam}><h2>{exam}</h2>Departments</p>
                                   <button onClick={showdepartment}>More info</button>
                            </div>
                            <div id={style.box2}>
                                  <p  id={style.countOfQuestion}><h2>{subject}</h2>Courses</p>
                                   <button onClick={showQuestions}>More info</button> 
                              </div>
                              <div id={style.box1}>
                               <p id={style.countOfExam}><h2>{exam}</h2>Examinations</p>
                                   <button onClick={showExam}>More info</button>
                            </div>
                            <div id={style.box3}>
                                  <p id={style.countOfUser}><h2>{user}</h2>Students</p>
                                    <button onClick={showUsers} >More info</button>
                              </div>
                              
                            <div id={style.box5}>
                               <p id={style.countOfExam}><h2>{exam}</h2>Teachers</p>
                                   <button onClick={showTeacher}>More info</button>
                            </div>
                            <div id={style.box6}>
                               <p id={style.countOfExam}><h2>{questions}</h2>Question</p>
                                   <button onClick={showQuestions}>More info</button>
                            </div>
                            
                            </div>
                              
                             
             </>
         );
     }

     export default Dashboard;