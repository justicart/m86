import {distanceTo} from 'geolocation-utils';
import './App.css';
import { useEffect, useState } from 'react';
import useInterval from './useInterval';

// const API_URL = "https://bustime.mta.info/api/siri/stop-monitoring.json";
const API_URL = "/.netlify/functions/node-fetch";
const york = { //401916,YORK AV/E 91 ST,40.778847,-73.945062
  monitoringRef: 401916,
  name: "YORK AV/E 91 ST",
  location: [40.778847,-73.945062]
};
const cpw = { // 401927,W 86 ST/CENTRAL PK W,40.785700,-73.970102
  monitoringRef: 401927,
  name: "W 86 ST/CENTRAL PK W",
  location: [40.785700,-73.970102]
}

function getArrival(t) {
  let time = t;
  const milli = 1000;
  const sec = 60
  const day = 24 * 60 * sec * milli;
  if (time > day) time -= day // data is bad around midnight :(
  return time / milli / sec;
}

function App() {
  const [buses, setBuses] = useState([]);
  const [location, setLocation] = useState({});
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  useEffect(() => {
    getLocation();
    
  }, []);
  useEffect(() => {
    if (location.monitoringRef != null) getData();
  }, [location])
  useInterval(() => {
    if (location.monitoringRef != null) getData();
  }, 10000)

  const getLocation = () => {
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(getClosestStop);
  }

  const getClosestStop = (position) => {
    const distanceToYork = distanceTo({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    },{
      lat: york.location[0],
      lon: york.location[1]
    });
    const distanceToCpw = distanceTo({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    },{
      lat: cpw.location[0],
      lon: cpw.location[1]
    });
    // console.log(distanceToYork, distanceToCpw)
    setLoadingLoc(false)
    return setLocation(distanceToYork > distanceToCpw ? cpw : york);
  }

  const getData = () => {
    setLoadingData(true);
    fetch(`${API_URL}?key=${process.env.REACT_APP_MTA_BUS_TIME_API_KEY}&MonitoringRef=${location.monitoringRef}`)
    .then(response => response.json())
    .then(data => {
      const stopVisits = data.Siri?.ServiceDelivery?.StopMonitoringDelivery?.[0]?.MonitoredStopVisit || [];
      // console.log(data.Siri)
      // console.log(stopVisits)
      // console.log(data)
      const busArr = []
      for (const visit of stopVisits) {
        const vehicle = visit.MonitoredVehicleJourney;
        if (vehicle.PublishedLineName === 'M86-SBS') {
          const call = visit.MonitoredVehicleJourney?.MonitoredCall;
          if (!call) return;
          const now = new Date();
          const arrival = new Date(call.AimedArrivalTime) - now;
          // console.log(new Date(call.AimedArrivalTime), now, new Date(call.AimedArrivalTime) - now)
          const text = call.Extensions?.Distances?.PresentableDistance;
          const busObj = {
            arrival,
            text
          }
          busArr.push(busObj);
        }
      }
      setBuses(busArr);
      setLoadingData(false);
    })
    .catch(err => console.error(err));
  }

  const times = buses.map(bus => {
    const time = Math.round(getArrival(bus.arrival));
    return (
      <div className="bus" key={bus.arrival}>
        <div className="time">
          <div className="minutes">{time}</div>
          <div className="label">min</div>
        </div>
        <div className="text">{bus.text}</div>
      </div>
    )
  })
  return (
    <div className="App">
      <header className="content">
        <div className="header">
          <div className="title">M86+</div>
          <div className="location">
            {loadingLoc ? 'getting location...' : location.name}
          </div>
        </div>
        {/* {loadingData && <div>loading data...</div>} */}
        <div className="buses">
          {times}
        </div>
      </header>
    </div>
  );
}

export default App;
