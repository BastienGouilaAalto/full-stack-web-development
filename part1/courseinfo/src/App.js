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
      {props.part.name} {props.part.exercises}      
      </p>
    </div>
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
    <div>
      <p>Number of exercises {total}</p>
    </div>
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