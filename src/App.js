import React from 'react'
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from 'react-redux'

import HomePage from './pages/homapage/homePage'
import Shop from './pages/shop/shop'
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";

import { setCurrentUser } from './actions/user.action'
import {selectCurrentUser} from './reducers/user/user.selectors'
import {createStructuredSelector} from "reselect";
class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot => {
          setCurrentUser ({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    console.log(this.props.currentState, 'current')
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={Shop} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() =>
            this.props.currentUser
              ? (<Redirect to='/' />)
              : (<SignInSignUpPage />)
          } />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps =  createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
