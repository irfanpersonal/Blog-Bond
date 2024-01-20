import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {type useDispatchType, type useSelectorType} from '../store';
import moment from 'moment';
import {updateUser} from '../features/user/userThunk';

const EditProfileData: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    }
    const {profileData, editUserLoading} = useSelector((store: useSelectorType) => store.user);
    const [input, setInput] = React.useState({
        name: profileData!.name,
        email: profileData!.email,
        bio: profileData!.bio,
        location: profileData!.location,
        dateOfBirth: profileData!.dateOfBirth
    });
    const handleChange = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement;
        setInput(currentState => {
            return {...currentState, [target.name]: target.value};
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="title">Edit Profile</h1>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" value={input.name} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" value={input.email} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="bio">Bio</label>
                <textarea id="bio" name="bio" value={input.bio} onChange={handleChange}></textarea>
            </div>
            <div>
                <label htmlFor="location">Location</label>
                <input id="location" type="text" name="location" value={input.location} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input id="dateOfBirth" type="date" name="dateOfBirth" value={moment(input.dateOfBirth).utc().format('YYYY-MM-DD')} onChange={handleChange}/>
            </div>
                <button className="edit" onClick={() => dispatch(updateUser(input))} disabled={editUserLoading}>{editUserLoading ? 'EDITING' : 'EDIT'}</button>
        </form>
    );
}

export default EditProfileData;