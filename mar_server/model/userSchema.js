import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String },
    department: { type: String, required: true },
    year: { type: String, required: true },
    refreshtoken: { type: String }
}, { collection: "user" });

const User = mongoose.model('user', UserSchema);

export default User;