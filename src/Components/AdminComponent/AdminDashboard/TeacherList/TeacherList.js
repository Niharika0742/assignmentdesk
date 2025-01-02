

import {useState , useEffect} from "react";
import axios from "axios";

import {NavLink} from "react-router-dom";

import style from "../SubjectComponent/Subject.module.css";

  function StudentList(){

    const [students , setStudents] = useState([]);

    useEffect(()=> {
      async function getAllStudent(){
        let value = await axios.get("http://localhost:3333/user");
        setStudents(value.data);
      }
      getAllStudent();
    },[])

      return (
          <>
            <div id={style.displayHeadingBox}> 
                <h2>Teacher List</h2>     
             </div>

             <div id={style.tableBoxdetails}>
                <table>
                      <tr>
                         <th id={style.center}>Teacher Id</th>
                         <th id={style.center}>Teacher Name</th>
                         <th id={style.center}>Department</th>
                      </tr>
                      {
                        students.map((data , i) => {
                            if(data.role === "teacher"){
                          return(
                           <tr key={i}>
                              <td>{data.teacher_id}</td> 
                              <td>{data.uname}</td>
                              <td>{data.department}</td> 
                              <td>
                                <NavLink exact to={`/AdminDashboard/TeacherProfile/${data.id}`}>
                                  <span>View Profile</span> 
                                </NavLink>
                                </td>
                              <td>
                                <NavLink exact to={`/AdminDashboard/Teacheredit/${data.id}`}>
                                  <span>edit</span> 
                                </NavLink>
                                </td>
                          </tr>
                          );
                            }
                        })
                      }
                        
                 </table>
             </div>
          </>
      );
  }

  export default StudentList;