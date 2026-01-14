import { useState, useEffect } from 'react'
//import {getByName, getAll} from './services/countries'
import countrieService from './services/countries'

const Filter  = ({all, queryFunc}) => { 
  const [filterTxt, setFilterTxt] = useState([]) 
  const filterTextChanged = (event) => {
    setFilterTxt(event.target.value)
    queryFunc(event.target.value)
  }
  return ( <div>
    find countries: <br/>
        <input 
            value    = {filterTxt}
            onChange = {filterTextChanged}
          />
    </div>)
}

const CountryResult  = ({countryObjRes}) => { 
  if(countryObjRes!=null)
  {
    console.log(countryObjRes);
    
    return (<h1>Shit</h1>)
  } else {
    return ( <div>{"buu"}</div>)
  }
}

function ObjectDisplay({ data }) {
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {String(value)}
        </div>
      ))}
    </div>
  );
}

const Results  = ({filteredResults, showHandler}) => { 
    const resLen = filteredResults.length;
    //debugger
    if(resLen>10){
      return <p>Too many matches, specify another filter</p>
    } 
    else if (resLen > 1 && resLen<=10)
    {
      console.log(JSON.stringify(filteredResults));       
      console.log(filteredResults.map( (r) => r.name.common ));
      return <ul> 
        { filteredResults.map( (r) => <li key={r.name.common}>{r.name.common} <button onClick={()=>{ showHandler(r);}}>Show</button> </li> ) }
      </ul>
    }
    else if (resLen==1){
      var name = filteredResults[0].name.common
      return <h1>{name}</h1>
    }
}

const Languages  = ({langs}) => { return ( 
  //langs.map(l=>(<p>{l}</p>)
    <p1>Shit</p1>
  )}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filteredResults, setFilteredResults] = useState([]) 

  const [countryNameRes, setCountryNameRes] = useState('') 
  const [countryObjRes, setCountryObjRes] = useState(null) 
  
  useEffect(()=>{ countrieService.getAll().then(r => setCountries(r)); }, [])  

  useEffect(()=>{ 
    countrieService.getByName(countryNameRes).then(r => {
      //debugger
      setCountryObjRes(r); 
    })
    }, countryNameRes)  

  const showHandler = (item) => {  
    setFilteredResults([item])
  };

  const queryFunc = (searchStr) => {
    const res = countries.filter(c=> c.name.common.toLowerCase().includes(searchStr.toLowerCase()))    
    setFilteredResults(res)
  }

  const filLen = filteredResults.length
  if(filLen==1) {
    //debugger
    const name = filteredResults[0].name.common
    console.log(name);
    countrieService.getByName(name).then(r => {
      console.log('afadf')
      console.log(r);
      //setCountryObjRes(r); 
    })
    //setCountryNameRes(filteredResults[0].name.common)
  }
  const showFlag = filLen==1;
  var flagUrl = ''
  try {
      console.log(console.log(filteredResults[0].flags)    );    
      flagUrl = filteredResults[0].flags.png
  } catch (error) {
    
  }
  
  return (
    <div>
      <Filter all={countries} queryFunc={queryFunc}></Filter>
      <Results filteredResults={filteredResults} showHandler={showHandler}></Results>
      {/* <CountryResult countryObjRes= {countryObjRes}></CountryResult>       */}
      {showFlag && (
        <div>
          <p1>Capital: {filteredResults[0].capital}</p1><br/>
          <p1>Area: {filteredResults[0].area}</p1>
          <h3>Languages</h3>
          <ObjectDisplay data={filteredResults[0].languages}></ObjectDisplay>
          <img
            src={flagUrl}
            width={160}
          />
        {/* <Languages lang={filteredResults[0].languages}></Languages> */}
        </div>
      )}
      {/* {showFlag && (
        filteredResults[0].languages.map(l=> <p>l</p>)
      )} */}
    </div>
  )
}


export default App