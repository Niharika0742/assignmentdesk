
  
   import style from "../StudentDashboard.module.css";


  import {useParams , useHistory} from "react-router-dom";
  import React, {useState , useEffect} from "react";
  import axios from "axios";

     function Student(){

         const {id} = useParams();

         const [studentid , setStudentid] = useState();

         const[user , setUser] = useState([]);


         useEffect(() => {
            const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333"; // Define apiUrl here
        
            async function getUser() {
                let value = await axios.get(`${apiUrl}/user/${id}`); // Use apiUrl here
                setUser(value.data);
            }
            getUser();
        }, [id]);
        
        const [result, setResult] = useState([]);
        
        useEffect(() => {
            const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333"; // Define apiUrl here
        
            async function getAllResult() {
                let value = await axios.get(`${apiUrl}/Result`); // Use apiUrl here
                setResult(value.data);
            }
            getAllResult();
        }, []);
        


         const history = useHistory();

         return (
              <>
               <div id={style.displayHeadingBox}> 
                   <h2>Score Board</h2>  
                   
                </div>

                <div id={style.tableBoxdetails}>
                    <table>
                       <thead>
                          <tr>
                             
                             <th id={style.center}>Test Name</th>
                              <th id={style.center}>Test Taken</th>
                              <th id={style.center}>Time Spent</th>
                              <th id={style.center}>Result Status</th>
                              <th id={style.center}>Total Marks</th>
                              <th id={style.center}>Score Gained</th>  
                           </tr>
                        </thead>
                        <tbody>
                        {
                                result.map((data , i) => {
                                    if(data.student_id === user.student_id)
                                    return(
                                          <tr key={i}>
                                               
                                               <td>{data.exam_name}</td>
                                              <td>{data.exam_date}</td>
                                              <td>{data.time_spent}</td>
                                              <td>{data.result_status}</td>
                                              <td>{data.total_marks}</td>
                                              <td>{data.result_score}</td>
                                          </tr>
                                    );

                                    return <React.Fragment key={i}></React.Fragment>;
                                })
                            }
                               
                        </tbody>
                     </table>
                </div>

                
              </>
         );
     }

     export default Student;