import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true   


})
export default mongoose.model("Commentt", commentSchema);