import './testContainer.css'
import Jabber from 'jabber';
import {useEffect, useRef, useState } from 'react';
const TestContainerModified=({text})=>{

   const [textArray,setTextArray]=useState(text.split('.').join('s').split(' ').join(' *').split('*'));
   const [currentIndex,setCurrentIndex]=useState(0);
   const [x,setX]=useState(0);
   const countRef=useRef(null);
   var [timerFlag,setTimerFlag]=useState(false)
   var flag=0;
   var timer={
       countdown:0,
       sec:0,
       min:0
   };
   useEffect(()=>{   
       const showCurrent=document.getElementsByClassName('text_value');
       showCurrent[currentIndex].classList.add('highlight');
       if(currentIndex!==0){
           showCurrent[currentIndex-1].classList.remove('highlight')
       }
       if(currentIndex===0){
           showCurrent[showCurrent.length-1].classList.remove('highlight');
       }
   },[currentIndex]);

  const startTimer=()=>{
       countRef.current=setInterval(countBegin,[1000]);
  }
  
  const countBegin=()=>{
    setX(x=>x+1);
    timer.countdown=timer.countdown+1;
    console.log(timer.countdown);
    timer.sec= (timer.countdown%60) < 10 ? '0'+timer.countdown%60 : timer.countdown%60;
    timer.min =timer.countdown/60 <10 ? '0'+ Math.floor(timer.countdown/60) :Math.floor(timer.countdown/60);
    document.getElementById('timerSec').innerHTML= `${timer.sec}`;
    document.getElementById('timerMin').innerHTML=`${timer.min}`+ ":";
  }

  const showResults=()=>{
      const timeTaken=x;
      document.getElementById('testContainer_results_data').innerHTML=`Speed from last test :`+`${Math.floor((textArray.length*60)/timeTaken)}`+` wpm`;
      setX(0);
      document.getElementById('timerSec').innerHTML= `00`;
      document.getElementById('timerMin').innerHTML=`00:`;
      clearInterval(countRef.current);
      setTimerFlag(false);
  }

   const changeText=(e)=>{
      if(e){e.preventDefault();}
      const classes=document.getElementsByClassName('text_value');
      for(var i=0;i<classes.length;i++){
          classes[i].classList.remove('green');
      }
      const jabber=new Jabber;
      flag=1;
      setTextArray(jabber.createParagraph(30).split('.').join('s').split(' ').join(' *').split('*'));
  }

  // handle the input and change the color accorgdingly 
 const handleChange=(e)=>{
     e.preventDefault();
    if(!timerFlag) {setTimerFlag(true); startTimer({type:true})}
     const value=e.target.value;
     
     if(value[value.length-1]===" "){
         const valuesArray=document.getElementsByClassName('text_value');
         
         if(currentIndex==textArray.length-1){
            const lastValue= value.slice(0,value.length-1);
            if(valuesArray[currentIndex].innerHTML===lastValue){
                valuesArray[currentIndex].classList.add("green");
                e.target.value="";
                showResults();
                changeText();
            }
            else {e.target.value=""; return}
        }
        else if(valuesArray[currentIndex].innerHTML===value){
             valuesArray[currentIndex].classList.add("green");
             e.target.value="";
         }
         else if(valuesArray[currentIndex].innerHTML!==value) {
             console.log("value not matched",currentIndex,value);

               e.target.value="";
                return;
            }
            if(flag){setCurrentIndex(0); flag=0;}
            else {setCurrentIndex(currentIndex+1);}
         } 
         
     }


   return (
       <div className="testContainer">
           <div className="testContainer_timer">
               <span id="timerMin">00:</span>
               <span id="timerSec">00</span>
           </div>
           <div className="testContainerResults">
               <span id="testContainer_results_data"></span>
               </div>
          <div className="testContainer_paragraph">
              {textArray.map(text=>(
                  <pre key={text} className="text_value">{text}</pre>
              ))}
          </div>
          <div className="testContainer_inputField">
           <input id="testContainer_inputField" placeholder="Start Typing Here ......"onChange={handleChange} autoFocus/>    
           </div>
           <button onClick={changeText}>New</button>
       </div>
   )
}
              
export default TestContainerModified;