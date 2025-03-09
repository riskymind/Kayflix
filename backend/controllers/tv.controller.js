import fetchFromTMDB from "../services/tmdb.service.js"


export const getTrendingTv = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US")
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]

        res.json({ success: true, content: randomMovie})
    } catch (error) {
        console.error("Error in getTrendingTv controller", error.message);
        res.status(500).json({ success: false, message: `Internal Server Error ${error.message}`})
    }
}

export const getTvTrailers = async (req, res) => {
    const {id} = req.params
    
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)    
        res.json({success: true, trailers: data.results})
    } catch (error) {
        console.error("Error in getTvTrailers controller", error.message);
        res.status(500).json({ success: false, message: `Internal Server Error ${error.message}`})
    }
}

export const getTvDetails = async (req, res) => {
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)       
        res.status(200).json({success: true, content: data})
    } catch (error) {

        if(error.message.includes("404")) {
            return res.status(404).send(null)
        }

        console.error("Error in getTvDetails controller", error.message);
        res.status(500).json({ success: false, message: `Internal Server Error ${error.message}`})
    }
}

export async function getSimilarTvs(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        console.error("Error in getSimilarTvs controller", error.message);
        res.status(500).json({ success: false, message: `Internal Server Error ${error.message}`})
    }
}

export async function getTvsByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error("Error in getTvsByCategory controller", error.message);
        res.status(500).json({ success: false, message: `Internal Server Error ${error.message}`})
    }
}