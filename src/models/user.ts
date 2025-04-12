// Ensure the file has a proper export
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User; // Add this export statement