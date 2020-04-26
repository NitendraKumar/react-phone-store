import React from 'react';
import Title from '../Title'

const EmptyCart = () => {
    return (
        <div className='container'>
            <div className="row">
                <div className="col-10 mx-auto text-center text-title mt-5">
                    <Title cart name = 'current' title="cart is empty"/>
                    
                </div>
            </div>
            
        </div>
    );
}

export default EmptyCart;
