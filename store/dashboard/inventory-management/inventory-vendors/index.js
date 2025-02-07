import API from '~/services/inventoryManagement.js'

const actions = {
    async GET_VENDOR_SERIALS({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_VENDOR_SERIALS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async ADD_VENDOR_SERIALS({ commit }, payload) {
        const data = await this.$axios.$post(API.ADD_VENDOR_SERIALS, {
            ...payload
        })
        return data
    },
    async GET_VENDOR_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_VENDOR_BY_ID(payload))
        return data
    },
    async UPDATE_VENDOR_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.UPDATE_VENDOR_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async REMOVE_VENDOR_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.REMOVE_VENDOR_BY_ID(payload))
        return data
    },
}

export default {
    actions
}