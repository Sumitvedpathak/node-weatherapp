const request = require('request')

forecast = (addr,callback) => {
    const url='http://api.weatherstack.com/current?access_key=d56e886f272f3a36eb3c5ce8a27eb7df&query='+addr
    request({url:url,json:true},(error, response)=>{
        if(error){
            callback('Unable to collect data',undefined)
        }
        else{
            callback(undefined,response.body)
        }
    })
    // callback('Recieved call')
}

module.exports = forecast