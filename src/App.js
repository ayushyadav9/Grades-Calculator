import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Spi from "./components/SPI/Spi";
import Cpi from "./components/CPI/Cpi";

function App() {
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

