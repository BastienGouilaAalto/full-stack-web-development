const HeaderCourse = (props) => {
  return (
    <div>
      <h1>
        {props.name}
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
      <PartContentCourse name={props.part1.name} exercises={props.part1.exercises}/>
      <PartContentCourse name={props.part2.name} exercises={props.part2.exercises}/>
      <PartContentCourse name={props.part3.name} exercises={props.part3.exercises}/>
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
    const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }

  return (
    <div>
      <HeaderCourse name={course}/>
      <ContentCourse part1={part1} part2={part2} part3={part3}/>
      <TotalExercises total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App