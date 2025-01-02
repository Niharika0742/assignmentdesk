
    
    import style from "../../SubjectComponent/Subject.module.css";

      import {useState} from "react";

      import {useHistory , useParams} from "react-router-dom";
import axios from "axios";

      
      function AddQuestion(){

        const {id} = useParams();

         const [question , setQuestion] = useState({
            question_name: "",
            option_one: "",
            option_two: "",
            option_three: "",
            option_four: "",
            question_answer: "",
            exam_id: id,
            subject_name:""
         });

          function onInputChange(e){
                   setQuestion({
                       ...question ,
                       [e.target.name] : e.target.value
                   });
          }

           
            let history = useHistory();
           
            function handleGoBack(){
                history.push(`/TeacherDashboard/Question/${id}`);
            }


            const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333";

            async function addnewQuestion() {
                await axios.post(`${apiUrl}/question`, question); // Use apiUrl here
                history.push(`/TeacherDashboard/Question/${id}`);
            }
            



          return (
              <>
                <div id={style.displayHeadingBox}> 
                            <h2>Enter Question</h2>     
                         </div>

                     <div id={style.addBox} className={style.addQuestion}>   
                         <label >Question Name </label>
                         <input onChange={(e) => onInputChange(e)} 
                         name="question_name" style={{height:100}}
                          type="textbox" placeholder="Enter Question" required/> 

                        <label >Enter Option A </label>
                        <input onChange={(e) => onInputChange(e)} 
                         name="option_one"
                         type="text" placeholder="Enter Option A" required/> 

                        <label >Enter Option B</label>
                        <input onChange={(e) => onInputChange(e)} 
                        name="option_two"
                           type="text" placeholder="Enter Option B" required /> 

                        <label >Enter Option C</label>
                        <input onChange={(e) => onInputChange(e)} 
                        name="option_three"
                          type="text" placeholder="Enter Option C" required/> 

                        <label >Enter Option D</label>
                        <input onChange={(e) => onInputChange(e)}  
                        name="option_four"
                         type="text" placeholder="Enter Option D" required/> 

                        <label >Choose correct option</label>
                        <select onChange={(e) => onInputChange(e)} name="question_answer" style={{marginTop:15}} required>
                        <option value="0">choose</option>
                        <option value="a">option A</option>
                        <option value="b">option B</option>
                        <option value="c">option C</option>
                        <option value="d">option D</option>
                        </select>
                       <div id={style.buttonBox}>
                         <button onClick={addnewQuestion} >Add</button>
                         <button onClick={handleGoBack}>close</button>
                       </div>

                   </div>
              </>
          );
      }

      export default AddQuestion;