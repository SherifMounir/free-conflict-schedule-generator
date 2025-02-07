import API from '~/services/orderManagementApis.js'

const actions = {
    async OM_GET_SUPPORTS({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_SUPPORTS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async OM_ADD_SUPPORTS({ commit }, payload) {
        const data = await this.$axios.$post(API.OM_ADD_SUPPORTS, {
            ...payload
        })
        return data
    },
    async OM_GET_SUPPORTS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_SUPPORTS_BY_ID(payload))
        return data
    },
    async OM_UPDATE_SUPPORTS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.OM_UPDATE_SUPPORTS_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async OM_REMOVE_SUPPORTS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.OM_REMOVE_SUPPORTS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}