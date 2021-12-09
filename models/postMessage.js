import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  image: String,
  creator: String,
  tags: String,
  article: String,
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model('PostMessageConduit', postSchema);

export default PostMessage;
