import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  image: { type: String },
  name: { type: String, required: true },
  bio: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model('UserConduit', userSchema);
