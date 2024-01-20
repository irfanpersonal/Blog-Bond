import {type ReactNode} from "react";
import {useSelector} from "react-redux";
import {type useSelectorType } from "../store";
import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({children}): any => {
    const {user} = useSelector((store: useSelectorType) => store.user);
    if (!user) {
        return <Navigate to='/landing'/>
    }
    return children;
}

export default ProtectedRoute;