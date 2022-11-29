import app from "./app.js"
import database from "./config/database.js" 

app.listen(app.get("PORT"), function(){
    console.log(`Servidor en puerto ${app.get("PORT")}`)
})
