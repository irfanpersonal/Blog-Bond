import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {type useDispatchType, type useSelectorType} from '../store';
import {deleteAccount, getProfileBlogs, getProfileData, logoutUser} from '../features/user/userThunk';
import {Loading, ProfileData, EditProfileData, BlogList, PaginationBox, Modal} from '../components';
import {setProfilePage, setSearch} from '../features/user/userSlice';

const Profile: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {user, logoutLoading, profileDataLoading, getProfileBlogsLoading, profileBlogs, profileTotalBlogs, profileTotalNumberOfPagesForBlogs, page, search, deleteAccountLoading} = useSelector((store: useSelectorType) => store.user);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const toggleIsEditing = () => {
        setIsEditing(currentState => {
            return !currentState;
        });
    }
    const toggleShowModal = () => {
        setShowModal(currentState => {
            return !currentState;
        });
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const passwordValue = (target.elements.namedItem('password') as HTMLInputElement).value;
        dispatch(deleteAccount(passwordValue));
    }
    React.useEffect(() => {
        dispatch(getProfileData(user!.userID));
        dispatch(getProfileBlogs(user!.userID));
    }, []);
    return (
        <Wrapper>
            {profileDataLoading ? (
                <div style={{border: '1px solid black', margin: '1rem 0'}}>
                    <Loading title='Loading Profile Data' position='center'/>
                </div>
            ) : (
                <div>
                    {isEditing ? (
                        <EditProfileData/>
                    ) : (
                        <ProfileData/>
                    )}
                    <button className="edit" onClick={toggleIsEditing}>{isEditing ? 'CANCEL' : 'EDIT'}</button>
                </div>
            )}
            {getProfileBlogsLoading ? (
                <div style={{border: '1px solid black', margin: '1rem 0'}}>
                    <Loading title='Loading Profile Blogs' position='center'/>
                </div>
            ) : (
                <>
                    <BlogList setSearch={setSearch} search={search} setPage={setProfilePage} _id={user!.userID} updateSearch={getProfileBlogs} data={profileBlogs} text={`My Blogs / ${profileTotalBlogs} Blog${profileTotalBlogs! > 1 ? 's' : ''} Found...`} placeHolderText='Search My Blogs'/>
                    {profileTotalNumberOfPagesForBlogs! > 1 && (
                        <PaginationBox _id={user!.userID} page={page} numberOfPages={profileTotalNumberOfPagesForBlogs!} changePage={setProfilePage} updateSearch={getProfileBlogs}/>
                    )}
                </>
            )}
            <h3 onClick={toggleShowModal} style={{marginTop: '2rem', textDecoration: 'underline', cursor: 'pointer'}}>Delete Account</h3>
            <button className="logout" disabled={logoutLoading} onClick={() => dispatch(logoutUser())}>{logoutLoading ? 'Logging Out..' : 'Log Out'}</button>
            {showModal && (
                <Modal buttonLoading={deleteAccountLoading} handleSubmit={handleSubmit} closeModal={toggleShowModal} title='Delete Account' description='You are about to delete your account. This action is irreversible. Complete this action by entering in your password.'/>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-color: white;
    padding: 1rem;
    text-align: center;
    border-radius: 0.5rem;
    img {
        display: block;
        margin: 0 auto;
        border-radius: 50%;
        width: 150px;
        height: 150px;
        border: 1px solid black;
    }
    label {
        display: block;
        text-align: left;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
    input {
        width: 100%;
        padding: 0.75rem;
        border-radius: 0.5rem;
        border: 1px solid gray;
    }
    div > h1 {
        margin: 1rem 0;
    }
    div > textarea {
        width: 100%;
        padding: 0.75rem;
        height: 150px;
        resize: none;
        border-radius: 0.5rem;
        border: 1px solid gray;
    }
    .edit {
        margin-top: 1rem;
        width: 100%;
        padding: 0.5rem;
        background-color: lightblue;
        border: none;
    }
    .logout {
        margin-top: 1rem;
        width: 100%;
        padding: 0.5rem;
        background-color: lightcoral;
        border: none;
        cursor: pointer;
    }
    .logout:hover, .logout:active {
        outline: 1px solid black;
    }
`;

export default Profile;