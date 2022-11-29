
import { useEffect, useState } from 'react';
import './App.css';
import Home from"./component/Home/Home";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import ProductDetails from './component/Products/ProductDetails';
import LoginSignup from "./component/Authentication/LoginSignup.jsx";
import UserData from './more/UserData'; 
import { useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import  Store  from './store';
import Profile from "./component/user/Profile";
import ProtectedRoute from './route/ProtectedRoutee';
import About from './component/about/About';
import Products from "./component/Products/Products.jsx"
import Search from "./component/Products/Search.jsx";
import BottomTab from './more/BottomTab';
import Cart from './component/cart/Cart';
import Shipping from './component/cart/Shipping';
import Favourites from './component/cart/Favourites';
import ConfirmOrder from './component/cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/cart/Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Success from './component/cart/Success';



function App() {
  const {isAuthenticated,user} = useSelector((state) =>state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }



  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    Store.dispatch(loadUser())
    getStripeApiKey();
  }, []);
  return (
    <Router>

     {isAuthenticated && <UserData user={user} />}
     {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}


    <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/product/:id" component={ProductDetails} />
    <Route exact path="/login" component={LoginSignup} />
    <Route exact path="/about" component={About} />
    <Route exact path="/products" component={Products} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/bottom" component={BottomTab} />
    <Route exact path="/cart" component={Cart} />
    <Route exact path="/favourites" component={Favourites} />
    <Route exact path="/products/:keyword" component={Products} />
    <ProtectedRoute exact path="/me" component={Profile} />
    <ProtectedRoute exact path="/shipping" component={Shipping} />
    <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
    <ProtectedRoute exact path="/success" component={Success} />
    </Switch>
    </Router>
      
  );
}

export default App;
