import { useRoutes } from 'react-router-dom';
import routes from './routes';

function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

export default AppRoutes;