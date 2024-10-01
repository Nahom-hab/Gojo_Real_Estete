
import mongoose from "mongoose"

const imageSchema = mongoose.Schema({
    name: String,             // Store image name
    img: {                    // Store image data as buffer
        data: Buffer,
        contentType: String,
    },
});

// Create the model
const Image = mongoose.model('Image', imageSchema);

export default Image