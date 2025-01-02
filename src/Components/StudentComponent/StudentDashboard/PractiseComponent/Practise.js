
   
   import style from "../StudentDashboard.module.css";

   import {useState , useEffect} from "react";
   import axios from "axios";

   import {NavLink} from "react-router-dom";
   import testicon from "../../../../images/testicon.jpg"


   function Subject(){

        const [allSubject , setAllSubject] = useState([]);

        useEffect(() => {
            const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333"; // Define apiUrl here
        
            async function getAllSubject() {
                let value = await axios.get(`${apiUrl}/subject`); // Use apiUrl here
                setAllSubject(value.data);
            }
            getAllSubject();
        }, []);
        


       return (
             <>
                <div id={style.displayBoxHeadingBox}>
                <h2>List Of Practise Tests</h2>
                     <p>(These are the practise tests to improve student performance)&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Total number of test:{allSubject.length}</p>
                </div>
                <div id={style.tableBoxdetails}>
                   <table style={{borderTop:"3px solid black"}}>
                   {
                    allSubject.map((data , i) => {
                        return (                            
                            <tr>
                            <td>
                            <div id={style.title}><div id={style.testicon}><img src={testicon}></img></div>
                            <h1>{data.subject_name}</h1>
                            <br></br><p>Total Question : 25&ensp;&ensp;Created on :{data.subject_date}</p>
                                    
                            </div>
                            </td>
                              <td><div id={style.subjectButton}>
                                   <NavLink exact to={`/StudentDashboard/TestPractise/${data.id}`}> 
                                     <button>Start Test</button>
                                   </NavLink>
                              </div></td></tr>
                         
                        );
                    })
                }
                           
                    </table>
                </div>


             </>
       );
   }

  export default Subject;