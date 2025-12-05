import { Switch, Route } from "react-router-dom";
import { ProductListPage } from "./Container/ProductListPage";
export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={() => <h1>Home</h1>} />
      <Route path="/products" component={ProductListPage} />
    </Switch>
  );
}