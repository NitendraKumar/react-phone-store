import React, { Component } from 'react';
import styled from 'styled-components'
import {ProductConsumer} from '../context'
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';


class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const {modalOpen, closeModal} = value
                    const {img, price, title} = value.modalProduct;
                    console.log(modalOpen)
                    if (!modalOpen) {
                        return null
                    } 
                    else {
                        return (
                        <ModalContainer>
                            <div className="containner">
                                <div className="row">
                                    <div id= 'modal' className='col-10 mx-auto col-md-6 col-lg-10 text-center text-capitalize p-5'>
                                       <h5>item Added to the cart</h5>
                                       <img className='img-fluid' src={img} alt="product"/>
                                        <h5>{title}</h5>
                                        <h5 className="text-muted">Price : ${price}</h5>
                                        <Link to="/">
                                            <ButtonContainer onClick={()=> closeModal()}>
                                                continue shopping
                                            </ButtonContainer>
                                        </Link>
                                        <Link to="/cart">
                                            <ButtonContainer cart onClick={()=> closeModal()}>
                                                go to cart
                                            </ButtonContainer>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </ModalContainer>
                        )
                        
                    }
                }}
            </ProductConsumer>
        )
    }
}

export default Modal;

const ModalContainer = styled.div`
    position:fixed;
    top:0;
    bottom:0;
    right:0;
    left:0;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items:center;
    justify-content: center;

    #modal {
        background:var(--mainWhite);
    }
`