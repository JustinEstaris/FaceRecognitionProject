import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onEmailChange = (event) => { // Event Listener on email
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => { // Event Listener on password
        this.setState({ password: event.target.value })
    }

    onNameChange = (event) => { // Event Listener on name
        this.setState({ name: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ // Convert data to JSON for the server to understand
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json()) // Convert Data into a JavaScript object the program can use.
            .then(user => {
                if (user) {
                    this.props.loadUser(user) // Load the user by calling the loadUser() function in App.js
                    this.props.onRouteChange('home'); // call the onRouteChange() function in App.js - Go to Home Screen
                }
            })
    }

    render() {
        return (

            <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center' >
                <main className='pa4 black-80'>
                    <div className='measure'>
                        <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
                            <legend className='f1 fw6 ph0 mh0'>Register</legend>
                            <div className='mt3'>
                                <label className='db fw6 lh-copy f6' htmlFor='name'>Name</label>
                                <input
                                    onChange={this.onNameChange}
                                    className='pa2 input-reset ba bg-transparent gover-bg-black hover-white w-100'
                                    type="text"
                                    name="name"
                                    id="name" />
                            </div>
                            <div className='mt3'>
                                <label className='db fw6 lh-copy f6' htmlFor='email-address'>Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className='pa2 input-reset ba bg-transparent gover-bg-black hover-white w-100'
                                    type="email"
                                    name="e-mail address"
                                    id="email-address" />
                            </div>
                            <div className='mv3'>
                                <label className='db fw6 lh-copy f6' htmlFor='password'>Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                                    type="password"
                                    name="password"
                                    id="password" />
                            </div>
                        </fieldset>
                        <div className=''>
                            <input
                                onClick={this.onSubmitSignIn} // When it's clicked - call the onRouteChange() function in App.js
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;