
import Timer from './Timer';
export default function Option({question,answer,dispatch,index,numQuestion,second}){
   let hasAnswer=answer!==null;

   function handleNext(){
            dispatch({type:'next', payload:1})
           
   }
                console.log(numQuestion)
   function handleFinish(){
    dispatch({type:'finish'})
   }
  return ( 
    <>
  <div className="options">
             {question.options.map((option,index)=>

            ( <button className={` btn btn-option 
                ${index===answer ? "answer" : " "}     
                ${hasAnswer ? index===question.correctOption ? "correct":"wrong" :""}  `}
              
              
              key={option}
              disabled={hasAnswer}
             onClick={()=>dispatch({type:'newAnswer', payload:index })}   >{option}</button>
            ))}



  </div> 
  <Timer dispatch={dispatch} second={second}/>

   {
     hasAnswer ? (index < numQuestion-1 ? 
      <button  className="btn btn-ui" onClick={handleNext}>Next</button>
      :       <button  className="btn btn-ui" onClick={handleFinish}>Finish</button>):""



  }
     

  </>

        )





}