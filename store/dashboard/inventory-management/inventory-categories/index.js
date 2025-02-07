import API from '~/services/inventoryManagement.js'

const actions = {
    async GET_CATEGORIES({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_CATEGORIES,{
            params: {
                ...payload
            }
        })
        return data
    },
    async GET_ALL_CATEGORIES({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_ALL_CATEGORIES,{
            params: {
                ...payload
            }
        })
        return data
    },
    async ADD_CATEGORIES({ commit }, payload) {
        const data = await this.$axios.$post(API.ADD_CATEGORIES, {
            ...payload
        })
        return data
    },
    async GET_CATEGORIES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_CATEGORIES_BY_ID(payload))
        return data
    },
    async UPDATE_CATEGORIES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.UPDATE_CATEGORIES_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async REMOVE_CATEGORIES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.REMOVE_CATEGORIES_BY_ID(payload))
        return data
    },
}

export default {
    actions
}