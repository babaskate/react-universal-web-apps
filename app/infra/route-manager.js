import express from 'express';
import axios from 'axios';

import nconf from 'nconf';

import React from 'react'
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import baseManager from './base-manager';
import routes from '../routes';

import ContextWrapper from '../components/utils/ContextWrapper';
import Html from '../components/containers/Html';

const routeManager = Object.assign({}, baseManager, {

    configureDevelopmentEnv(app) {
        const apiRouter = this.createApiRouter();
        const pagesRouter = this.createPageRouter();
        app.use('/api', apiRouter);
        app.use('/', pagesRouter);
    },

    createPageRouter() {
        const router = express.Router();

        router.get('*', (req, res) => {
            match({routes, location: req.originalUrl}, (err, redirectLocation, renderProps) => {

                const {promises, components} = this.mapComponentsToPromises(
                    renderProps.components, renderProps.params);

                Promise.all(promises).then((values) => {

                    const data = this.prepareData(values, components);
                    const html = this.render(renderProps, data);

                    res.send('<!doctype html>\n' +
                        renderToString(<Html component={html} context={data} />));

                }).catch((err) => {
                    console.error(err);
                    res.status(500).send(err);
                });
            });
        });

        return router;
    },

    mapComponentsToPromises(components, params) {
        const filteredComponents = components.filter((Component) => {
            return (typeof Component.requestData === 'function');
        });

        const promises = filteredComponents.map(function(Component) {
            return Component.requestData(params, nconf.get('domain'));
        });

        return {promises, components: filteredComponents};
    },

    prepareData(values, components) {
        const map = {};

        values.forEach((value, index) => {
            map[components[0].NAME] = value.data;
        });

        return map;
    },

    render(renderProps, data) {
        let html = renderToString(
            <ContextWrapper data={data}>
                <RouterContext {...renderProps}/>
            </ContextWrapper>
        );

        return html;
    },


    createApiRouter(app) {

        const router = express.Router();

        this.createProductDetailRoute(router);

        return router;
    },
    createProductDetailRoute(router) {

        router.get('/products/:id', (req, res) => {

            this.retrieveProductDetails(req.params, (err, data) => {
                if(!err) {
                    res.json(data);
                } else {
                    res.status(500).send(err);
                }
            });
        });

    },
    retrieveProductDetails(params, callback) {

        const url = `http:\/\/localhost:3333/api/content/productPage/${params.id}`;

        console.info(`retrieveProductDetails:url: ${url}`);

        axios.get(url)
            .then((response) => {

                console.info(`axios success: ${response}`);

                callback(false, response);

            })
            .catch((error) => {

                console.error(`axios error: ${error}`);
                callback(error, {});

            });

    }

});

export default routeManager;
