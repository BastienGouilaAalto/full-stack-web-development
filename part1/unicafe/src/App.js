import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>
          {props.text}
      </td>
      <td>
          {props.value} {props.unitStr}
      </td>
    </tr>
    )
}
  
const Statistics = (props) => {
  console.log(props.clicks)
  if(props.clicks[props.clicks.length - 1]  === 0){
    return <div>
      <p>
        No feedback given
      </p>
    </div>
  }
    return(
      <div>
        <table>
          <tbody>
            <StatisticsLine text="good" value={props.clicks[0]}/>
            <StatisticsLine text="neutral" value={props.clicks[1]}/>
            <StatisticsLine text="bad" value={props.clicks[2]}/>
            <StatisticsLine text="all" value={props.clicks[3]}/>
            <StatisticsLine text="average" value={(props.clicks[0] * 1 + props.clicks[2] * -1) / props.clicks[3]}/>
            <StatisticsLine text="positive" value={props.clicks[0] / props.clicks[3] * 100} unitStr={'%'}/>
          </tbody>
        </table>
      </div>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAllClicks] = useState(0)

  const goodReview = () => {
    console.log("button good clicked")
    setAllClicks(allClicks + 1)
    setGood(good + 1)
  }
  const neutralReview = () => {
    console.log("button neutral clicked")
    setAllClicks(allClicks + 1)
    setNeutral(neutral + 1)
  }
  const badReview = () => {
    console.log("button bad clicked")
    setAllClicks(allClicks + 1)
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
        <Statistics clicks={[good, neutral, bad, allClicks]}/>
    </div>
  )
}

export default App