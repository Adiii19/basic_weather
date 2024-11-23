const currentbutton=document.getElementById('currentlocation-button');
const loc=document.getElementById('location')
const temp=document.getElementById('Temperature')
const input=document.getElementById('location-input')
const location_button=document.getElementById('location-button')
const time=document.getElementById('Time')
const aqi=document.getElementById('AQI')

var get;
async function getdata(lat,long){

 get= await fetch(`http://api.weatherapi.com/v1/current.json?key=2e5d276d90204433a87172746242211&q=${lat},${long}&aqi=yes
`);
return await get.json();

}

async function getlocdata(input){

    get= await fetch(`http://api.weatherapi.com/v1/current.json?key=2e5d276d90204433a87172746242211&q=${input}&aqi=yes
   `);
        
   return await get.json();
   
   }

async function gotlocation(position){
     
const result=await getlocdata(position)
   console.log(result)
   console.log(result.location)
   loc.innerText=result.location.name;
   temp.innerText=result.current.temp_c;
   time.innerText=result.location.localtime;
   aqi.innerText=result.current.air_quality.us-epa-index;

}

async function gotnewlocation(position){
     
    const result=await getlocdata(position)
       console.log(result)
       console.log(result.location)
       loc.innerText=result.location.name;
       temp.innerText=result.current.temp_c;
       time.innerText=result.location.localtime;
       aqi.innerText=result.current.air_quality.o3;

       function calculateAQI(pollutants) {
        // Define breakpoints for each pollutant as per AQI scale
        const breakpoints = {
            PM25: [
                { high: 12, low: 0, aqiHigh: 50, aqiLow: 0 },
                { high: 35.4, low: 12.1, aqiHigh: 100, aqiLow: 51 },
                { high: 55.4, low: 35.5, aqiHigh: 150, aqiLow: 101 },
                { high: 150.4, low: 55.5, aqiHigh: 200, aqiLow: 151 },
                { high: 250.4, low: 150.5, aqiHigh: 300, aqiLow: 201 },
                { high: 500.4, low: 250.5, aqiHigh: 500, aqiLow: 301 }
            ],
            PM10: [
                { high: 54, low: 0, aqiHigh: 50, aqiLow: 0 },
                { high: 154, low: 55, aqiHigh: 100, aqiLow: 51 },
                { high: 254, low: 155, aqiHigh: 150, aqiLow: 101 },
                { high: 354, low: 255, aqiHigh: 200, aqiLow: 151 },
                { high: 424, low: 355, aqiHigh: 300, aqiLow: 201 },
                { high: 604, low: 425, aqiHigh: 500, aqiLow: 301 }
            ],
            O3: [
                { high: 54, low: 0, aqiHigh: 50, aqiLow: 0 },
                { high: 70, low: 55, aqiHigh: 100, aqiLow: 51 },
                { high: 85, low: 71, aqiHigh: 150, aqiLow: 101 },
                { high: 105, low: 86, aqiHigh: 200, aqiLow: 151 },
                { high: 200, low: 106, aqiHigh: 300, aqiLow: 201 },
                { high: 404, low: 201, aqiHigh: 500, aqiLow: 301 }
            ],
            NO2: [
                { high: 53, low: 0, aqiHigh: 50, aqiLow: 0 },
                { high: 100, low: 54, aqiHigh: 100, aqiLow: 51 },
                { high: 360, low: 101, aqiHigh: 150, aqiLow: 101 },
                { high: 649, low: 361, aqiHigh: 200, aqiLow: 151 },
                { high: 1249, low: 650, aqiHigh: 300, aqiLow: 201 },
                { high: 2049, low: 1250, aqiHigh: 500, aqiLow: 301 }
            ],
            SO2: [
                { high: 35, low: 0, aqiHigh: 50, aqiLow: 0 },
                { high: 75, low: 36, aqiHigh: 100, aqiLow: 51 },
                { high: 185, low: 76, aqiHigh: 150, aqiLow: 101 },
                { high: 304, low: 186, aqiHigh: 200, aqiLow: 151 },
                { high: 604, low: 305, aqiHigh: 300, aqiLow: 201 },
                { high: 804, low: 605, aqiHigh: 500, aqiLow: 301 }
            ],
            CO: [
                { high: 4.4, low: 0, aqiHigh: 50, aqiLow: 0 },
                { high: 9.4, low: 4.5, aqiHigh: 100, aqiLow: 51 },
                { high: 12.4, low: 9.5, aqiHigh: 150, aqiLow: 101 },
                { high: 15.4, low: 12.5, aqiHigh: 200, aqiLow: 151 },
                { high: 30.4, low: 15.5, aqiHigh: 300, aqiLow: 201 },
                { high: 50.4, low: 30.5, aqiHigh: 500, aqiLow: 301 }
            ]
        };
    
        // Function to calculate AQI for a given pollutant
        function calculatePollutantAQI(concentration, breakpoints) {
            for (let i = 0; i < breakpoints.length; i++) {
                const range = breakpoints[i];
                if (concentration <= range.high) {
                    return Math.round(((concentration - range.low) / (range.high - range.low)) * (range.aqiHigh - range.aqiLow) + range.aqiLow);
                }
            }
            return 500; // If concentration exceeds the highest breakpoint
        }
    
        // Calculate AQI for each pollutant
        const aqiValues = [
            calculatePollutantAQI(pollutants.PM25, breakpoints.PM25),
            calculatePollutantAQI(pollutants.PM10, breakpoints.PM10),
            calculatePollutantAQI(pollutants.O3, breakpoints.O3),
            calculatePollutantAQI(pollutants.NO2, breakpoints.NO2),
            calculatePollutantAQI(pollutants.SO2, breakpoints.SO2),
            calculatePollutantAQI(pollutants.CO, breakpoints.CO)
        ];
    
        // Return the highest AQI value as the overall AQI
        return Math.max(...aqiValues);
    }
    
    // Example usage
    const pollutants = {
        PM25: result.current.air_quality.pm2_5, // µg/m³
        PM10: result.current.air_quality.pm10, // µg/m³
        O3: result.current.air_quality.o3,   // ppb
        NO2: result.current.air_quality.no2,  // ppb
        SO2: result.current.air_quality.so2,  // ppb
        CO: result.current.air_quality.co  // ppm
    };
    
    const overallAQI = calculateAQI(pollutants);
    console.log("The overall AQI is:", overallAQI);
    aqi.innerText=overallAQI;
    


    }

function failedtoget(){
    console.log('failed to get location');
}

currentbutton.addEventListener("click", async ()=>{
  
    navigator.geolocation.getCurrentPosition(gotlocation,failedtoget)
        console.log(getdata)
     
})

location_button.addEventListener("click", async()=>{
   console.log(gotnewlocation(input.value))
  
})

