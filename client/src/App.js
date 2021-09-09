import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import Detail from './components/Detail/Detail'


function App() {
  return (
    <>  
      <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/activity" component={Form} />
          <Route path="/country/:id" component={Detail} />
      </Switch>
  </>
  )
};

export default App;
