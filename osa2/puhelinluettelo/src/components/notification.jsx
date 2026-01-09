
// const notifStyle = {
//   backgound:'lightgray', 
//   fontSize: '20pt', 
//   fontStyle: 'bold',
// }

// const successStyle = {
//   ...notifStyle,
//   color:'green', 
//   border: '3px solid green',
// }

// const errorStyle = {
//   ...notifStyle,
//   color:'red', 
//   border: '3px solid red',
// }

const Notification  = ({msg, style}) => {
  if (msg === null || msg =='') {
    console.log('return null');
    return null
  }
  console.log('render ' + msg + ' ' + style);
    
  return (
      <div className={style}>
          {msg}
      </div>
  )  

export default Notification
//export {Notification, successStyle, errorStyle}