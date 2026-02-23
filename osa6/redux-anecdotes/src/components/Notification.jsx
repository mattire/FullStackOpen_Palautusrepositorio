import { useSelector, useDispatch } from 'react-redux' 
import { notifChange } from '../reducers/notificationReducer' 


const Notification = () => {
  const notif = useSelector(state => state.notification) 
  console.log('notif');
  console.log(notif);
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  return (<div style={style}>render here notification... {notif}</div>)
}

export default Notification
