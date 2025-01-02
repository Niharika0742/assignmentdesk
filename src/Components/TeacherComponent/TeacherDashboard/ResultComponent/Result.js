 
   import axios from "axios";

   import {useEffect , useState} from "react";

   
   import style from "../SubjectComponent/Subject.module.css"
   


    function Result(){

        const [results , setResults] = useState([]);

        useEffect(()=>{
           
           async function getAllResults(){
               let value = await axios.get("http://localhost:3333/result");
               setResults(value.data);
           }
               getAllResults();
        },[]);

        return (
            <>
               <div id={style.displayHeadingBox}> 
                   <h2>Students Performance</h2>     
                </div>

                <div id={style.tableBoxdetails}>
                    <table style={{width:800}}>
                           <tr>
                             <th id="center">Student Id</th>
                             <th id="center">Exam Name</th>
                             <th id="center">Exam Taken</th>
                             <th id="center">Status</th>
                             <th id="center">Score Gained</th>  
                             <th id="center">Total Marks</th>
                             <th id="center">Total Question</th>  
                          </tr>
                            {
                                results.map((data , i) => {
                                    return(
                                          <tr key={i}>
                                              <td>{data.student_id}</td>
                                              <td>{data.exam_name}</td>
                                              <td>{data.exam_date}</td>
                                              <td>{data.result_status}</td>
                                              <td style={{textAlign:"center"}}>{data.result_score}</td>
                                              <td style={{textAlign:"center"}}>{data.total_marks}</td>
                                              <td style={{textAlign:"center"}}>{data.total_Question}</td>
                                          </tr>
                                    );
                                })
                            }
                    
                     </table>
                </div>
            </>
        );
    }

    export default Result;