import mongoose from "mongoose";

const replySchema = mongoose.Schema(
  {
    reply: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Reply = mongoose.models.Reply || mongoose.model("Reply", replySchema);
export default Reply;
