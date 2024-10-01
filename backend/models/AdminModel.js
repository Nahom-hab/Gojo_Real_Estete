import mongoose from "mongoose"

const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }, email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

const Admin = mongoose.model('Admin', AdminSchema)

export default Admin