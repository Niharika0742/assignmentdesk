

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams ,NavLink } from "react-router-dom";

 import style from "../StudentDashboard.module.css";
   
function Exam() { 
 
    let { category } = useParams();

    const [allExam, setAllExam] = useState([]);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333"; // Define apiUrl here
    
        async function getAllExams() {
            let value = await axios.get(`${apiUrl}/exam`); // Use apiUrl here
            setAllExam(value.data);
        }
        getAllExams();
    }, []);
    

    return (
        <>
            <div id={style.displayBoxHeadingBox}>
                <h1>All {category} Exam</h1>
            </div>  
            {  
                allExam.map((data, i) => {  
                    if(data.exam_name === category) 
                    return (
                        <div id={style.displayBoxExamBox} key={i}>
                            <div id={style.div1}> <span>{data.exam_name}</span> </div>
                            <div id={style.div2}> <span>Exam ID: {data.id}</span> </div>
                            <div id={style.div2}> <span>Exam Description: {data.exam_desc}</span> </div>
                            <div id={style.div3}><span>Pass Marks:{data.exam_passMarks}</span> </div>
                            <div id={style.div4}><span>Total Marks:{data.exam_marks}</span></div>
                            <div id={style.div5}>
                              <NavLink exact to={`/StudentDashboard/Exam/${data.id}`}>
                                 <button>Go to Exam</button> 
                               </NavLink> 
                            </div>   
                        </div>
                    );

                    return <React.Fragment key={i}></React.Fragment>

                })
            } 
        </> 
    );
}
export default Exam; 