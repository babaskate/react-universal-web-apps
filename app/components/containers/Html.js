import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

export default class Html extends Component {

    render() {
        const {component, context} = this.props;
        const content = component ? component : '';
        const head = Helmet.rewind();

        return (
            <html lang="en-us">
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="shortcut icon" href="/assets/favicon.ico?v=004" type="image/x-icon" />
                    <link rel="stylesheet" href="/assets/css/main.css" />
                </head>
                <body>
                  <div data-ui-role="content" id="content" dangerouslySetInnerHTML={{__html: content}}/>
                  <script dangerouslySetInnerHTML={{__html: `window.APP_STATE=${serialize(context)};`}} charSet="UTF-8"/>
                  <script src="/assets/js/app.js" defer></script>
                </body>
            </html>
        );
    }
}
