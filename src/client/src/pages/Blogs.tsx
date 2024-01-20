import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {type useDispatchType, type useSelectorType} from '../store';
import {Loading, BlogList, PaginationBox} from '../components';
import {getAllBlogs, getUserFeed} from '../features/blogs/blogsThunk';
import {setPage, setSearch} from '../features/blogs/blogsSlice';

const Blogs: React.FunctionComponent = () => {
    const dispatch = useDispatch<useDispatchType>();
    const {blogsLoading, blogs, search, page, totalBlogs, numberOfPages} = useSelector((store: useSelectorType) => store.blogs);
    const {user} = useSelector((store: useSelectorType) => store.user);
    React.useEffect(() => {
        if (user) {
            dispatch(getUserFeed());
            return;
        }
        dispatch(getAllBlogs());
    }, []);
    return (
        <div>
            {blogsLoading ? (
                <Loading title={`Loading ${user ? 'User Feed' : 'All Blogs'}`} position='normal' marginTop='1rem'/>
            ) : (
                <>
                    <BlogList setSearch={setSearch} search={search} setPage={setPage} _id='' updateSearch={user ? getUserFeed : getAllBlogs} data={blogs} text={`Blogs / ${totalBlogs} Blog${totalBlogs! > 1 ? 's' : ''} Found...`} placeHolderText={`${user ? 'Search User Feed...' : 'Search All Blogs...'}`}/>
                    {numberOfPages! > 1 && (
                        <PaginationBox _id='' page={page} numberOfPages={numberOfPages!} changePage={setPage} updateSearch={user ? getUserFeed : getAllBlogs}/>
                    )}
                </>
            )}
        </div>
    );
}

export default Blogs;