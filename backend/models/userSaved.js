import mongoose from "mongoose"

const SavedSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    FavoritedId: [{
        type: String,
        required: true,
    }]
}, {
    timestamps: true
})

const Saved = mongoose.model('Saved', SavedSchema)

export default Saved