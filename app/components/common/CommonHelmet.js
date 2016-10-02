import React from 'react';
import Helmet from 'react-helmet';

export default class CommonHelmet extends React.Component {

    render() {
        const {title, titleTemplate, defaultTitle, meta} = this.props;
        return (
            <Helmet
                title={title || ''}
                titleTemplate={titleTemplate || '%s - The Fresh Market'}
                defaultTitle={defaultTitle || 'The Fresh Market'}
                meta={meta || [
                    {name: 'description', content: 'The Fresh Market Default Description'},
                    {name: 'keywords', content: 'fresh, market, organic, awesome'}
                ]}
            />
        );
    }

}
