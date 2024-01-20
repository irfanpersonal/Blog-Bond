import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {About, AddBlog, Auth, Blog, Blogs, Error, Home, HomeLayout, Landing, Profile, ProtectedRoute, User, Users} from './pages';
import {useDispatch, useSelector} from 'react-redux';
import {type useDispatchType, type useSelectorType} from './store';
import {Loading} from './components';
import {showCurrentUser} from './features/user/userThunk';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout/>,
		errorElement: <Error/>,
		children: [
			{
				index: true,
				element: <Home/>
			},
			{
				path: 'about',
				element: <About/>
			},
			{
				path: 'blog',
				element: <Blogs/>
			},
			{
				path: 'blog/:id',
				element: <Blog/>
			},
			{
				path: 'user',
				element: <Users/>
			},
			{
				path: 'user/:id',
				element: <User/>
			},
			{
				path: 'add-blog',
				element: <ProtectedRoute><AddBlog/></ProtectedRoute>
			},
			{
				path: 'profile',
				element: <ProtectedRoute><Profile/></ProtectedRoute>
			}
		]
	},
	{
		path: '/auth',
		element: <Auth/>,
		errorElement: <Error/>
	},
	{
		path: '/landing',
		element: <Landing/>,
		errorElement: <Error/>
	}
]);

const App = () => {
	const dispatch = useDispatch<useDispatchType>();
	const {globalLoading} = useSelector((store: useSelectorType) => store.user);
	const {location} = useSelector((store: useSelectorType) => store.navigation);
	React.useEffect(() => {
		dispatch(showCurrentUser());
	}, []);
	React.useEffect(() => {
		if (window.location.pathname !== location) {
			router.navigate(location);
		}
	}, [location]);
	if (globalLoading) {
		return (
			<Loading title='Loading Application' position='center'/>
		);
	}
	return (
		<RouterProvider router={router}/>
	);
}

export default App;