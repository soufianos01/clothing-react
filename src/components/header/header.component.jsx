import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg'
import './header.styles.scss';

const Header = ({ currentUser, hiddenCart }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo"></Logo>
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      {
        currentUser ? 
          (<Link className="option" onClick={() => auth.signOut()} to="/">
          SIGN OUT
          </Link>) : 
          (<Link className="option" to="/signin">
          SIGN IN
          </Link>)
      }
      <CartIcon />
    </div>
    { hiddenCart ? null : <CartDropdown /> }
    
  </div>
)

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hiddenCart: selectCartHidden
})

export default connect(mapStateToProps)(Header);