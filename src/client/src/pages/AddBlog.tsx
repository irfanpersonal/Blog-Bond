import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from '../store';
import {createBlog} from '../features/blog/blogThunk';

const AddBlog: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {createBlogLoading} = useSelector((store: useSelectorType) => store.blog);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        const target = event.target as HTMLFormElement;
        formData.append('name', (target.elements.namedItem('name') as HTMLInputElement).value);
        formData.append('content', (target.elements.namedItem('content') as HTMLTextAreaElement).value);
        formData.append('coverImage', (target.coverImage.files[0]));
        dispatch(createBlog(formData));
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <h1>Add Blog</h1>
                <div>
                    <label htmlFor="coverImage">Cover Image</label>
                    <input id="coverImage" type="file" name="coverImage"/>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name"/>
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content"></textarea>
                </div>
                <button disabled={createBlogLoading}>{createBlogLoading ? 'CREATING BLOG' : 'CREATE BLOG'}</button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        border-radius: 0.5rem;
        width: 50%;
        padding: 1rem;
        background-color: white;
    }
    form > h1 {
        text-align: center;
        background-color: black;
        color: white;
        padding: 0.5rem;
    }
    div > label {
        display: block;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
    div > input[type="text"], div > textarea, button {
        width: 100%;
        padding: 0.5rem;
    }
    div > textarea {
        resize: none;
        height: 125px;
    }
    button {
        border: none;
        outline: 1px solid black;
        padding: 0.5rem;
        color: white;
        border-radius: 0.5rem;
        margin-top: 1rem;
        background-color: rgb(0, 123, 255);
    }
    button:hover {
        background-color: rgb(0, 86, 179);
    }
`;

export default AddBlog;