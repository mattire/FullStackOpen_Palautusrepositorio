import { act, useState } from 'react'

const Button = ({content, onClick}) => <button onClick={onClick}>{content}</button>

const StatisticLine = ({text, value}) => {
  return (<tr><td>{text}</td><td>{value}</td></tr>)
}

const Statistics = ({good, neutral, bad}) => {
  var sum = good + neutral + bad;
  if(sum==0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  const all = good + neutral + bad;
  var avg = Math.round(1000* (good-bad)/all)/1000
  var pos = 100* Math.round(1000* (good)/all)/1000 + " %"
  return (
  <div>
    <table>
      <tbody>
      <StatisticLine text={"Good"}     value={good} />
      <StatisticLine text={"Neutral"}  value={neutral} />
      <StatisticLine text={"Bad"}      value={bad} />
      <StatisticLine text={"All"}      value={all} />
      <StatisticLine text={"Average"}  value={avg} />
      <StatisticLine text={"Positive"} value={pos} />
      </tbody>
    </table>
  </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good   , setGood   ] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad    , setBad    ] = useState(0)
  // good, neutral, bad
  const getGood     = (good, neutral, bad) =>  good;
  const getBad      = (good, neutral, bad) =>  bad;
  const getNeutral  = (good, neutral, bad) =>  neutral;
  const getSum      = (good, neutral, bad) =>  good + neutral + bad;
  const getAverage  = (good, neutral, bad) =>  {
    if(good + neutral + bad==0) return NaN;
    return (good - bad)/(good + neutral + bad)
  };
  const getPositive = (good, neutral, bad) =>  {
    if(good + neutral + bad==0) return NaN;
    return good/(good + neutral + bad)
  };

  return <div>
    <h1>Give feedback</h1>
    <Button content={"Good"}    onClick={()=> setGood    (good + 1)}/>
    <Button content={"Neutral"} onClick={()=> setNeutral (neutral  + 1)}/>
    <Button content={"Bad"}     onClick={()=> setBad     (bad  + 1)}/>
    <h1>Statistics</h1>    
    <Statistics good = {good} neutral={neutral} bad={bad}/>
  </div>
}

export default App