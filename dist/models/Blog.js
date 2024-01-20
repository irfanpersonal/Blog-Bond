"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, 'Must Provide Blog User'],
        ref: 'User'
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Blog', blogSchema);
