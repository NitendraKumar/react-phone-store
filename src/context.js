import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvier extends Component {
    constructor(props){
        super(props)
        this.state = {
            products:[],
            detailProduct: detailProduct,
            cart:[],
            modalOpen:false,
            modalProduct: detailProduct,
            cartSubTotal:0,
            cartTax:0,
            cartTotal:0,
        }
        this.handleDetail = this.handleDetail.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.getItem = this.getItem.bind(this);
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.increment= this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.clearCart = this.clearCart.bind(this)
        this.addTotals = this.addTotals.bind(this)
        this.setProducts = this.setProducts.bind(this)
    }
    componentDidMount(){
        this.setProducts();
    }
    setProducts(){
        let tempProducts = []
        storeProducts.forEach((item) => {
            const singleProduct = {...item}
            tempProducts = [...tempProducts, singleProduct]
        })
        this.setState(()=>{
            return {products:tempProducts}
        });
    }

    getItem(id){
        const product = this.state.products.find(item => item.id === id);
        return product
    }
    
    handleDetail(id){
        // const product = this.getItem(id)
        const product = this.state.products.find(item => item.id === id);
        this.setState(()=> {
            return {detailProduct: product}
        })
    }
    addToCart(id){
       let tempProducts = [...this.state.products]
       const index = tempProducts.indexOf(this.getItem(id))
       const product = tempProducts[index]
       product.inCart = true
       product.count = 1 
       const price = product.price
       product.total = price
       
       this.setState(() => {
           return {products : tempProducts,
            cart:[...this.state.cart, product]}
       }, ()=> {
           this.addTotals();
       })

    }

    openModal(id){
        const product = this.getItem(id)
        this.setState(()=>{
            return { 
                modalProduct:product, 
                modalOpen:true,
            }
        })
    }
    closeModal(){
        this.setState(()=>{
            return {modalOpen:false}
        })
    }

    increment(id){
        let tempCart = [...this.state.cart]
        let selectedProduct =tempCart.find((item)=> item.id === id);

        selectedProduct.count = selectedProduct.count + 1;
        selectedProduct.total = selectedProduct.price * selectedProduct.count;

        this.setState(()=>{
            return {cart:[...tempCart]}
        }, ()=> {this.addTotals()})
    }

    
    decrement(id){
        let tempCart = [...this.state.cart]
        let selectedProduct =tempCart.find((item)=> item.id === id);

        selectedProduct.count = selectedProduct.count - 1;

        
        
        if(selectedProduct.count === 0){
            console.log(selectedProduct.count)
            this.removeItem(id)
        }
        else {
            selectedProduct.total = selectedProduct.price* selectedProduct.count;

            this.setState(()=> {
                return {cart : [...tempCart]}
            }, ()=>{this.addTotals()})
        }
    }

    removeItem(id){
        let tempProduct = [...this.state.products];
        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter((item)=> item.id !== id)

        const index = tempProduct.indexOf(this.getItem(id))
        let removedProduct = tempProduct[index]
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(()=>{
            return {cart: [...tempCart],
            products:[...tempProduct]}
        },()=>{this.addTotals()})
    }

    clearCart(){
       this.setState(()=>{
           return {cart:[]}
       }, ()=>{
           this.setProducts();
           this.addTotals()
       })
    }

    addTotals(){
        let subTotal = 0;
        this.state.cart.map((item) => subTotal += item.total);
        const tempTax = subTotal*0.1;
        const tax =  parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=> {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={
                {
                    ...this.state,
                    handleDetail:this.handleDetail,
                    addToCart:this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart:this.clearCart,
                }
            }>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}
const ProductConsumer = ProductContext.Consumer;
export {ProductProvier, ProductConsumer};