const HeaderCourse = ({name}) => {
  return (
      <h2>
        {name}
      </h2>
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

const TotalExercises = ({parts}) => {
  return (
      <b>total of {parts.reduce((sum, part) =>
            {
              sum += part.exercises
              return sum
            }
          , 0)} exercises</b>
  )
}

const Course = ({course}) => {
  return (
    <div>
    <HeaderCourse name={course.name}/>
    <ContentCourse parts={course.parts}/>
    <TotalExercises parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App