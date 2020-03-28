const express= require("express")
const path=require("path")
const hbs=require("hbs")
const forecast=require("./utils/forecast")
const geocode=require("./utils/geocode")

const app=express()

const publicPath=path.join(__dirname,"../public")

const viewPath=path.join(__dirname,"../templates/views")
app.set("view engine","hbs")
app.set("views",viewPath)

const partialPath=path.join(__dirname,"../templates/partials")
hbs.registerPartials(partialPath)



app.use(express.static(publicPath))




 app.get("/",(req,res)=>{
    res.render("index",{
       name: 'Minal Arora'
    })
 })

 /*app.get("/help",(req,res)=>{
   res.send([
      {
           name: 'Minal Arora',
           age: 22 
      },
      {
         name: 'Amit Sahu',
         age: 21
      }
   ])
 })*/

 /*app.get("/about",(req,res)=>{
    res.send("ABOUT PAGE")
 })*/

 app.get("/about",(req,res)=>{
   res.render("about",
      {
         name: 'Minal Arora'
      }
   )
})

app.get("/help",(req,res)=>{
   res.render("help",
      {
         name: 'Minal Arora'
      }
   )
})

 app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
       return res.send({
          error: 'please provide a valid address!'
       })
    }
    geocode(req.query.address,(error,response)=>{
      if(error)
      {
         return res.send({
            error: 'server issue!'
         })
      }
   
      forecast( response.latitude,response.longitude,(error,response)=>{
          if(error)
          {
            return res.send({
               error: 'server issue 2!'
            })
          }
          
          return res.send(response)
      
      })
  })

   
 })

 app.get("*",(req,res)=>{
    res.render("404",{
       name: 'Minal Arora',
      error: "Galti hai maaf krdo: 404"
    })
 })

 app.listen(3000,()=>{
     console.log("Server is starting at 3000!")
 })

