import React from 'react';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

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
