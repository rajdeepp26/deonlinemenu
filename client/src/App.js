import React,{Fragment} from "react";

import './App.css';

import{BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

// Components
import Menulist from "./Modules/MenuModule/MenuPage";
import Cart from "./Modules/CartModule/CartPage";
import Checkout from "./Modules/CheckoutModule/CheckoutPage";


// use boolean to track if someone have added items to cart before getting to checkout page

function App() {
  return (
    <Fragment>
      <Router>
        <div className ="main-container" >
          <Switch>
            <Route exact path="/menulist" render={props => <Menulist {...props}/> }/>
            {/* we use render prop because when we pass prop to a component we dont want it to remount */}
            
            <Route exact path="/cart" render={props => <Cart {...props}/> }/>
            
            <Route exact path="/checkout" render={props => <Checkout {...props}/> } /> 
            <Redirect from="/" exact to ="/menulist" />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
