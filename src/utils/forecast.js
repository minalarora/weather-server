const request=require('request')

const forecast=function(latitude,longitude,callback)
{
    const url="https://api.darksky.net/forecast/6d26df7612c204bd7473839aa327c30a/" + encodeURIComponent(latitude) + ","  + encodeURIComponent(longitude)+"?units=si"
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback("Unable to connect to location services!",undefined)
        }
        else if(response.body.error)
        {
            callback("Unable to find location, try another search!",undefined)
        }
        else{
             
            callback(undefined,response.body.currently)
        }
    })

}

module.exports=forecast