import API from '~/services/assetsManagementApis.js'

const actions = {

    async AM_GET_LOGS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.AM_GET_LOGS_BY_ID(payload))
        return data
    },
    
}

export default {
    actions
}