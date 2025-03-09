import axios from "axios"
import { ENV_VARS } from '../config/envVar.js'

const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
        accept: "application/json",
        Authorization: "Bearer " + ENV_VARS.TMDB_KEY
    } 
  }

  const res = await axios.get(url, options)

  if(res.status !== 200) {
    throw new Error("Failed to fetch data from TMDB " + res.statusText)
  }

  return res.data
}

export default fetchFromTMDB
