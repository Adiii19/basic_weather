const timehead=document.getElementById("time")
const startbtn=document.getElementById("start-time")
const limit=document.getElementById("time-input")


// function showTime(){
//     const currenttime=new Date()
//     const time = `${currenttime.getHours()}:${currenttime.getMinutes()}:${currenttime.getSeconds()}`
//     timehead.innerText=time;
// }
// showTime()

function stopwatch(){
        
        if(remainingTime>0){
            remainingTime=remainingTime-1
            timehead.innerText=`0:0:${remainingTime}`
        }
        else{
        clearInterval(interval)

        }
}

let interval

startbtn.addEventListener("click",()=>{
   
        if(startbtn.innerText==='Start time')
        {
            remainingTime=parseInt(limit.value)
            startbtn.innerText='Stop'
            interval=setInterval(stopwatch,1000)

        }
        else{
            clearInterval(interval)
            startbtn.innerText='Start time'
            limit.value=remainingTime
        }

})
