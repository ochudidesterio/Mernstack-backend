import  mongoose  from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();

    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newpost = new PostMessage(post);
  try {
    await newpost.save();
    res.status(201).json(newpost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async(req,res)=>{
    const {id: _id} = req.params;
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) 
        return res.status(404).send("no id of that type")
    
   const updatedPost=await PostMessage.findByIdAndUpdate(_id, {...post,_id},{new:true})
    res.json(updatedPost)
}
export const deletePost = async(req,res)=>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send("no id of that type")
  await PostMessage.findByIdAndRemove(id)
  console.log("DELETE")
  res.json({ message : "post deleted succesfully"})
}
export const likePost = async(req,res)=>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send("no id of that type")
  const post = await PostMessage.findById(id)
  const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount+1}, {new: true})
  res.json(updatedPost)
}