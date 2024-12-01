import { BrowserRouter } from 'react-router-dom';
import MainRoute from './routes/MainRoutes';

function App() {
  return (
     <BrowserRouter>
        <MainRoute />
     </BrowserRouter>
  );
}

export default App;
