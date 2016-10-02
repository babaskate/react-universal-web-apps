import React from 'react';

import Header from '../../components/main/Header';
import Footer from '../../components/main/Footer';

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
