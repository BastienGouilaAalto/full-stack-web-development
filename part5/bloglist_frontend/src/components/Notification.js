const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if(message[1].includes('NOTIFICATION')){
    return (
      <div className='notification'>
        {message[0]}
      </div>
    )
  }
  else{
    return (
      <div className='error'>
        {message[0]}
      </div>
    )
  }
}

export default Notification