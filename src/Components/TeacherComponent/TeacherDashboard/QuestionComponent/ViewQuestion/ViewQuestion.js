

import axios from "axios";

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import style from "./StudentDashboard.module.css";

function ViewQuestion() {

    // ---------------------------------------------------------
    let { id } = useParams();
    let { category } = useParams();

    const [allQuestions , setAllQuestions] = useState([]);

    let count=0;

    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333";

useEffect(() => {
    async function getAllQuestions() {
        let value = await axios.get(`${apiUrl}/question`); // Use apiUrl here
        setAllQuestions(value.data);
    }
    getAllQuestions();
}, []);

const [updatedQ, setUpdatedQ] = useState({
    question_name: "",
    option_one: "",
    option_two: "",
    option_three: "",
    option_four: "",
    question_answer: "",
    exam_id: id,
    subject_name: ""
});

async function onTextFieldChange(e, qid) {
    let value = await axios.get(`${apiUrl}/question/${qid}`); // Use apiUrl here
    setUpdatedQ(value.data);
}

const [questions, setQuestions] = useState([]);
const [check, setCheck] = useState();

async function updateQuestion(e) {
    for (let i = 0; i < allQuestions.length; i++) {
        if (parseInt(allQuestions[i].id) === parseInt(e)) {
            setUpdatedQ(allQuestions[i]);
        }
    }
    await axios.put(`${apiUrl}/question/${e}`, updatedQ); // Use apiUrl here
    setCheck(true);
}

let history = useHistory();
if (check) return <ViewQuestion />;

function handleGoBack() {
    history.push(`/TeacherDashboard/Question/${id}`);
}

    return (
        <>
            <div id={style.displayHeadingBox}> 
                  <h2>Test Details</h2>    
                  <div id={style.addSubjectBox}>
                    <button onClick={handleGoBack}>Go Back</button>
                </div> 
              </div>
            {
                 
                allQuestions.map((data , i) => {
                    if(parseInt( data.exam_id ) === parseInt(id)){
                        count++;
                    return (
                        <div id={style.displayBoxQuestionBox} key={i}>
                        <div id={style.divQuestion}> <span></span>&nbsp;<input type="text" onChange={(e) => onTextFieldChange(e)} name="question_name"style={{width:700,height:100}}value={data.question_name} contentEditable></input></div>
        
                        <div>
                            <label htmlFor="option1">A)</label>&nbsp;
                            <input type="text" onChange={(e) => onTextFieldChange(e,data.id)} name="option_one" value={data.option_one}/>
                        </div>
        
                        <div>
                            <label htmlFor="option1">B)</label>&nbsp;
                            <input type="text" onChange={(e) => onTextFieldChange(e,data.id)} name="option_two" value={data.option_two}/>
                        </div>
        
                        <div>
                            <label htmlFor="option1">C)</label>&nbsp;
                            <input type="text" onChange={(e) => onTextFieldChange(e,data.id)} name="option_three" value={data.option_three}/>
                        </div>
        
                        <div>
                            <label htmlFor="option1">D)</label>&nbsp;
                            <input type="text" onChange={(e) => onTextFieldChange(e,data.id)} name="option_four" value={data.option_four}/>
                        </div>
                        <div>
                        <label htmlFor="question_answer">Correct Option is</label>&nbsp;
                        <select onChange={(e) => onTextFieldChange(e)}  name="question_answer" style={{marginTop:15}} required>
                        <option value="0">{data.question_answer}</option>
                        <option value="option A">option A</option>
                        <option value="option B">option B</option>
                        <option value="option C">option C</option>
                        <option value="option D">option D</option>
                        </select>
                        </div>
                        <div>
                        <button onClick={()=>updateQuestion(data.id)}>Edit</button>
                        </div>
                    </div>
                    );
                  }
                  return <React.Fragment key={i}></React.Fragment>
                })
            }
            
        </>
    );
}

export default ViewQuestion;