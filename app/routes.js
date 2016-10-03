import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from './components/containers/App';
import NoMatch from './components/common/NoMatch';

import Main from './components/containers/Main';
import Home from './components/containers/Home';
import ProductDetail from './components/containers/ProductDetail';

export default (
    <Route path="/" component={App}>
        <Route component={Main}>
            <IndexRoute component={Home}/>
            <Route path="products/:id" component={ProductDetail}/>
        </Route>
        <Route path="*" component={NoMatch}/>
    </Route>
);
