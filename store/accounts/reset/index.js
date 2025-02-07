import API from '~/services/gloablApis.js'

const actions = {
    
    async FORGOT_PASSWORD({ commit }, payload) {
        const data = await this.$axios.$post(API.FORGOT_PASSWORD, {...payload})
        return data
    },
    
}

export default {
    actions
}