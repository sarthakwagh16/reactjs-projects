import React, { useRef, useState } from "react";
import "./quiz.css";
import data from "../data";

function Quiz() {
  //use to set access the index of the question
  let [index, setIndex] = useState(0);

  //use to set access the question by providing the index to data array
  let [question, setQuestion] = useState(data[index]);

  //after selecting the option the lock will get true i.e. locked
  //only after selecting the option we can click on the next button
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  //create 4 references to access the dom elements
  //i.e. the options gives
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  //create array of the references for easy access
  let refAns = [option1, option2, option3, option4];

  function checkAns(ele, ans) {
    if (data.length)
      if (lock === false) {
        /*
      firstly it checks if lock==false
      i.e. check wheather no answer has been submitted for the current question.
      */
        if (question.answer === ans) {
          //if ans is right then it add the correct class to it
          ele.target.classList.add("correct");
          //sets lock to true i.e. the ans is submitted for current question
          setLock(true);
          setScore((score) => score + 1);
        } else {
          //if ans is not right then it add the incorrect class to it
          ele.target.classList.add("incorrect");
          setLock(true);

          //then it adds the correct class to the right answer by accessing the correct
          //option from the option array i.e. refAns
          refAns[question.answer - 1].current.classList.add("correct");
          // refAns[question.answer - 1];
          //the above line is used to fetch the correct answer of the question
          // by accessing the index of the question and then add the "corerct" class to it
        }
      }
  }

  function next() {
    //firstly it checks wheather you are at last question or not
    if (index === data.length - 1) {
      //then sets result to true
      setResult(true);
      return 0;
    }
    if (lock === true) {
      //checks wheather the answer for the current question is previously submitted or not
      // if yes then increase the index and move to the next question
      setIndex(++index);
      //by setting the question
      setQuestion(data[index]);

      //unlock the lock(ans is not selected)
      setLock(false);

      //then remove the assigned classes from the dom elements
      refAns.map((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("incorrect");
        return null;
      });
    }
  }

  function reset() {
    setIndex(0);
    setQuestion(data[index]);
    setLock(false);
    setScore(0);
    setResult(false);
  }
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          {" "}
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={option1}
              onClick={(ele) => {
                checkAns(ele, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={option2}
              onClick={(ele) => {
                checkAns(ele, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={option3}
              onClick={(ele) => {
                checkAns(ele, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={option4}
              onClick={(ele) => {
                checkAns(ele, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>next</button>
          <div className="index">
            {index + 1} of {data.length} Qs
          </div>
        </>
      )}

      {/* here i have used turnary operator to check the conditions 
          if the result is true then it will display the score and reset btn 
          else it will display blank element*/}
      {result ? (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>

          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Quiz;
