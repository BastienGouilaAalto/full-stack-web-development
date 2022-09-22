const HeaderCourse = (props) => {
  return (
      <h1>
        {props.course}
      </h1>
  )
}

const PartContentCourse = (props) => {
  return (
      <p>
      {props.part.name} {props.part.exercises}      
      </p>
  )
}

const ContentCourse = (props) => {
  return (
    <div>
    <PartContentCourse part={props.parts[0]}/>
    <PartContentCourse part={props.parts[1]}/>
    <PartContentCourse part={props.parts[2]}/>
    </div>
  )
}

const TotalExercises = (props) => {
  let total = 0
  props.parts.forEach(part => {total += part.exercises})
  return (
      <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <HeaderCourse course={course.name}/>
      <ContentCourse parts={course.parts}/>
      <TotalExercises parts={course.parts}/>
    </div>
  )
}

export default App