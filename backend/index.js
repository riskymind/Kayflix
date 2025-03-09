import express from 'express'
import cookieParser from 'cookie-parser'
import { ENV_VARS } from './config/envVar.js'
import { connectDB } from './config/db.js'
import authRoute from "./routes/user.route.js"
import movieRoute from "./routes/movie.route.js"
import tvRoute from "./routes/tv.route.js"
import serachRoute from './routes/search.route.js'
import { protectRoute } from './middleware/protectRoute.js'

const app = express()

const PORT = ENV_VARS.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/movie", protectRoute, movieRoute)
app.use("/api/v1/tv", protectRoute, tvRoute)
app.use("/api/v1/search", protectRoute, serachRoute)

app.listen(PORT, ()=> {
    console.log("Server is runing on port:" + PORT);
    connectDB()
})