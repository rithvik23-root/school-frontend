import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function First(){
    const location = useLocation();
    const user = location.state?.user.data;
    const role=user.role;
    const[teacher,setTeacher]=useState(null);
    const[questions,setQuestions]=useState();
    const[getQuestions,setGetQuestions]=useState([]);

    useEffect(()=>{

        async function getAllQuestions(){
            const res=await axios.get("http://localhost:8080/api/questions");
            try{
                if(res.status===200){
                setGetQuestions(res.data);
            }}catch(e){
                alert("Cannot Display questions!");
                console.log(e)
            }
        }
        getAllQuestions();
        

    },[]);



    useEffect(()=>{
        if(role==='teacher'){
            setTeacher(true);
        } else if(role==='student'){
            setTeacher(false);
        }
    },[role]);
    function handleQuestionChange(e){
        const c= {question:e.target.value.toString()};
        setQuestions(c);      
    }
    const questionPosted=false;
    async function questionSubmit(e){
        e.preventDefault();
        
        setQuestions("");
        try{
            const response=await axios.post("http://localhost:8080/api/questions",questions);
            if(response.status===201){
                const data=response.data;
                alert("Question Posted!");
            }
            
        }catch(err){
            alert("Post failed!");
            console.log(err);
        }

        
    }

    return(
    <div className='container'>
        {teacher &&(
            <div>
                <form className='form-container' onSubmit={questionSubmit}>
                    <h1 className='form-title'>Post Question!</h1>
                   <div className='form-group'>
                  
                    <textarea autoComplete='off' placeholder='Start Typing...' onChange={handleQuestionChange} required/>
                   </div>
                    
                    <button className='submit-button' type='submit'>Post Question!</button>
                </form>
            </div>
        )}
        {!teacher &&(
            <div className='container'>
                <div className='student'>
                <h1 key={user.email}>Hey,{user.email}</h1>
                <ol className='o'>
                    {
                        getQuestions.map((q)=>(
                            <div>
                                <li key={q.id}>{q.question}</li>
                            </div>
                            
                        ))
                    }
                </ol>
                </div>

                
                
            </div>
        )}
        </div>
)
}
export default First;