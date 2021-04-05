
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    msgOne.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?addr='+search.value).then((response) =>{
        response.json().then((data)=>{
            if(data.error){
                console.log(error)
            }else{
            console.log(data)
            if(data.WeatherReport.success == undefined){
                    msgOne.textContent = data.WeatherReport.location.name + ', ' + data.WeatherReport.location.region + ', ' + data.WeatherReport.location.country
                    msgTwo.textContent = data.WeatherReport.current.temperature
            } else if(!data.WeatherReport.success){
                msgOne.textContent = 'Location Not Found'
                msgTwo.textContent = '' 
            }
            }
        })
    })
})