import { useContext } from 'react'
import AnecdoteContext from '../AnecdoteContext'

const Notification = () => {
  const { notification, notificationDispatch } = useContext(AnecdoteContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification.show) return null
  else {
    setTimeout(function() { 
      notificationDispatch({ type:'HIDE', payload: { show: false, msg: '' } })
    }, 5000)
  }

  return (
    <div style={style}>
      { notification.payload?.msg }
    </div>
  )
}

export default Notification
