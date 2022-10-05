const HeaderCourse = ({name}) => {
  return (
      <h1>
        {name}
      </h1>
  )
}

const PartContentCourse = ({part}) => {
  return (
      <p>
      {part.name} {part.exercises}      
      </p>
  )
}

const ContentCourse = ({parts}) => {
  return (
    <div>
      {parts.map(part => (
        <PartContentCourse key={part.id} part={part}/>
      ))}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
    <HeaderCourse name={course.name}/>
    <ContentCourse parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App