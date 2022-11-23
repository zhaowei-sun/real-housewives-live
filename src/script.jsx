import { createRoot } from 'react-dom/client';
import './styles.css';
import App from '../views/App.jsx';

const container = document.querySelector("#root");;
const root = createRoot(container); 
root.render(<App  />);
