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

export default Course