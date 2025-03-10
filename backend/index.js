import express from 'express'
import cookieParser from 'cookie-parser'
import { ENV_VARS } from './config/envVar.js'
import { connectDB } from './config/db.js'
import authRoute from "./routes/user.route.js"
import movieRoute from "./routes/movie.route.js"
import tvRoute from "./routes/tv.route.js"
import serachRoute from './routes/search.route.js'
import { protectRoute } from './middleware/protectRoute.js'
import path from 'path'

const app = express()

const PORT = ENV_VARS.PORT
const __dirname = path.resolve()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/movie", protectRoute, movieRoute)
app.use("/api/v1/tv", protectRoute, tvRoute)
app.use("/api/v1/search", protectRoute, serachRoute)

if(ENV_VARS.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("*", (req, res)=> {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, ()=> {
    console.log("Server is runing at http://localhost:" + PORT);
    connectDB()
})