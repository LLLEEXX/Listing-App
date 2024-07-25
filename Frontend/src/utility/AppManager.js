import Cookies from 'js-cookie';

// Function to get the token from the cookie
export function getApp() {
    return Cookies.get('App');
}

// Function to set the token in the cookie
export function setApp(token) {
    Cookies.set('App', token, {sameSite: 'Lax'});
}

// Function to remove the token from the cookie
export function removeApp() {
    Cookies.remove('App');
}


export function setLoggedIn(Logged) {
    return sessionStorage.setItem('Logged', Logged);
}

export function getLoggedIn() {
    const logged = sessionStorage.getItem('Logged');
    return logged !== null ? logged : false;
}

// Function to remove the token from the cookie
export function removeLoggedIn() {
    sessionStorage.removeItem('Logged');
}


export function setAppName(name) {
    return sessionStorage.setItem('name', name);
}

export function getAppName() {
    return sessionStorage.getItem('name');
}

export function removeAppName() {
    sessionStorage.removeItem('name');
}

export function setBuyInfo(InquireInfo){
    const serializedData = JSON.stringify(InquireInfo);
    Cookies.set('InquireInfo', serializedData, {sameSite: 'Lax'});
}

export function getBuyInfo(){
    return Cookies.get('InquireInfo');
}

export function removeBuyInfo(){
    Cookies.remove('InquireInfo');
}