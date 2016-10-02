import React from 'react';
import CommonHelmet from '../../common/CommonHelmet';

export default class ProductDetailHelmet extends CommonHelmet {

    render() {
        const {seo} = this.props;
        return (
            <CommonHelmet
                title={seo.title}
                meta={[
                    {name: 'description', content: seo.description},
                    {name: 'keywords', content: seo.keywords},
                    {name: 'robots', content: seo.robots},
                    {name: 'canonical', content: seo.canonical !== 'none' ? seo.canonical : ''}
                ]}
            />
        );
    }

}
