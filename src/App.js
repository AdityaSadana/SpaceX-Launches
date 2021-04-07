import './App.css';
import Table from 'react-bootstrap/table'
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function App() {
  const [launches, setLaunches]=useState();
  const [year, setYear] = useState();
  const [outcome, setOutcome]=useState();
  const [landing, setLanding]=useState();

  useEffect(() => {
    axios.get("https://api.spacexdata.com/v3/launches/", {
      params: {
        limit: 100,
        launch_year: year,
        launch_success: outcome,
        land_success: landing
      }
    })
    .then((response) => {
      setLaunches(response.data);
    })
  },[year, outcome, landing])

  return (
    <div className="app">
        <img className="app_image" src="http://www.nasa.gov/sites/default/files/thumbnails/image/ksc-20200306-ph-awg01_0009orig.jpg" alt="launch" />
        <div className="app_filter">
        <h1>Launches by SpaceX</h1>
        <div className="filter_options">
            <div className="option">
                {/* <h4>Launch Year:</h4> */}
                <select style={{backgroundColor: "transparent", color: "white", height: "25px", border: "1px solid white", marginLeft: "8px"}} defaultValue="Select Launch Year" onChange={(e) => 
                    {
                        if (e.target.value==="null") {setYear(null)
                        return}
                        setYear(e.target.value)
                      }}
                        >
                    <option value="null">Launch Year</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                </select>
            </div>
            <div className="option">
                {/* <h4>Launch: </h4> */}
                <select style={{backgroundColor: "transparent", color: "white", height: "25px", border: "1px solid white", marginLeft: "8px"}} defaultValue="Launching" onChange={(e) => {
                    if (e.target.value==="null") {
                        setOutcome(null)
                        return
                    }
                    setOutcome(e.target.value)}}>
                    <option value="null">Launch Outcome</option>
                    <option value="true">Success</option>
                    <option value="false">Fail</option>
                </select>
            </div>
            {/* <h4>Land: </h4> */}
            <select style={{backgroundColor: "transparent", color: "white", height: "25px", border: "1px solid white", marginLeft: "8px"}} defaultValue="Landing" onChange={(e) => {
                if (e.target.value==="null") {
                    setLanding(null)
                    return
                }
                setLanding(e.target.value)}}>
                <option value="null">Landing Outcome</option>
                <option value="true">Success</option>
                <option value="false">Fail</option>
            </select>
        </div>
      </div>
      <div className="app_records">
          <Table responsive="xl" className="app_table">
            <tr>
              <th>Flight No.</th>
              <th>Mission Name</th>
              <th>Launch Year</th>
              <th>Launch</th>
              <th>Landing</th>
            </tr>
            {
              (launches && launches.length>0) ?
              launches.map((launch) => {
                return (
                <tr>
                  <td>{launch.flight_number}</td>
                  <td>{launch.mission_name}</td>
                  <td>{launch.launch_year}</td>
                  {launch.launch_success ? 
                    <td className="success">Success</td> : <td className="fail">Fail</td>
                  }
                  {(launch.rocket.first_stage.cores[launch.rocket.first_stage.cores.length-1].land_success===true) ?
                  <td className="success">Success</td> : <td className="fail">Fail</td>}
                </tr>

                )
              }) : <p>No Records</p>
            }
          </Table>
        </div>
        
    </div>
  );
}

export default App;
