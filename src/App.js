import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Spi from "./components/SPI/Spi";
import Cpi from "./components/CPI/Cpi";
import ReactGA from 'react-ga';
import { useEffect } from "react";

ReactGA.initialize('UA-215631298-1');

function App() {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/SPI" exact component={Spi} />
        <Route path="/CPI" exact component={Cpi} />
      </Switch>
    </Router>
  );
}

export default App;

