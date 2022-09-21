const HeaderCourse = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const PartContentCourse = (props) => {
  return (
    <div>
      <p>
      {props.name} {props.exercises}      
      </p>
    </div>
  )
}

const ContentCourse = (props) => {
  return (
    <div>
    <PartContentCourse name={props.parts[0].name} exercises={props.parts[0].exercises}/>
    <PartContentCourse name={props.parts[1].name} exercises={props.parts[1].exercises}/>
    <PartContentCourse name={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

const TotalExercises = (props) => {
  let total = 0
  props.parts.forEach(part => {total += part.exercises})
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
    const parts = [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]

  return (
    <div>
      <HeaderCourse course={course}/>
      <ContentCourse parts={parts}/>
      <TotalExercises parts={parts}/>
    </div>
  )
}

export default App