import React from 'react';
import axios from 'axios';

export default class ProductDetail extends React.Component {
    static get NAME() {
        return 'ProductDetail';
    }

    static get contextTypes() {
        return {
            data: React.PropTypes.object
        };
    }

    static requestData(params, domain) {
        console.info(`ProductDetail:requestData:${params.id}`);
        this.domain = domain;
        return axios.get(`${domain}/api/product-detail/${params.id}`);
    }

    constructor(props, context) {
        console.info('props:', props);
        console.info('context:', context);

        super(props, context);
        this.domain = '';
        this.state = context.data[ProductDetail.NAME].data || {};

        console.info('product:', this.state);
    }

    render() {
        return (
            <div>
                <h2>{this.state.product.title}</h2>
                <div>
                    <h4>{this.state.product.price}</h4>
                    <img src={this.state.product.image.url} />
                    <p>{this.state.product.details}</p>
                    <p>Available: {this.state.product.available.toString()}</p>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.constructor.requestData(this.props.params, this.domain)
            .then((response) => {
                console.log(response.data);
                this.setState(response.data);
            }).catch((err) => {
                throw new Error(err);
            });
    }
}
