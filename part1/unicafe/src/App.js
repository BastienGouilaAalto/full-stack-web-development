import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  return(
    <div>
      {props.name} {props.value}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodReview = () => {
    console.log("button good clicked")
    setGood(good + 1)
  }
  const neutralReview = () => {
    console.log("button neutral clicked")
    setNeutral(neutral + 1)
  }
  const badReview = () => {
    console.log("button bad clicked")
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button        
        onClick={goodReview}        
        text='good'      
      />      
      <Button        
        onClick={neutralReview}        
        text='neutral'      
      />           
      <Button        
        onClick={badReview}
        text='bad'/>  
      <h2>statistics</h2>
      <Statistics name={'good'} value={good}/>
      <Statistics name={'neutral'} value={neutral}/>
      <Statistics name={'bad'} value={bad}/>
    </div>
  )
}

export default App