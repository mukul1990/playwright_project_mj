import { test, expect, request } from "@playwright/test";
import { readFileSync } from 'fs';
const jsonData = readFileSync('dataPayLoad/loginPayLoad.json', 'utf8');
const jsonData2 = readFileSync('dataPayLoad/createOrderPayload.json', 'utf8');
const loginData = JSON.parse(jsonData);
const orderData = JSON.parse(jsonData2);
class APIUtils
{
    
    constructor(apiContext)
    {
        this.apiContext=apiContext
    }


    async getToken()
    {
        const loginResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
            data:loginData
    })
    let token 
    const statusCode = await loginResponse.status();
if (statusCode === 400) {
    console.error('Bad Request');
  } else if (statusCode === 200) {
    const responseBody = await loginResponse.json();
    console.log(responseBody);
expect(loginResponse.status()).toBe(200);
 token = responseBody.token;
  }
  else {
    console.error('Unknown error');
  }
  return token
}

async createOrder()
{
     const token2 = await this.getToken();
    const tokenString = token2.toString();
    const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data: orderData,
        headers:{
            "Authorization": tokenString,
            "Content-Type": "application/json",
        }
    })
    const orderResponse = await createOrderResponse.json();
    return { status: createOrderResponse.status(), data: orderResponse };
}

}
module.exports ={APIUtils};
