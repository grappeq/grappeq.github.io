import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCopy, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import * as chroma from 'chroma-js';
import './App.css';
import photo from './photo.jpg';

library.add(faGithub, faLinkedin, faEnvelope, faCopy);

// to keep bots at bay
const EMAIL_ADDRESS = atob('a2FjcGVyQGdyYWJvdy5za2k=');

const MIN_CONTRAST_RATIO = 1.5;
const MY_FACE_REFERENCE_COLOR = chroma('#EEC4CF');

class App extends Component {
    constructor() {
        super();

        const { backgroundColor, foregroundColor } = this.generateNiceContrastingColors();
        this.state = {
            emailAddressHidden: true,
            backgroundColor,
            foregroundColor,
        };

        this.regenerateColors = this.regenerateColors.bind(this);
    }

    regenerateColors() {
        const { backgroundColor, foregroundColor } = this.generateNiceContrastingColors();
        this.setState({ backgroundColor, foregroundColor });
    }

    generateNiceContrastingColors() {
        while (true) {
            const { backgroundColor, foregroundColor } = this.generateMatchingColors();
            if (chroma.contrast(backgroundColor, foregroundColor) > MIN_CONTRAST_RATIO) {
                return { backgroundColor, foregroundColor };
            }
        }
    }

    generateMatchingColors() {
        const backgroundColor = chroma.random().saturate(2).luminance(0.8);
        const [hue, saturation, lightness] = backgroundColor.hsl();
        const foregroundColor = chroma.hsl(hue + 180 % 360, saturation, lightness);

        return { backgroundColor, foregroundColor };
    }

    textStyle() {
        return {
            color: this.state.foregroundColor
        };
    }

    backgroundStyle() {
        return {
            backgroundColor: this.state.backgroundColor
        };
    }

    photoStyle() {
        const [hueOfMyFace] = MY_FACE_REFERENCE_COLOR.hsv();
        const [foregroundColorHue] = this.state.foregroundColor.hsv();
        const hueDiff = foregroundColorHue - hueOfMyFace;

        return {
            filter: `hue-rotate(${hueDiff}deg) saturate(200%)`
        }
    }

    render() {
        return (
            <div className="app" style={this.backgroundStyle()}>
                <div className="app-body">
                    <img
                        src={photo}
                        className="photo"
                        style={this.photoStyle()}
                        alt="Me"
                        onClick={this.regenerateColors}
                    />
                    <div className="name" style={this.textStyle()}>
                        Kacper Grabowski
                    </div>
                    <div className="position" style={this.textStyle()}>
                        Software Engineer
                    </div>
                    <div className={`email ${this.state.emailAddressHidden ? "" : " expanded"}`}>
                        <FontAwesomeIcon
                            icon={['fas', 'envelope']}
                            className="email-icon"
                            onClick={() => {
                                this.setState({ emailAddressHidden: !this.state.emailAddressHidden });
                            }}
                            style={this.textStyle()}
                        />
                        {!this.state.emailAddressHidden && <div className="email-text">
                            <a href={`mailto:${EMAIL_ADDRESS}`} style={this.textStyle()}>
                                {EMAIL_ADDRESS}
                            </a>
                        </div>}
                    </div>
                </div>

                <div className="app-footer">
                    <a href="https://www.linkedin.com/in/grabowskikacper/">
                        <FontAwesomeIcon icon={['fab', 'linkedin']} style={this.textStyle()}/>
                    </a>

                    <a href="https://github.com/grappeq">
                        <FontAwesomeIcon icon={['fab', 'github']} style={this.textStyle()}/>
                    </a>
                </div>
            </div>
        );
    }
}

export default App;
