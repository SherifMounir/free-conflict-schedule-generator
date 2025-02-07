import API from '~/services/gloablApis.js'

const actions = {
    
    async CHANGE_MY_PASSWORD({ commit }, payload) {
        const data = await this.$axios.$post(API.RESET_PASSWORD, {...payload})
        return data
    },
    
}

export default {
    actions
}