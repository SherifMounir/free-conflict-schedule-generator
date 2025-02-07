import API from '~/services/inventoryManagement.js'

const actions = {
    async GET_MANUFACTURERS({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_MANUFACTURERS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async ADD_MANUFACTURER({ commit }, payload) {
        const data = await this.$axios.$post(API.ADD_MANUFACTURER, {
            ...payload
        })
        return data
    },
    async GET_MANUFACTURER_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_MANUFACTURER_BY_ID(payload))
        return data
    },
    async UPDATE_MANUFACTURER_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.UPDATE_MANUFACTURER_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async REMOVE_MANUFACTURER_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.REMOVE_MANUFACTURER_BY_ID(payload))
        return data
    },
}

export default {
    actions
}