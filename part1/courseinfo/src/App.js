const HeaderCourse = (props) => {
  return (
    <div>
      <h1>
        {props.name}
      </h1>
    </div>
  )
}

const ContentCourse = (props) => {
  return (
    <div>
      <p>
      {props.name} {props.exercises}      
        </p>
    </div>
  )
}

const TotalExercises = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <HeaderCourse name={course}/>
      <ContentCourse name={part1} exercises={exercises1}/>
      <ContentCourse name={part2} exercises={exercises2}/>
      <ContentCourse name={part3} exercises={exercises3}/>
      <TotalExercises total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App