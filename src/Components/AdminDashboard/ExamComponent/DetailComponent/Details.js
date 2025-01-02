
   import style from "../../SubjectComponent/Subject.module.css";

   import axios from "axios";

   import {useEffect , useState} from "react";
   import {useHistory , useParams} from "react-router-dom";

    
    function Details(){
        
        const {id} = useParams();

        const [exam  , setExam] = useState({
            exam_name:"",
            exam_desc:"",
            exam_level:"",
            exam_passMarks:"",
            exam_totalQuestion:"",
            exam_marks:"",
            exam_date: "",
            exam_submission:""
        });

        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333";

        useEffect(() => {
            async function getExamDetails() {
                // Use apiUrl instead of hardcoded URL
                const value = await axios.get(`${apiUrl}/Exam/${id}`);
                setExam(value.data);
            }
            getExamDetails();
        }, [id, apiUrl]);  // Add apiUrl to the dependency array
    
   // -------------------------Go back function---------------------------------------
     
      let history = useHistory();
    
      function handleGoBack(){
          history.push("/AdminDashboard/Exam");
      }


        return (
            <>
                <div id={style.displayHeadingBox}> 
                     <h2>Test Details</h2>    
                     <div id={style.addSubjectBox}>
                       <button onClick={handleGoBack}>Go Back</button>
                   </div> 
                 </div>

                 <div id={style.tableBoxdetails}>
                     <table style={{borderCollapse:"collapse"}}>
                              <tr>
                                <th id={style.center}>Test Name</th>
                                <td id={style.center}> {exam.exam_name} </td>
                             </tr>

                              <tr>
                                <th id={style.center}>Test Description</th>
                                <td id={style.center}> {exam.exam_desc} </td>
                              </tr>
                              <tr>
                                  <th id={style.center}>Test Level</th>
                                  <td id={style.center}> {exam.exam_level} </td>
                               </tr>
                               <tr>
                                  <th id={style.center}>Total No of Question</th>
                                  <td id={style.center}> {exam.exam_totalQuestion} </td>
                               </tr>
                               <tr>
                                  <th id={style.center}>Total Marks</th>
                                  <td id={style.center}> {exam.exam_marks} </td>
                               </tr>
   <tr>
                                  <th id={style.center}>Minimum Score Required</th>
                                  <td id={style.center}> {exam.exam_passMarks} </td>
                               </tr>
                               <tr>
                                  <th id={style.center}>Test Starts from</th>
                                  <td id={style.center}> {exam.exam_begin} {exam.time_begin}</td>
                               </tr>
                               <tr>
                                  <th id={style.center}>Test Ends At</th>
                                  <td id={style.center}> {exam.exam_Ends}{exam.time_ends} </td>
                               </tr>
                         </table>
                     </div>

                    
            </>
        );
    }

    export default Details;