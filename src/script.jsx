import ReactDOM from 'react-dom';
import './styles.css';
import App from '../views/App.jsx';

const mountingNode = document.querySelector("#root");

ReactDOM.render(<App />, mountingNode);
