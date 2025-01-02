
 import Home from "./Components/LoginComponent/Login";
 import Register from "./Components/LoginComponent/Register";
 
import AdminDashboard from "./Components/AdminComponent/AdminDashboard/AdminDashboard";
import StudentDashboard from "./Components/StudentComponent/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./Components/TeacherComponent/TeacherDashboard/TeacherDashboard";

import {Route , BrowserRouter , Switch} from "react-router-dom";




    function App(){
      return (
        <>
          <BrowserRouter>
              <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/Register" component={Register}></Route>
                  <Route exact path="/AdminDashboard" component={AdminDashboard}></Route>
                  <Route exact path="/StudentDashboard/:id" component={StudentDashboard}></Route>
                  <Route exact path="/TeacherDashboard/:id" component={TeacherDashboard}></Route>
              </Switch>
          </BrowserRouter>
        </>
      );
     
    }

      

  export default App;