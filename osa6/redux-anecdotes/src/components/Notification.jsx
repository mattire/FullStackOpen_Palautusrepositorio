import { useSelector, useDispatch } from 'react-redux' 
//import { notifChange } from '../reducers/notificationReducer' 


const Notification = () => {
  const notif = useSelector(state => state.notif) 
  console.log('notif');
  console.log(notif);
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if(notif===''){
    return (<div style={style}></div>)
  } else {
    return (<div style={style}>{notif}</div>)
  }
}

export default Notification
