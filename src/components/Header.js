import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
    render() {
        const loginButton = (
            <li>
                <NavLink exact to="/login">
                  <i className="material-icons">vpn_key</i>
                </NavLink>
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.props.onLogout}>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );

        return (
          <nav>
              <div className="nav-wrapper blue darken-1">
                <NavLink exact to="/" className="brand-logo center">MEMOPAD</NavLink>

                <ul>
                    <li><a><i className="material-icons">search</i></a></li>
                </ul>

                <div className="right">
                  <ul>
                      { this.props.isLoggedIn ? logoutButton : loginButton }
                  </ul>
                </div>
              </div>
          </nav>
        );
    }
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");}
};

export default Header;
