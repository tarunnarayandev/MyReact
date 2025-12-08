import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const ProductListPage = React.lazy(() =>
  import("./Container/ProductListPage").then((m) => ({
    default: m.ProductListPage,
  }))
);

const TickTacToe = React.lazy(() =>
  import("./Container/TickTacToe").then((m) => ({
    default: m.TickTacToe,
  }))
);

const ConsultDetails = React.lazy(() => import("./Container/ConsultDetails").then((m) => ({
  default: m.ConsultDetails,
})))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={() => <h1>Home</h1>} />
          <Route path="/products" component={ProductListPage} />
          <Route path="/tick-tac-toe" component={TickTacToe} />
          <Route path="/consult-details" component={ConsultDetails} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
