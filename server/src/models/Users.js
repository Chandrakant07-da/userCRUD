import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  user: { type: String, required: true },
  interest: { type: [String], required: true },
  age: { type: Number, required: true, min: 10 },
  mobile: { type: String, required: true, unique: true, minlength: 10, maxlength: 15 },
  email: { type: String, required: true, unique: true, match: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
});

export default mongoose.model('User', UserSchema);