import API from '~/services/gloablApis.js'

const actions = {
    async GET_SIDEBAR({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_SIDEBAR)
        return data
    },
}

export default {
    actions
}