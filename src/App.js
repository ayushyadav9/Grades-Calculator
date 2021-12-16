import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Spi from "./components/Spi";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/SPI" exact component={Spi} />
      </Switch>
    </Router>
  );
}

export default App;

