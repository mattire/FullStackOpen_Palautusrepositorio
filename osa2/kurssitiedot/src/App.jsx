//*/
import Course from './Components/Course'
/*/
const Part    = (props) => { return ( <p>{props.part.name} {props.part.exercises} </p> )}
const Header  = (props) => { return ( <h1>{props.hdr.name}</h1> )}
const Content = (props) => { 
  const parts = props.course.parts;
  parts.map(p=> <Part part = {p}/>)
    return ( 
      <div>
        {parts.map(p => <Part key= {p.id} part = {p}/>)}
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
//*/

const App = () => {
  const courses = [
  {
    name : 'Half Stack application development',
    id   : 1,
    parts: [
      {
        name     : 'Fundamentals of React',
        exercises: 10,
        id       : 1
      },
      {
        name     : 'Using props to pass data',
        exercises: 7,
        id       : 2
      },
      {
        name     : 'State of a component',
        exercises: 14,
        id       : 3
      },
      {
          name     : 'Redux',
          exercises: 11,
          id       : 4
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
      {courses.map(c=> <Course key= {c.id}  course = {c}/>)}
    </div>
  )
}

export default App