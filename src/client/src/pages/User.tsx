import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {type useDispatchType, type useSelectorType} from '../store';
import {Loading, BlogList, PaginationBox} from '../components';
import {followUser, getSingleUser, getSingleUserBlogs, unfollowUser} from '../features/singleUser/singleUserThunk';
import {useParams, Link, useNavigate} from 'react-router-dom';
import noProfilePicture from '../images/no-profile-picture.png';
import moment from 'moment';
import {RiChatFollowUpFill} from "react-icons/ri";
import {setPage, setSearch} from '../features/singleUser/singleUserSlice';

const User: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch<useDispatchType>();
    const {singleUserLoading, user, singleUserBlogsLoading, singleUserBlogs, page, totalBlogs, totalNumberOfPagesForBlogs, search, followUserLoading, unfollowUserLoading} = useSelector((store: useSelectorType) => store.singleUser);
    const {user: currentUser} = useSelector((store: useSelectorType) => store.user);
    React.useEffect(() => {
        dispatch(getSingleUser(id as string));
        dispatch(getSingleUserBlogs(id as string));
    }, []);
    return (
        <Wrapper>
            {singleUserLoading ? (
                <div style={{border: '1px solid black', margin: '1rem 0'}}>
                    <Loading title='Loading Single User' position='center'/>
                </div>
            ) : (
                <div>
                    <img src={user!.profilePicture ? user!.profilePicture : noProfilePicture}/>
                    <h1>Name: {user!.name}</h1>
                    <h1>Location: {user!.location ? user!.location : 'No Location'}</h1>
                    <h1>Bio: {user!.bio ? user!.bio : 'No Bio'}</h1>
                    <h1>Date of Birth: {moment(user!.dateOfBirth).utc().format("MMM Do YYYY")}</h1>
                    <div className="number-box">
                        <h1>Following: {user!.following.length}</h1>
                        <h1>Followers: {user!.followers.length}</h1>
                    </div>
                    <h1>Joined: {moment(user!.createdAt).utc().format("MMM Do YYYY")}</h1>
                    {currentUser!?.userID === id ? (
                        <Link to='/profile'>
                            <button>
                                View My Profile
                            </button>
                        </Link>
                    ) : (
                        <>
                            <button disabled={followUserLoading || unfollowUserLoading} onClick={() => {
                                if (!currentUser) {
                                    navigate('/auth');
                                    return;
                                }
                                else if (user!.followers.some(follower => follower._id === currentUser!.userID)) {
                                    dispatch(unfollowUser(id as string));
                                    return;
                                }
                                dispatch(followUser(id as string));
                            }}>
                                {/* Check if the logged in user id already exists in the singleUser->user followers array */}
                                {user!.followers.some(follower => follower._id === currentUser!.userID) ? (
                                    <>
                                        <div>{unfollowUserLoading ? 'Unfollowing' : 'Unfollow'}</div>
                                        <div><RiChatFollowUpFill className="icon"/></div>
                                    </>
                                ) : (
                                    <>
                                        <div>{followUserLoading ? 'Following' : 'Follow'}</div>
                                        <div><RiChatFollowUpFill className="icon"/></div>
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </div>
            )}
            {singleUserBlogsLoading ? (
                <div style={{border: '1px solid black', margin: '1rem 0'}}>
                    <Loading title='Loading Single User Blogs' position='center'/>
                </div>
            ) : (
                <>
                    <BlogList setSearch={setSearch} placeHolderText='Search Blogs...' search={search} _id={id as string} text={`All Blogs / ${totalBlogs} Blog${totalBlogs! > 1 ? 's' : ''} Found...`} data={singleUserBlogs} setPage={setPage} updateSearch={getSingleUserBlogs}/>
                    {totalNumberOfPagesForBlogs! > 1 && (
                        <PaginationBox _id={id as string} page={page} numberOfPages={totalNumberOfPagesForBlogs!} changePage={setPage} updateSearch={getSingleUserBlogs}/>
                    )}
                </>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    text-align: center;
    background-color: white;
    padding: 1rem;
    a {
        color: black;
        text-decoration: none;
    }
    img {
        display: block;
        margin: 0 auto;
        border-radius: 50%;
        width: 150px;
        height: 150px;
        border: 1px solid black;
    }
    div > h1 {
        margin: 1rem 0;
    }
    button {
        padding: 0.5rem 2rem;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon {
        font-size: 1.5rem;
        margin-left: 1rem;
    }
`;

export default User;