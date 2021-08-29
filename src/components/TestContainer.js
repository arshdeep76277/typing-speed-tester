import './testContainer.css'
import Jabber from 'jabber';
import {useRef, useState } from 'react';
const TestContainer=({text})=>{
   const [textArray,setTextArray]=useState(text.split('.').join('s').split(' ').join(' *').split('*'));
   const [currentIndex,setCurrentIndex]=useState(0);
   const [classArray,setClassArray]=useState([]);
   const [x,setX]=useState(0);
   const countRef=useRef(null);
   var [timerFlag,setTimerFlag]=useState(false)
   var flag=0;
   var timer={
       countdown:0,
       sec:0,
       min:0
   };

  const startTimer=()=>{
       countRef.current=setInterval(countBegin,[1000]);
  }
  
  const countBegin=()=>{
    setX(x+1);
    timer.countdown=timer.countdown+1;
    console.log(timer.countdown);
    timer.sec= (timer.countdown%60) < 10 ? '0'+timer.countdown%60 : timer.countdown%60;
    timer.min =timer.countdown/60 <10 ? '0'+ Math.floor(timer.countdown/60) :Math.floor(timer.countdown/60);
    document.getElementById('timerSec').innerHTML= `${timer.sec}`;
    document.getElementById('timerMin').innerHTML=`${timer.min}`+ ":";
  }
  const showResults=()=>{
      const accuratelyTyped=classArray.filter(Element=>Element.includes('green'));
      console.log(timer.min,timer.sec);
      document.getElementById('testContainer_results_data').innerHTML=`Speed:`+`${(textArray.length*60/x)}`+`with accuracy ${Math.floor(accuratelyTyped.length*100/textArray.length)}`
      setX(0);
      clearInterval(countRef.current);
      setTimerFlag(false);
      console.log(timer.countdown);
  }

   const changeText=(e)=>{
      if(e){e.preventDefault();}
      const classes=document.getElementsByClassName('text_value');
      for(var i=0;i<classes.length;i++){
          classes[i].classList.remove(classArray[i]);
      }
      const jabber=new Jabber;
      flag=1;
      setClassArray([]);
      setTextArray(jabber.createParagraph(45).split('.').join('s').split(' ').join(' *').split('*'));
  }

  // handle the input and change the color accorgdingly 
 const handleChange=(e)=>{
     e.preventDefault();
    if(!timerFlag) {setTimerFlag(true); startTimer({type:true})}
     const value=e.target.value;
     
     if(value[value.length-1]===" "){
         const valuesArray=document.getElementsByClassName('text_value');
         if(valuesArray[currentIndex].innerHTML===value){
             valuesArray[currentIndex].classList.add("green");
             classArray.push('green');
         }
         else if(currentIndex==textArray.length-1){
            const lastValue= value.slice(0,value.length-1);
            if(valuesArray[currentIndex].innerHTML===lastValue){
                valuesArray[currentIndex].classList.add("green");
                classArray.push('green');
              
            }
            else {
                valuesArray[currentIndex].classList.add('red');
                classArray.push('red');
            }
            showResults(timer.countdown);
            changeText();
         } 
         else {
             valuesArray[currentIndex].classList.add('red');
             classArray.push('red');
         }
         if(flag){setCurrentIndex(0); setClassArray([]); flag=0;}
         else {setCurrentIndex(currentIndex+1);}
         e.target.value="";
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
                  <pre className="text_value">{text}</pre>
              ))}
          </div>
          <div className="testContainer_inputField">
           <input id="testContainer_inputField" placeholder="Start Typing Here ......"onChange={handleChange} autoFocus/>    
           </div>
           <button onClick={changeText}>Try again</button>
       </div>
   )
}
export default TestContainer;