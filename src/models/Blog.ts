import mongoose from 'mongoose';

export interface IBlog extends mongoose.Document {
    name: string,
    content: string,
    coverImage: string,
    user: mongoose.Schema.Types.ObjectId
}

const blogSchema = new mongoose.Schema<IBlog>({
    name: {
        type: String,
        required: [true, 'Must Provide Blog Name'],
        minlength: 5,
        maxLength: 40
    },
    content: {
        type: String,
        required: [true, 'Must Provide Blog Content']
    },
    coverImage: {
        type: String,
        required: [true, 'Must Provide Blog Cover Image']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Must Provide Blog User'],
        ref: 'User'
    }
}, {timestamps: true});

export default mongoose.model<IBlog>('Blog', blogSchema);