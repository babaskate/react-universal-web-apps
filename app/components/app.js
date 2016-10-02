import React from 'react';

import Header from './main/Header';
import Footer from './main/Footer';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header root={this.props.route.path} />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
