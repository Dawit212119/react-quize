   
     import Option from "./Option"
   
   export default function  Question({question,answer,dispatch,index,numQuestion,second}){
    console.log(question)
    return (
        <div>        
          
           <h4>{question.question}</h4>
        <Option  question={question} dispatch={dispatch} index={index} answer={answer} second={second}  numQuestion={numQuestion}  />
       </div>
    )
}