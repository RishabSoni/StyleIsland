
import { BaseUrl } from '../utilities';

const headers = (type, auth) => {

    if(auth) {
        return {
            'apiconnection': 'appmobile',
            'apikey': '096c6df428df22aabae92dbd70d9b0ec',
            'Content-Type': type == 'Form' ? 'multipart/form-data; ' : 'application/json',
            "Authorization": "Basic U3R5bGVfQVBJX0lzbGFuZDo2bXV1aCt1UTBPVjZuendTOHRRL2hRPT0=",
            'Accept' : 'application/json'
        }
    } else {
        return {
            'apiconnection': 'appmobile',
            'apikey': '096c6df428df22aabae92dbd70d9b0ec',
            'Content-Type': type == 'Form' ? 'multipart/form-data; ' : 'application/json',
            'Accept' : 'application/json'
        }
    }    
}


export const getCategories = () => {
    return fetch(`${BaseUrl}/api/categories`, {
        method: 'get',
        headers: headers()
    })
}

export const getCategoryProduct = (catId) => {
    return fetch(`${BaseUrl}/api/products/${catId}`, {
        method: 'get',
        headers: headers()
    })
}

export const getProductDetails = (productId, catId) => {
    return fetch(`${BaseUrl}/api/product/${productId}/${catId}`, {
        method: 'get',
        headers: headers()
    })
}

export const HomeApi = () => {
    return fetch(`${BaseUrl}/api/home`, {
        method: 'get',
        headers: headers()
    })
}

export const ApiCall = (url, method, body, type , auth) => {
    console.log({
        method: method,
        headers: headers(type , auth),
        body: body
    })
    return fetch(url, {
        method: method,
        headers: headers(type , auth),
        body: body
    })
}