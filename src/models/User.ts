import mongoose from 'mongoose';
import validator from 'validator';
import bcyrpt from 'bcryptjs';

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    bio: string,
    location: string,
    profilePicture: string,
    dateOfBirth: Date,
    followers: mongoose.Schema.Types.ObjectId[],
    following: mongoose.Schema.Types.ObjectId[],
    comparePassword: (guess: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Must Provide User Name'],
        minLength: 3
    },
    email: {
        type: String,
        required: [true, 'Must Provide User Email'],
        validate: {
            validator: (value: string) => {
                return validator.isEmail(value);
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
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'User'
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'User'
    }
}, {timestamps: true});

userSchema.index({name: 1, email: 1}, {unique: true});

userSchema.pre('save', async function(this: IUser) {
    if (!this.isModified('password')) {
        return;
    }
    const randomBytes = await bcyrpt.genSalt(10);
    this.password = await bcyrpt.hash(this.password, randomBytes);
});

userSchema.methods.comparePassword = async function(this: IUser, guess: string) {
    const isCorrect = await bcyrpt.compare(guess, this.password);
    return isCorrect;
}

export default mongoose.model<IUser>('User', userSchema);