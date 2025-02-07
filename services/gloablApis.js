let base =  "";
export default {

    ////////////////////////////////
    //                            //
    //         Ui SERVICE         //
    //                            //
    ////////////////////////////////

    GET_SIDEBAR: base + '/auth/get-all-nav-menus',
    
    ////////////////////////////////
    //                            //
    //         Auth SERVICE       //
    //                            //
    ////////////////////////////////

    LOGIN: base + '/auth/login',
    RIGISTER: base + '/auth/login',
    RESET_PASSWORD: base + '/auth/resetPassword',
    LOGOUT: base + '/auth/logout',
    FORGOT_PASSWORD: base + '/auth/forgotPassword',
    CHECK_AUTH: 'https://tenant1.g8toafrica.com/api/auth/get-base-url-by-email',

}