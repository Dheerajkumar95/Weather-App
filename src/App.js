 
import './App.css';
import {useState} from 'react';
function App() {
  let [city,setCity]=useState('')
  let [weatDetails,setweatDetails]=useState()
  let [loading,setloading]=useState(false)
  const currentDate = new Date().toDateString();
  const currentTime = new Date().toLocaleTimeString();
  let getData=(event)=>{
    setloading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'9446e3f88c25021be588589c0beaae57&units=metric'}`)
      .then((res)=>res.json())
      .then((finalRes)=>{
        if(finalRes.cod==="404"){
          setweatDetails(undefined)
        }
        else{
          setweatDetails(finalRes)
        }
        setloading(false)
     })
    event.preventDefault()
    setCity('')
  }
  const formatSunriseTime = (timestamp) => {
    let date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  
  return (
  <>
    <div className = 'w-[100%] h-[100vh] bg-[#1eed17]'>
        
    <div className='max-w-[1320px] mx-auto'>
    
    <h1 className='text-[40px] font-bold py-[50px] text-white'>Weather App</h1>
    
    <form onSubmit={getData}>
    <input type='text' value={city} onChange={(e)=>setCity(e.target.value)} className='w-[300px] h-[45px] p1-3 rounded-lg ' placeholder=' Search City'/><button className='bg-[#3714fa] text-white font-bold p-[10px_20px] rounded-lg'>Click</button></form>

    <div className='w-[400px] mx-auto bg-white shadow-1g mt-[40px] p-[25px] relative rounded-lg' >
  <img src='https://cdn.dribbble.com/users/2973561/screenshots/5757826/loading__.gif' width={600}   className={`absolute left-[0%] rounded-lg  
  ${loading ? '' :'hidden'}`}></img>

    {weatDetails!==undefined
    ?
    <>
    <h3 className='font-bold text-[30px]'>{weatDetails.name} <span className='bg-[yellow]'>{weatDetails.sys.country}</span></h3>
    <h1 className='bg-[#ef12e0] w-[30%] mx-auto rounded-xl p-[0px_10px]'>{currentTime}</h1> 
    <h2 className='font-bold text-[40px]'>{weatDetails.main.temp}°C</h2>
    <img src={`http://openweathermap.org/img/w/${weatDetails.weather[0].icon}.png`} />
    <h1 className='font-bold text-[20px]'>{weatDetails.weather[0].description}</h1>
    <h1 className='font-bold text-[15px]'>{currentDate}</h1>
    <p>Humidity {weatDetails.main.humidity}%</p>
    <p>speed {weatDetails.wind.speed} M/s</p>
    <p>sunrise {formatSunriseTime(weatDetails.sys.sunrise)}</p>
    <p>sunset {formatSunriseTime(weatDetails.sys.sunset)}</p>
    </>
    :
    <h3>NO Data Found</h3>
     }
    </div>
    </div>
    <div>
    <h6 className='absolute bottom-0 right-0 p-1 text-sm font-light text-gray-400'>@Created by Dheeraj kumar</h6>
    </div>
    </div>
    
    </>
  );
}

export default App;
