// import React from "react";

// const HomePage = () => {
//   return (
//     <div className="home-page">
//       <div className="home-page-container">
//         <div className="active-cases">
//           <p>Active Cases</p>
//         </div>
//         <div className="total-cases">
//           <p>Total Cases</p>
//         </div>
//         <div className="recovered-cases">
//           <p>Total Recovered</p>
//         </div>
//         <div className="total-death">
//           <p>Total Death</p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default HomePage;

import React, { useEffect, useState } from "react";
import StateWiseData from "./component/StateWiseData";
import Footer from "./component/Footer";


const HomePage = () => {
  const [covidData, setCovidData] = useState({
    active: 0,
    cases: 0,
    recovered: 0,
    deaths: 0,
    todayCases: 0,
  });




  useEffect(() => {
    const fetchCovidData = async () => {
      try {
        const response = await fetch("https://disease.sh/v3/covid-19/countries/India");
        const data = await response.json();
        setCovidData({
          active: data.active,
          cases: data.cases,
          recovered: data.recovered,
          deaths: data.deaths, 
          todayCases: data.todayCases,
        });
      } catch (error) {
        console.error("Error fetching COVID data:", error);
      }
    };

    fetchCovidData();
  }, []);

    const todayDate = new Date().toLocaleDateString("en-IN",{
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="homepage">
      <div className="homepage-header">
        <h2>COVID-19 Status - India</h2>
      <p>{todayDate}</p>
      </div>
      <div className="homepage-container">
        <div className="active-cases">
          <p>Active Cases</p>
          <h2>{covidData.active.toLocaleString()}</h2>
        </div>
        <div className="total-cases">
          <p>Total Cases</p>
          <h2>{covidData.cases.toLocaleString()}</h2>
        </div>
        <div className="recovered-cases">
          <p>Total Recovered</p>
          <h2>{covidData.recovered.toLocaleString()}</h2>
        </div>
        <div className="total-death">
          <p>Total Death</p>
          <h2>{covidData.deaths.toLocaleString()}</h2>
        </div>
        <div className="today-active-cases">
          <p>Today's Active Cases</p>
          <h2>{covidData.todayCases.toLocaleString()}</h2>
        </div>
      </div>
      <StateWiseData/>
      <Footer/>
    </div>
  );
};

export default HomePage;
