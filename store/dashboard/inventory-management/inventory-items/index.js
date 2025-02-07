import API from '~/services/inventoryManagement.js'

const actions = {
    async GET_ITEMS({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_ITEMS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async ADD_ITEMS({ commit }, payload) {
        const data = await this.$axios.$post(API.ADD_ITEMS, {
            ...payload
        })
        return data
    },
    async GET_ITEMS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_ITEMS_BY_ID(payload))
        return data
    },
    async UPDATE_ITEMS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.UPDATE_ITEMS_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async REMOVE_ITEMS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.REMOVE_ITEMS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}