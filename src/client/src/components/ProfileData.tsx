import {useSelector} from "react-redux";
import {type useSelectorType} from '../store';
import moment from 'moment';
import noProfilePicture from '../images/no-profile-picture.png';

const ProfileData: React.FunctionComponent = () => {
    const {profileData} = useSelector((store: useSelectorType) => store.user);
    return (
        <>
            <img src={profileData!.profilePicture ? profileData!.profilePicture : noProfilePicture}/>
            <h1>Name: {profileData!.name}</h1>
            <h1>Location: {profileData!.location ? profileData!.location : 'No Location'}</h1>
            <h1>Bio: {profileData!.bio ? profileData!.bio : 'No Bio'}</h1>
            <h1>Date of Birth: {moment(profileData!.dateOfBirth).utc().format("MMM Do YYYY")}</h1>
            <div className="number-box">
                <h1>Following: {profileData!.following.length}</h1>
                <h1>Followers: {profileData!.followers.length}</h1>
            </div>
            <h1>Joined: {moment(profileData!.createdAt).utc().format("MMM Do YYYY")}</h1>
        </>
    );
}

export default ProfileData;