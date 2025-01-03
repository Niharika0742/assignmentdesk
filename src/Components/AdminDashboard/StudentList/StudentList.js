

   import {useState , useEffect} from "react";
   import axios from "axios";

   import {NavLink} from "react-router-dom";

   import style from "../SubjectComponent/Subject.module.css";

     function StudentList(){

       const [students , setStudents] = useState([]);

       useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333"; // Define apiUrl here
    
        async function getAllStudent() {
            let value = await axios.get(`${apiUrl}/user`); // Use apiUrl here
            setStudents(value.data);
        }
        getAllStudent();
    }, []);
    
         return (
             <>
               <div id={style.displayHeadingBox}> 
                   <h2>Student List</h2>     
                </div>

                <div id={style.tableBoxdetails}>
                   <table>
                         <tr>
                            <th id={style.center}>Student Id</th>
                            <th id={style.center}>Student Name</th>
                         </tr>
                         {
                           students.map((data , i) => {
                             return(
                              <tr key={i}>
                                 <td>{data.student_id}</td> 
                                 <td>{data.uname}</td> 
                                 <td>
                                   <NavLink exact to={`/AdminDashboard/Profile/${data.id}`}>
                                     <span>View Profile</span> 
                                   </NavLink>
                                   </td>
                                 <td>
                                   <NavLink exact to={`/AdminDashboard/StudentList/Details/${data.id}`}>
                                     <span>View Performance</span> 
                                   </NavLink>
                                   </td>
                             </tr>
                             );
                           })
                         }
                           
                    </table>
                </div>
             </>
         );
     }

     export default StudentList;