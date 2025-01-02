
    
    import style from "./AdminDashboard.module.css";

    import {useHistory} from "react-router-dom";

    import {NavLink , BrowserRouter , Switch , Route} from "react-router-dom";

     
    
    
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
    import Profile from "./StudentList/Profile";
    


    
    function AdminDashboard(){

         let history = useHistory();

         function goToAdminLogin(){
              history.push("/");
         }


        return (
            <>
            
             <BrowserRouter>
            
                 <div id={style.header}>
                
            <div id={style.headerHeadingBox}>
                <h3>Hello Admin!</h3> 
            </div>

             <div id={style.headerMenuBox}>
                           <NavLink exact to="/AdminDashboard"> <span> Home</span> </NavLink>
                <NavLink exact className={style.removeUnderline} to="/AdminDashboard/Subject"><span> Courses </span></NavLink>
                            <NavLink exact className={style.removeUnderline} to="/AdminDashboard/Exam"><span>  Test </span></NavLink>
                            <NavLink exact className={style.removeUnderline} to="/AdminDashboard/Question"><span>  Question </span></NavLink>
                            <NavLink exact className={style.removeUnderline} to="/AdminDashboard/Result"> <span> Scores </span></NavLink>
                            <NavLink exact className={style.removeUnderline} to="/AdminDashboard/StudentList"><span>  Students </span></NavLink>
                            
                <a> <span onClick={goToAdminLogin}> Logout</span></a>
             </div>
        </div>

        <div id={style.box}>
       
            <div id={style.image}><h1>ONLINE</h1><h1>EXAMINATION</h1><h1>SYSTEM</h1></div>
            <div id={style.display}>
                      <Switch>
                          <Route exact path="/AdminDashboard" component={Dashboard}></Route>
                          <Route exact path="/AdminDashboard/Subject" component={Subject}></Route>
                          <Route exact path="/AdminDashboard/Exam" component={Exam}></Route>
                          <Route exact path="/AdminDashboard/Question" component={Question}></Route>
                          <Route exact path="/AdminDashboard/Result" component={Result}></Route>
                          <Route exact path="/AdminDashboard/StudentList" component={StudentList}></Route>
                           <Route exact path="/AdminDashboard/Exam/Details/:id" component={Details}></Route>
                           <Route exact path="/AdminDashboard/Question/Details/:id" component={view}></Route>
                            <Route exact path="/AdminDashboard/Question/ViewQuestion/:id" component={ViewQuestion}></Route>
                            <Route exact path="/AdminDashboard/Question/AddQuestion/:id" component={AddQuestion}></Route>
                            <Route exact path="/AdminDashboard/StudentList/Details/:id" component={Student}></Route>
                            <Route exact path="/AdminDashboard/Profile/:id" component={Profile} ></Route>
                      </Switch>
                            </div> 
                      </div>    
                </BrowserRouter>

              
               

              
            </>
        );
    }

    export default AdminDashboard;