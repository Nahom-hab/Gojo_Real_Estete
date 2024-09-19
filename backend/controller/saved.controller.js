import Saved from "../models/savedModel.js";


const creteSaved = async (req, res, next) => {
    const { userId, listingId } = req.body
    try {
        const saved = await Saved.find({ userId: userId, listingId: listingId })
        if(saved){
            res.json({message:'you already have '})
        }
    } catch (error) {

    }
}