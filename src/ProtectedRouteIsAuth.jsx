import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRouteIsAuth = ({
  children
}) => {
  const user = useSelector(state => state.auth.user);

  if (!user) {
    return <Navigate to={'/login'} replace />;
  }

  return children;
};

export default ProtectedRouteIsAuth;