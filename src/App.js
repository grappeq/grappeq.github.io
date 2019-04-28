import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCopy } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import photo from './photo.jpg';

library.add(faGithub, faLinkedin, faEnvelope, faCopy);

// to keep bots at bay
const EMAIL_ADDRESS = atob('a2FjcGVyQGdyYWJvdy5za2k=');

class App extends Component {
    constructor() {
        super();

        this.state = {
            emailAddressHidden: true
        };
    }

    render() {
        return (
            <div className="App">
                <section className="hero is-fullheight is-light">
                    <div className="hero-body">
                        <div className="container central-text">
                            <img src={photo} className="photo" alt="Me"/>
                            <h2 className="name title is-2">
                                Kacper Grabowski
                            </h2>
                            <h4 className="position subtitle is-4">
                                Software Engineer
                            </h4>
                            <h5 className={`email subtitle is-5${this.state.emailAddressHidden ? "" : " expanded"}`}>
                                <FontAwesomeIcon
                                    icon={['fas', 'envelope']}
                                    className="email-icon"
                                    onClick={() => {
                                        this.setState({ emailAddressHidden: false });
                                    }}
                                />
                                {!this.state.emailAddressHidden && <div className="email-text">
                                    <a href={`mailto:${EMAIL_ADDRESS}`}>
                                        {EMAIL_ADDRESS}
                                    </a>
                                </div>}
                            </h5>
                        </div>
                    </div>

                    <div className="hero-foot">
                        <div className="container">
                            <div className="tabs is-centered">
                                <ul className="links">
                                    <li>
                                        <a href="https://www.linkedin.com/in/grabowskikacper/">
                                            <FontAwesomeIcon icon={['fab', 'linkedin']}/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/grappeq">
                                            <FontAwesomeIcon icon={['fab', 'github']}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
