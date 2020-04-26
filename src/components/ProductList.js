import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import {ProductConsumer} from "../context";
class ProductList extends Component {
    constructor(props){
        super(props)
        this.state = {
            products:[],
        }
    }
    render() {
        return (
            <React.Fragment>
             <div className="py-5">
                <div className="container">
                    <Title name="our" title="product"></Title>
                    <div className="row">
                        <ProductConsumer>
                            {(productValues)=> {
                                return productValues.products.map((product)=>{
                                    return <Product key={product.id} product={product}/>;
                                });
                            }}
                        </ProductConsumer>
                    </div>
                </div>
             </div>
            </React.Fragment>
        );
    }
}

export default ProductList;
