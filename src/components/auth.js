import React, { Component, PropTypes } from 'react';

export default class Auth extends Component {
    render() {
        const { onLoginClick, onLogoutClick, isAuthenticated, profile } = this.props;
        return (
            <div style={{ marginTop: '10px' }}>
                { !isAuthenticated ? (
                    <ul>
                        <li><button onClick={onLoginClick}>Login</button></li>
                    </ul>
                ) : (
                    <ul>
                        <li><img src={profile.picture} height="40px" /></li>
                        <li><span>Welcome, {profile.nickname}</span></li>
                        <li><button onClick={onLogoutClick}>Logout</button></li>
                    </ul>
                )}
            </div>
        )
    }
}

Auth.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    profile: PropTypes.object
};