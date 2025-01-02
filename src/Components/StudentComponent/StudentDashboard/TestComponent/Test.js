

import axios from "axios";

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
 
import style from "../StudentDashboard.module.css";
import timere from "../../../../images/timer.png"

function Test() { 

    // ---------------------------------------------- -----------
    let { id } = useParams();
    let { category } = useParams();

    const [allQuestions , setAllQuestions] = useState([]);
    const [alldata , setUserdata] = useState([]);

    const [test , setTest] = useState({
        exam_name:"",exam_desc:"",exam_level:"",exam_passMarks:"",exam_totalQuestion:"",exam_marks:"",exam_date:""
    });
     useEffect(()=>{    
        async function getAllusers(){
            let value = await axios.get(`http://localhost:3333/Exam/${id}`);
            setTest(value.data);
            setMinutues(value.data.exam_totalQuestion)
        }
            getAllusers();
     },[id]);
     useEffect(() => {
        async function getAlldata(){
            let value = await axios.get(`http://localhost:3333/user/${category}`);
            setUserdata(value.data);
        }
        getAlldata();
    },[]);
    useEffect(() => {
        async function getAllQuestions(){
            let value = await axios.get("http://localhost:3333/question");
            setAllQuestions(value.data);
        }
        getAllQuestions();
    },[]);

    const [answer,setAnswer]  = useState({
        ans1:"",ans2:"",ans3:"",ans4:"",ans5:"",ans6:"",ans7:"",ans8:"",ans9:"",ans10:"",ans11:"",ans12:"",ans13:"",ans14:"",ans15:"",ans16:"",ans17:"",ans18:"",ans19:"",ans20:"",ans21:"",ans22:"",ans23:"",ans24:"",ans25:""
    });
    const [correctanswer,setCorrectanswer] =useState({
        ans1:"",ans2:"",ans3:"",ans4:"",ans5:"",ans6:"",ans7:"",ans8:"",ans9:"",ans10:"",ans11:"",ans12:"",ans13:"",ans14:"",ans15:"",ans16:"",ans17:"",ans18:"",ans19:"",ans20:"",ans21:"",ans22:"",ans23:"",ans24:"",ans25:""
    });
    
    let count = 0;

    function onRadioButtonChange(e,count){
    let ans=e.target.value;
    var pieces=ans.split("@#$%");
    setAnswer({
        ...answer,
        [e.target.name] : pieces[1]
    });
    setCorrectanswer({
        ...correctanswer,
        [e.target.name] : pieces[0]
    });
    }
    async function submitTest()
    {   
        let score = 0;
        let status = "";
        for(let i=1;i<=count;i++){
            let str="ans"+i;
            
            if(answer[str]==correctanswer[str]){
                score++;
            }
            }
        
         if(score >=test.exam_passMarks ) status="Pass";
         else status = "Fail";

        var date = new Date();
        var d =  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() ;
        var t =  date.getHours() + ":" + date.getMinutes() +  ":" + date.getSeconds() ;
        var m=parseInt(test.exam_totalQuestion)-parseInt(minutes);
        var s=60-parseInt(seconds);
        if(s===60){
            s="00";
            m--;
        }

   
       let data={
         "result_status": status,
         "result_score": score,
         "student_id":alldata.student_id,
         "exam_date": d+" "+t,
         "total_marks": test.exam_marks,
         "exam_id": id,
         "exam_name": test.exam_name,
         "exam_passmark":test.exam_passMarks,
         "total_Question": test.exam_totalQuestion,
         "time_spent":m+":"+s
       }; 
 
        await axios.post("http://localhost:3333/result" , data);
        clearInterval(timer);
        history.push(`/StudentDashboard/Result/${category}`); 
    }
        

        const [seconds,setSeconds]=useState(0);
        const [minutes,setMinutues]=useState(20);
        var timer;
        useEffect(()=>{
            timer=setInterval(()=>{
                if(minutes===0 && seconds===0){
                    submitTest();   
                     return ()=>clearInterval(timer);
                    }
                setSeconds(seconds-1);
                if(seconds===0){
                    setMinutues(minutes-1);
                    setSeconds(59);
                }
                
            },1000)
            return ()=>clearInterval(timer);
        })


     let history = useHistory();

    return (
        <>  
            <div id={style.displayBoxQuestionHeadingBox} style={{width:"70%"}}>
                <h1>{test.exam_name} Test</h1>
                <p>Duration : {test.exam_totalQuestion} Min&ensp;&ensp;
                Level : {test.exam_level}&ensp;&ensp;
                Total Question : {test.exam_totalQuestion}&ensp;&ensp;
                Passing Score : {test.exam_passMarks}&ensp;&ensp;
                </p>
            </div>
            <div id={style.displaytime}><h1>Time :{minutes<10?"0"+minutes:minutes}:{seconds<10?"0"+seconds:seconds}</h1>
</div>
            {
                 
                allQuestions.map((data , i) => {
                    if(parseInt( data.exam_id ) === parseInt(id)){
                        count++; 
                    return (
    
                        <div id={style.displayBoxQuestionBox} key={i}>
                        <table>
                        <tr><div id={style.divQuestion}> <span>{data.question_name}</span> </div></tr>
                        <tr>
                            <input onChange={(e) => onRadioButtonChange(e)} value={data.question_answer+"@#$%a"+"@#$%"+data.id}
                            id={style.option1} name={"ans"+count}   type="radio" />  
                            <label htmlFor="option1">{data.option_one}</label>
                        </tr>
         
                        <tr>  
                            <input onChange={(e,count) => onRadioButtonChange(e)} value={data.question_answer+"@#$%b"+"@#$%"+data.id}
                            id={style.option2} name={"ans"+count} type="radio" /> 
                            <label htmlFor="option2">{data.option_two}</label>
                        </tr>
                        <tr>
                            <input onChange={(e,count) => onRadioButtonChange(e)} value={data.question_answer+"@#$%c"+"@#$%"+data.id}
                            id={style.option3} name={"ans"+count}  type="radio" /> 
                            <label htmlFor="option3">{data.option_three}</label>
                        </tr>
                        <tr>
                            <input onChange={(e,count) => onRadioButtonChange(e)} value={data.question_answer+"@#$%d"+"@#$%"+data.id}
                            id={style.option4} name={"ans"+count}  type="radio" /> 
                            <label htmlFor="option4">{data.option_four}</label>
                        </tr>
                        </table>
                    </div>
                    );
                  }
                  return <React.Fragment key={i}></React.Fragment>
                })
            }
            <div id={style.submitExam}><button onClick={submitTest}>Submit Exam</button></div>
        </>
    ); 
}

export default Test