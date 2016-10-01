import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from './components/app';
import NoMatch from './components/common/NoMatch';

import Dashboard from './components/dashboard/Dashboard';
import LatestBills from './components/bill/LatestBills';
import DetailedBill from './components/bill/DetailedBill';
import ProductDetail from './components/ProductDetail';

export default (
    <Route path="/" component={App}>
        <Route component={Dashboard}>
            <IndexRoute component={LatestBills}/>
            <Route path="bill/:id" component={DetailedBill}/>
        </Route>
        <Route path="product-detail/:id" component={ProductDetail}/>
        <Route path="*" component={NoMatch}/>
    </Route>
);
