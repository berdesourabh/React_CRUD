import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '684469387566-gj29nsqbkftcgq9obalk5nnks4puro0j.apps.googleusercontent.com',
                scope: 'email'
            }).then(() =>{
                this.auth = window.gapi.auth2.getAuthInstance();
                
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = (isSignedIn) => {
        this.auth.signOut();
    }
    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        }
        else if(this.props.isSignedIn) {
            return (<div>
                <button 
                    className ="ui red google button"
                    onClick={this.onSignOutClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            </div>);
        } else {
            return (<div>
                <button 
                    className ="ui blue google button"
                    onClick={this.onSignInClick}>
                    <i className="google icon" />
                    Sign In with Google
                </button>
            </div>);
        }
    }
    render() {
        return(
        <div>{this.renderAuthButton()}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
};
export default connect(mapStateToProps, {
    signIn, signOut
})(GoogleAuth);