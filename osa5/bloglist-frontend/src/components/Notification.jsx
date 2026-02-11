
const Notification  = ({msg, style}) => {
  if (msg === null || msg =='') {
    return null
  }
  console.log('render ' + msg + ' ' + style);
    
  return (
      <div className={style}>
          {msg}
      </div>
 ) 
}  

export default Notification