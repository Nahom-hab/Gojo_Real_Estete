import mongoose from "mongoose"

const messageSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['user', 'listing']
    },
    listingId: {
        type: String,
    }
    ,
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)

export default Message