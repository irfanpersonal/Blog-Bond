import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {AddPost, Auth, Error, Home, Layout, Post, Profile, ProtectedRoute} from './pages';

// Loader
import {loader as postLoader} from './pages/Post.js';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		errorElement: <Error/>,
		children: [
			{
				index: true,
				element: <Home/>
			},
			{
				path: 'add-post',
				element: <ProtectedRoute><AddPost/></ProtectedRoute>
			},
			{
				path: 'post/:id',
				element: <Post/>,
				loader: postLoader
			},
			{
				path: 'profile',
				element: <ProtectedRoute><Profile/></ProtectedRoute>
			}
		]
	},
	{
		path: '/auth',
		element: <Auth/>
	}
]);

const App = () => {
	return (
		<RouterProvider router={router}/>
	);
}

export default App;