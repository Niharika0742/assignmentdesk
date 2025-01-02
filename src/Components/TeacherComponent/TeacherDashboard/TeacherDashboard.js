
    
    import style from "./TeacherDashboard.module.css";

   
    import {NavLink , useLocation,useParams,Switch , Route , BrowserRouter , useHistory} from "react-router-dom";

    import {useState,useEffect } from "react";
    import axios from "axios";

     
    
    
    import Dashboard from "./Dashboard/Dashboard";
    import Subject from "./SubjectComponent/Subject";
    import Exam from "./ExamComponent/Exam";
    import Question from "./QuestionComponent/Question";
    import Result from "./ResultComponent/Result";
    import StudentList from "./StudentList/StudentList";
    import Student from "./StudentList/Student/Student";
    import view from "./QuestionComponent/DetailComponent/Details";
    import Details from "./ExamComponent/DetailComponent/Details";
    import ViewQuestion from "./QuestionComponent/ViewQuestion/ViewQuestion";
    import AddQuestion from "./QuestionComponent/AddQuestion/AddQuestion";
    import Profile from "./ProfileComponenet/Profile";
    import editprofile from "./ProfileComponenet/Editprofile";
    


    
    function TeacherDashboard(){
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

         function goToAdminLogin(){
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
             <NavLink exact to={`/TeacherDashboard/${id}`}> <span>Home</span> </NavLink>
             <NavLink exact className={style.removeUnderline} to={`/TeacherDashboard/Subject/${id}`}><span> Courses </span></NavLink>
                            <NavLink exact className={style.removeUnderline} to={`/TeacherDashboard/Exam/${id}`}><span>  Test </span></NavLink>
                            <NavLink exact className={style.removeUnderline} to={`/TeacherDashboard/Question/${id}`}><span>  Question </span></NavLink>
                            <NavLink exact className={style.removeUnderline} to={`/TeacherDashboard/Result/${id}`}> <span> Scores </span></NavLink>
                            <NavLink exact className={style.removeUnderline} to={`/TeacherDashboard/StudentList/${id}`}><span>  Students </span></NavLink>
                            <NavLink exact to={`/TeacherDashboard/profile/${id}`}> <span>Profile</span></NavLink>
                            
                <a> <span onClick={goToAdminLogin}> Logout</span></a>
             </div>
        </div>

        <div id={style.box}>
       
            <div id={style.image}><h1>ONLINE</h1><h1>EXAMINATION</h1><h1>SYSTEM</h1></div>
            <div id={style.display}>
                      <Switch>
                          <Route exact path="/TeacherDashboard/:id" component={Dashboard}></Route>
                          <Route exact path="/TeacherDashboard/Subject/:id" component={Subject}></Route>
                          <Route exact path="/TeacherDashboard/Exam/:id" component={Exam}></Route>
                          <Route exact path="/TeacherDashboard/Question/:id" component={Question}></Route>
                          <Route exact path="/TeacherDashboard/Result/:id" component={Result}></Route>
                          <Route exact path="/TeacherDashboard/StudentList/:id" component={StudentList}></Route>
                           <Route exact path="/TeacherDashboard/Exam/Details/:id" component={Details}></Route>
                           <Route exact path="/TeacherDashboard/Question/Details/:id/" component={view}></Route>
                            <Route exact path="/TeacherDashboard/Question/ViewQuestion/:id/" component={ViewQuestion}></Route>
                            <Route exact path="/TeacherDashboard/Question/AddQuestion/:id/" component={AddQuestion}></Route>
                            <Route exact path="/TeacherDashboard/StudentList/Details/:id/" component={Student}></Route> 
                             <Route exact path="/TeacherDashboard/Profile/:id" component={Profile} ></Route>
                             <Route exact path="/TeacherDashboard/editprofile/:id" component={editprofile} ></Route>
                      </Switch>
                            </div> 
                      </div>    
                </BrowserRouter>

              
               

              
            </>
        );
    }

    export default TeacherDashboard;