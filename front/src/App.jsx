import Navbar from "./components/NavBar.jsx"
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import LoginForm from './features/auth/LoginForm';

function App() {
  return (
   <>
   <Provider store={store}>
   <Navbar/>
   <LoginForm />
   </Provider>
   </>
  );
}

export default App;
