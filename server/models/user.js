const mongoose = require("mongoose");
const bcrypt = require ('bcryptjs');
const userSchema = new mongoose.Schema({
    username : String,
    password : { type: String, required: true}

})
const User = mongoose.model("User",userSchema);

async function register(username, password) {
    const user =  await getUser(username);
    if(user) throw Error('Username already in use');
  
   const salt = await bcrypt.genSalt(10);
   const hashed = await bcrypt.hash(password, salt);
  
    const newUser = await User.create({
      username: username,
      password: hashed
    });
  
    return newUser;
  }
  
  // READ a user
  async function login(username, password) {
    const user = await getUser(username);
    if(!user) throw Error('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw Error('Wrong Password');
    return user._doc;
  }
  
  // UPDATE
  async function updatePassword(id, password) {
    const user = await User.updateOne({"_id": id}, {$set: { password: password}});
    return user;
  }
  
  //DELETE
  async function deleteUser(id) {
    await User.deleteOne({"_id": id});
  };
  
  // utility functions
  async function getUser(username) {
    return await User.findOne({ "username": username});
  }
  
  // 5. export all functions we want to access in route files
  module.exports = { 
    register, login, updatePassword, deleteUser 
  };