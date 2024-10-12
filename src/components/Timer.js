import { useEffect } from "react";

export default function Timer({dispatch,second}){
   const mins=Math.floor(second / 60);
   const seconds=second % 60; 


  useEffect(function(){

      const id= setInterval(function(){

         dispatch({type:'tick'})

       },[1000])

            return ()=>  clearInterval(id)

  } ,[dispatch])


  return (

      <div className="timer">{mins < 10 && "0"}{mins}:{seconds < 10 && "0"}{seconds}</div>




  )







}