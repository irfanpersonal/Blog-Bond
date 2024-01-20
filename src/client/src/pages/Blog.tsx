import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {deleteSingleBlog, editSingleBlog, getSingleBlog} from '../features/singleBlog/singleBlogThunk';
import {useParams, Link, useNavigate} from 'react-router-dom';
import {Loading} from '../components';
import {FaArrowAltCircleLeft, FaEdit, FaTrash} from "react-icons/fa";
import {MdAutoDelete} from "react-icons/md";
import {IoCopyOutline} from "react-icons/io5";
import {ImCross} from "react-icons/im";
import emptyImage from '../images/empty-image.jpeg';
import moment from 'moment';

const Blog: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useDispatch<useDispatchType>();
    const {singleBlogLoading, singleBlog, deleteSingleBlogLoading, editSingleBlogLoading} = useSelector((store: useSelectorType) => store.singleBlog);
    const {user} = useSelector((store: useSelectorType) => store.user);
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const toggleIsEditing = () => {
        setIsEditing(currentState => {
            return !currentState;
        });
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        const target = event.target as HTMLFormElement;
        formData.append('name', (target.elements.namedItem('name') as HTMLInputElement).value);
        formData.append('content', (target.elements.namedItem('content') as HTMLTextAreaElement).value);
        formData.append('coverImage', (target.coverImage.files[0]));
        dispatch(editSingleBlog({blogID: singleBlog!._id, data: formData}));
    }
    React.useEffect(() => {
        dispatch(getSingleBlog(id as string));
    }, []);
    return (
        <Wrapper>
            {singleBlogLoading ? (
                <Loading title='Loading Single Blog' position='normal'/>
            ) : (
                <>
                    <div className="link-box">
                        <div onClick={() => {
                            navigate(-1);
                        }}><FaArrowAltCircleLeft className="icon"/></div>
                        <h1>{isEditing ? 'Edit Blog' : `${singleBlog!.name}`}</h1>
                        {singleBlog!.user._id === user!?.userID ? (
                            <div>
                                <span onClick={toggleIsEditing}>
                                    {isEditing ? (
                                        <ImCross className="icon" style={{marginRight: '1rem'}}/>
                                    ) : (
                                        <FaEdit className="icon" style={{marginRight: '1rem'}}/>
                                    )}
                                </span>
                                <span onClick={() => {
                                    dispatch(deleteSingleBlog(singleBlog!._id));
                                }}>
                                    {deleteSingleBlogLoading ? <MdAutoDelete className="icon"/> : <FaTrash className="icon"/>}
                                </span>
                            </div>
                        ) : (
                            <IoCopyOutline onClick={async() => {
                                if (navigator.clipboard) {
                                    await navigator.clipboard.writeText(window.location.href);
                                }
                            }} className="icon copy-icon"/>
                        )}
                    </div>
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <p>Current Image</p>
                                <img src={singleBlog!.coverImage ? singleBlog!.coverImage : emptyImage}/>
                                <label htmlFor="coverImage">Cover Image</label>
                                <input id="coverImage" type="file" name="coverImage"/>
                            </div>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" name="name" defaultValue={singleBlog!.name}/>
                            </div>
                            <div>
                                <label htmlFor="content">Content</label>
                                <textarea style={{height: '150px'}} id="content" name="content" defaultValue={singleBlog!.content}></textarea>
                            </div>
                            <button type="submit" disabled={editSingleBlogLoading}>{editSingleBlogLoading ? 'EDITING' : 'EDIT'}</button>
                        </form>
                    ) : (
                        <>
                            <img src={singleBlog!.coverImage ? singleBlog!.coverImage : emptyImage}/>
                            <Link className="profile-box" to={`/user/${singleBlog!.user._id}`}>
                                <img style={{width: '50px', height: '50px', borderRadius: '50%'}} src={singleBlog!.user.profilePicture}/>
                                <h1>{singleBlog!.user.name}</h1>
                            </Link>
                            <h1 style={{textAlign: 'center', marginTop: '1rem'}}>Published: {moment(singleBlog!.createdAt).utc().format('MMMM Do YYYY, h:mm:ss a')}</h1>
                            <div className="text-box">{singleBlog!.content}</div>
                        </>
                    )}
                </>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .link-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        padding: 1rem;
    }
    .icon {
        color: black;
        font-size: 2rem;
        cursor: pointer;
    }
    img {
        width: 100%;
        height: 200px;
        user-select: none;
    }
    a {
        text-decoration: none;
        color: black;
    }
    .profile-box {
        border-radius: 3rem;
        width: 50%;
        margin: 0 auto;
        background-color: white;
        padding: 0.5rem;
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
    }
    .profile-box:hover, .profile-box:active {
        background-color: lightgray;
    }
    .profile-box > img {
        margin-right: 1rem;
        outline: 1px solid black;
    }
    .text-box {
        background-color: white;
        margin-top: 1rem;
        padding: 1rem;
    }
    form > h1 {
        text-align: center;
        background-color: gray;
        padding: 0.5rem;
    }
    .copy-icon:active {
        color: gray;
    }
    form {
        margin: 0 auto;
        padding: 1rem;
        background-color: white;
        margin-top: 1rem;
        h1 {
            color: rgb(33, 33, 33);
            margin-bottom: 1rem;
        }
        div {
            margin-bottom: 1.5rem;
            p {
                color: rgb(100, 100, 100);
                font-size: 1rem;
                margin-bottom: 1rem;
                text-align: center;
            }
            img {
                width: 100%;
                height: 200px;
                border-radius: 0.25rem;
                margin-bottom: 0.5rem;
            }
            label {
                font-size: 1rem;
                color: rgb(33, 33, 33);
                margin-bottom: 0.25rem;
                display: block;
            }
            input[type="file"], input[type="text"], textarea {
                width: 100%;
                padding: 1rem;
                border: 1px solid rgb(200, 200, 200);
                border-radius: 0.25rem;
                box-sizing: border-box;
                resize: none;
            }
        }
        button {
            width: 100%;
            background-color: rgb(33, 150, 243);
            color: white;
            padding: 1rem;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: background-color 0.3s;
            &:hover {
                background-color: rgb(25, 118, 210);
            }
        }
    }
`;

export default Blog;