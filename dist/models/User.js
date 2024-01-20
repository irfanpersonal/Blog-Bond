"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide User Name'],
        minLength: 3
    },
    email: {
        type: String,
        required: [true, 'Must Provide User Email'],
        validate: {
            validator: (value) => {
                return validator_1.default.isEmail(value);
            },
            message: 'Invalid Email Address'
        }
    },
    password: {
        type: String,
        required: [true, 'Must Provide User Password']
    },
    profilePicture: {
        type: String,
        required: [true, 'Must Provide User Profile Picture']
    },
    bio: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Must Provide User Date Of Birth']
    },
    followers: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        default: [],
        ref: 'User'
    },
    following: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        default: [],
        ref: 'User'
    }
}, { timestamps: true });
userSchema.index({ name: 1, email: 1 }, { unique: true });
userSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return;
        }
        const randomBytes = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, randomBytes);
    });
});
userSchema.methods.comparePassword = function (guess) {
    return __awaiter(this, void 0, void 0, function* () {
        const isCorrect = yield bcryptjs_1.default.compare(guess, this.password);
        return isCorrect;
    });
};
exports.default = mongoose_1.default.model('User', userSchema);
