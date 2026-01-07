const Part    = (props) => { return ( <p>{props.part.name} {props.part.exercises} </p> )}
const Header  = (props) => { return ( <h1>{props.hdr.name}</h1> )}
const Content = (props) => { 
  const parts = props.course.parts;
  parts.map(p=> <Part part = {p}/>)
    return ( 
      <div>
        {parts.map(p => <Part part = {p}/>)}
      </div>      
  )}

const Total = (props) => { 
    var sum = eval(props.course.parts.map(i=>i.exercises).join('+'))
    return ( <p><b>Number of exercises {sum}</b></p> )}

const Course  = (props) => { 
    //console.log(props);
  return ( <div>
    <Header  hdr    = {props.course}/>
    <Content course = {props.course} />
    <Total   course = {props.course}/>
    </div>)
}

export default Course