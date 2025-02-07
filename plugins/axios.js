import mixin from "./mixin"
export default function({ app, store, $axios, redirect }) {

    let baseUrl = localStorage.getItem('serviceUrl')

    $axios.setBaseURL(baseUrl)

    $axios.onResponse(res => {
        $axios.setHeader('Accept-Language', app.i18n.localeProperties.code);
        if(store.$auth.$state.loggedIn == true) {
            if(res.status == 200 && res.data.result == false) {
                let finalArray = []
                let message = res.data.msg
                if(message.constructor === String) {
                    mixin.errorMessage('Error', res.data.msg);
                }else {
                    for(let data in res.data.msg) {
                        for(let f of res.data.msg[data]) {
                            finalArray.push(f)
                        }
                    }
                    mixin.errorMultiMessage(finalArray);
                }


            }
        }
    })


    $axios.onRequest(config => {
        $axios.setHeader('Accept-Language', app.i18n.localeProperties.code);
    })


    $axios.onError(err => {
        if(store.$auth.$state.loggedIn == true) {
            const errorCode = [400, 403, 406, 500, 401, 405, 404]
            if(errorCode.includes(err.status)) {
                let finalErrorArray = []
                for(let data in err.data.message) {
                    for(let f of res.data.msg[data]) {
                        finalErrorArray.push(f)
                    }
                }
                mixin.errorMultiMessage(finalErrorArray);
            }
            if(errorCode.includes(500)) {
                let error = err.response.data.message || err.response.data.msg
                mixin.messageToast(error, 'bottom-end', 'error-toast', '<i class="bi bi-x-circle"></i>')
            }
            if(err.status == 404) {
                redirect("error/404")
            }

        }else {

        }
    })
}
