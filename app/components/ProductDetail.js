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
        return axios.get(`${domain}/api/product-detail/${params.id}`);
    }

    constructor(props, context) {
        super(props, context);
        this.state = context.data[ProductDetail.NAME].data || {};
        console.info('product:', this.state);
    }

    render() {
        return (
            <div class="hero-unit">
                <h2>{this.state.product.title}</h2>
                <div class="col-main nine columns push-three offset-content">
                    <h4>{this.state.product.price}</h4>
                    <img src={this.state.product.image.url} />
                    <p>{this.state.product.details}</p>
                    <p>Available: {this.state.product.available}</p>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.constructor.requestData(this.props.params).then((response) => {
            this.setState(response.data);
        }).catch((err) => {
            throw new Error(err);
        });
    }
}
