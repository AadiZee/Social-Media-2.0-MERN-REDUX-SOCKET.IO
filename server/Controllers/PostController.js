const PostModel = require("../Models/postModel");
const mongoose = require("mongoose");
const UserModel = require("../Models/userModel");

// create new post

const createPost = async (req, res) => {
  //   const newPost = req.body;
  const newPost = new PostModel(req.body); // we get the req body and embed it in our post model saving alot of code

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error creating post!", error: error });
  }
};

// get single post

const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Error! Post not found!" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching post!", error: error });
  }
};

// update post

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { currentUserId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    if (post.userId == currentUserId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json({ message: "Post updated successfully" });
    } else {
      return res.status(403).json({
        message: "Action Forbidden! You can only update your own posts.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error updating post!", error: error });
  }
};

// delete post

const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { currentUserId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    if (post.userId === currentUserId) {
      await post.deleteOne();
      return res.status(200).send({ message: "Post deleted successfully" });
    } else {
      return res.status(403).json({
        message: "Action Forbidden! You can only delete your own posts.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error deleting post!", error: error });
  }
};

//  like a post
const likePost = async (req, res) => {
  const postId = req.params.id;
  const { currentUserId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found! Maybe it was deleted?" });
    }
    if (!post.likes.includes(currentUserId)) {
      await post.updateOne({ $push: { likes: currentUserId } });
      return res.status(200).json({ message: "Post Liked!" });
    } else {
      await post.updateOne({ $pull: { likes: currentUserId } });
      return res.status(200).json({ message: "Post Disliked!" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error liking/disliking post!", error: error });
  }
};

// Get Timeline posts

const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      // getting our own user id from db
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      //   looking up data from other documents in the db
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      //   return 1, ignore 0
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts.concat(followingPosts[0].followingPosts).sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching posts!", error: error });
  }
};

// posts made only by the user
const getProfilePosts = async (req, res) => {
  const currentUserId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId: currentUserId });
    if (!currentUserPosts) {
      return res
        .status(404)
        .json({ message: "Unable to find any posts created you!" });
    } else {
      return res.status(200).json(currentUserPosts);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching posts!", error: error });
  }
};

//  unlike
// const dislikePost = async (req, res) => {
//   const postId = req.params.id;
//   const { currentUserId } = req.body;

//   try {
//     const post = await PostModel.findById(postId);
//     if (!post) {
//       return res
//         .status(404)
//         .json({ message: "Post not found! Maybe it was deleted?" });
//     }
//     if (post.likes.includes(currentUserId)) {
//       await post.updateOne({ $pull: { likes: currentUserId } });
//       return res.status(200).json({ message: "Post Disliked!" });
//     } else {
//       return res.status(403).json({
//         message: "Action forbidden! You can only dislike a post once",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: "Error disliking post!", error: error });
//   }
// };

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
  getProfilePosts,
};
