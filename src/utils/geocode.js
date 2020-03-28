const request=require('request')

const geoCode=function(address,callback)
{
    const geoURL="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiaWx1YXJvcmE1NjciLCJhIjoiY2s3c3k2Z2dxMGppMzNmcGdkdnNjcGF1byJ9.-bRumTHlN_udNAChBGh0yw&limit=1"
    request({url:geoURL , json:true},(error,response)=>{
        if(error)
        {
            callback("Unable to connect to location services!",undefined)
        }
        else if(response.body.features.length===0)
        {
            callback("Unable to find location, try another search!",undefined)
        }
        else
        {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode