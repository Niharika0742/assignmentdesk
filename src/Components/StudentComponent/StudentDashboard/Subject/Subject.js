
   
   import style from "../StudentDashboard.module.css";

   import {useState , useEffect} from "react";
   import axios from "axios";

   import {NavLink,useParams} from "react-router-dom";
   import testicon from "../../../../images/testicon.jpg"
   /*<p style={{margin:3,fontSize:12}}>( {data.exam_begin} {data.time_begin} <br></br><br></br>
   {data.exam_ends} {data.time_ends} )</p>*/


   function Subject(){
        const {id} = useParams();
        let count=0;
        const [allSubject , setAllSubject] = useState([]);

        useEffect(() => {
            const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333"; // Define apiUrl here
        
            async function getAllSubject() {
                let value = await axios.get(`${apiUrl}/Exam`); // Use apiUrl here
                setAllSubject(value.data);
            }
            getAllSubject();
        }, []);
        

       return (
             <>
                <div id={style.displayBoxHeadingBox}>
                     <h2>List Of Tests</h2>
                     <p>(These tests are evaluated to enhance the student performance)&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Total number of test:{allSubject.length}</p>
                </div>
                <div id={style.tableBoxdetails}>
                   <table style={{borderTop:"3px solid black"}}>
                   {
                    allSubject.map((data , i) => {
                        return (                            
                            <tr>
                            <td>
                            <div id={style.title}><div id={style.testicon}><img src={testicon}></img></div>
                            <h1>{data.exam_name}</h1>
                            <br></br><p>Total Question : {data.exam_totalQuestion}&ensp;&ensp;
                                    Duration : {data.exam_totalQuestion} Min&ensp;&ensp;
                                    Passing Score : {data.exam_passMarks}&ensp;&ensp;
                                    Level : {data.exam_level}&ensp;&ensp;</p>
                                    
                            </div>
                            </td>
                              <td><div id={style.subjectButton}>
                              
                                   <NavLink exact to={`/StudentDashboard/Test/${data.id}/${id}`}> 
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