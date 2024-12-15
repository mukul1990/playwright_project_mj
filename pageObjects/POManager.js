const{LoginPage}=require("../pageObjects/LoginPage");
const{DashBoard}=require("../pageObjects/DashBoard");
const{MyCart}=require("../pageObjects/MyCart");
const{PlaceOrder}=require("../pageObjects/PlaceOrder");
const{OrderConfirmation}=require("../pageObjects/OrderConfirmation");
const{OrderHistory}=require("../pageObjects/OrderHistory");
const{OrderSummary}=require("../pageObjects/OrderSummary");
class POManager
{
    constructor(page)
    {
        this.page = page;
        this.login=new LoginPage(this.page);
        this.dashBoard=new DashBoard(this.page);
        this.myCart=new MyCart(this.page);
        this.placeOrder=new PlaceOrder(this.page);
        this.orderConfirmation=new OrderConfirmation(this.page);
        this.orderHistory=new OrderHistory(this.page);
        this.orderSummary=new OrderSummary(this.page);
    }

    getLoginPage()
    {
        return this.login;
    }

    getDashBoard()
    {
        return this.dashBoard;
    }

    getMyCart()
    {
        return this.myCart;
    }   

    getPlaceOrder()
    {
        return this.placeOrder;
    }   

    getOrderConfirmation()
    {
        return this.orderConfirmation;
    }   

    getOrderHistory()
    {
        return this.orderHistory;
    }   

    getOrderSummary()
    {
        return this.orderSummary;
    }   

}

module.exports={POManager}  