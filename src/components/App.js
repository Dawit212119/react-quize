
import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';  
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import Progress from './Progress';
import FinishScreen from './finishScreen';
// import Timer from './Timer';

const initialState={question:[],
  status:'',
  index:0,
  answer:null,
  points:0,
   highscore:0,
   second:null,
} 
 const SECS_PER_QUESTIONS=30;
function reducer(status,action){
      switch(action.type){
          case 'dataReceived':
          return { 
            ...status, question: action.payload,
            status:'ready'
          } 

          case 'dataFailed':
            return {
              ...status, status:'error'
            }
           case 'start':
            return {
              ...status,status:'active',second:status.question.length * SECS_PER_QUESTIONS
            }
               case 'newAnswer':   

               const theQuestion=status.question.at(status.index)
               return {
                  ...status,answer:action.payload,
                  points:  action.payload=== theQuestion.correctOption ?   status.points + theQuestion.points : status.points
                }

                case 'next':
                  return {
                    ...status, index:status.index+ action.payload,answer:null
                  }
                case 'finish':
                  return {
                    ...status, status:'finish', highscore:status.points>status.highscore?status.points:status.highscore
                  }
                  case 'restart':
                    return  {
                      ...status, status:'ready',answer:null,points:0,highscore:0,index:0
                    }
                    case 'tick':
                     return {
                        ...status,  second:status.second - 1
                        , status:status.second===0 ? 'finish' : status.status
                     
                      } 

           default:   throw new Error('action unknown')
      }     

}








function App() {
      const [state,dispatch]=useReducer(reducer,initialState)
         const {question,status,index,answer,points,highscore,second}=state;
         const numQuestions=question.length;
    const totalpoints=question.reduce((prev,cur)=>prev+cur.points,0)





         console.log(question);
         console.log(question[2])
         console.log(points);
    useEffect(function(){
        // fetch('http://localhost:8000/questions')
       //  .then(res=>res.json()).then(data=>console.log(data[0]))
      //  const pre=data[0];
      
           async function Ques(params) {
             
            try {

            const res=  await  fetch('http://localhost:8000/questions');
           const  data= await   res.json();
           dispatch({type:'dataReceived', payload:data})
           console.log(data[0]);
           const par=data[0];
           console.log(par.options)
          


           }catch(err){
            
            dispatch({type:'dataFailed'}

            )
          };


    }  
    Ques();

  },[]);
  












  return (   
    <div className='App'>
    <Header/>

    <Main> 
    {status==="loading" && <Loader/>}
    {status === "error" && <Error/>}
    {status === "ready" && <StartScreen dispatch={dispatch} numQuestions={numQuestions}/>}
       {status === "active" &&
               (
       <>  
       <Progress totalpoints={totalpoints} answer={answer} index={index} points={points}   numQuestions={numQuestions}      />
       <Question question={question[index]} dispatch=
       {dispatch} second={second}    answer={answer}  index={index}  numQuestion={numQuestions}  />   
       
       </>
               )
       }

       {status==='finish' &&  
        <FinishScreen dispatch={dispatch} points={points} highscore={highscore}  totalpoints={totalpoints}  />  }

    </Main>
    </div>
  );
}

export default App;
