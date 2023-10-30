import {getUserFromLocalStorage} from '../utils';
import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const user = getUserFromLocalStorage();
    if (!user) {
        return <Navigate to='/'/>
    }
    return children;
}

export default ProtectedRoute;