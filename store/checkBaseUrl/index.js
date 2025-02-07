import API from '~/services/gloablApis.js'

const actions = {
    
    async CHECK_AUTH({ commit }, payload) {
        const data = await this.$axios.$get(API.CHECK_AUTH, {
            params: {
                'email': payload
            }
        })
        localStorage.setItem('serviceUrl', data.content+'/api')
        this.$axios.defaults.baseURL = data.content +'/api' 
        return data
    },
    
}

export default {
    actions
}