import { AppRouter } from './rauters/AppRouters'

import './App.css';

function App() {
  return (
    <div>
      <AppRouter />
      ** {process.env.REACT_APP_API_URL} **
    </div>
  );
}

export default App;
