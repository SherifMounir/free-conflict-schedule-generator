import API from '~/services/assetsManagementApis.js'

const actions = {
    async AM_GET_ASSETS({ commit }, payload) {
        const data = await this.$axios.$get(API.AM_GET_ASSETS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async AM_ADD_ASSETS({ commit }, payload) {
        const data = await this.$axios.$post(API.AM_ADD_ASSETS, {
            ...payload
        })
        return data
    },
    async AM_GET_ASSETS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.AM_GET_ASSETS_BY_ID(payload))
        return data
    },
    async AM_UPDATE_ASSETS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.AM_UPDATE_ASSETS_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async AM_REMOVE_ASSETS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.AM_REMOVE_ASSETS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}