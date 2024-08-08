import axios from "axios";
import "./demo.css"
import { useState } from "react";
const App=()=>{  
    const[users,setUsers]=useState([]);
    const[data,setData]=useState({city:""}) 
    const key = "8db4287fa57d42f52b93f12ea03f81d9";
    // const city = data.city;
    const handleChange=(e)=>{
               setData({...data,[e.target.name]:e.target.value})
    } 
    const handleClick=()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=${key}&units=metric`)
        .then(response => { 
          setUsers([response.data]);
        })
        .catch(error => {         
          console.log(error);
        });
             
    }
    return(
    <div className="main">   

           <div className="div-1">
           <h1>Weather Data</h1>
           
            <input className="city" type="text" name="city" value={data.city} onChange={handleChange} placeholder="Enter City Name" />
            <input className="btn" type="button" value="Click me" onClick={handleClick} />            
           {
                      users.map(user=>{return(
                        <div className="data" key={user.id}>
                          <div className="highlight">{user.name}</div>
                          <div><img src={`https://openweathermap.org/img/wn/${user.weather[0].icon}@2x.png`} alt="icon"/></div>
                          <div className="icon">
                          <h2>{user.main.temp} °C </h2>
                            {user.weather[0].main}
                            </div>
                            <table className="center">                                                             
                               <tbody><tr><td>HUMIDITY</td><td>{user.main.humidity}%</td></tr></tbody>
                               <tbody><tr><td>WIND SPEED</td><td>{user.wind.speed}m/s</td></tr></tbody>
                               <tbody><tr><td>VISIBILITY</td><td>{user.visibility/1000}Km</td></tr></tbody>
                               <tbody><tr><td>TEMP. MIN.</td><td>{user.main.temp_min}°C</td></tr></tbody>
                               <tbody><tr><td>TEMP. MAX.</td><td>{user.main.temp_max}°C</td></tr></tbody>
                            </table>                           
                        </div>
                    )})
            }
            </div> 
    </div> 
    );    
}
export default App;