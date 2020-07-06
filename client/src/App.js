import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import { fetchUser } from './store/actions/authActions'

import FrontPage from './components/frontPage';
import ShopPage from './components/shopPage';
import CartPage from './components/cartPage';
import ProductPage from './components/productPage';
import ProfilePage from './components/profilePage';
import OrderPage from './components/orderPage';
import TestPage from './components/testPage';



function App(props) {
    useEffect(() => {
        props.fetch_user();
    }, [props])
  return (
    <Switch>
          <Route exact path="/" component={FrontPage} />
          <Route path="/shop/:productType" component={ShopPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/product/:productId" component={ProductPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/order" component={OrderPage} />
          <Route path="/test" component={TestPage} />
    </Switch>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_user:() => {dispatch(fetchUser())}
    }
}

export default connect(null, mapDispatchToProps)(App);
