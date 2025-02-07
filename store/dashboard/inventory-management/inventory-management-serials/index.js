import API from '~/services/inventoryManagement.js'

const actions = {
    async GET_MANAGEMENT_SERIALS({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_MANAGEMENT_SERIALS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async ADD_MANAGEMENT_SERIALS({ commit }, payload) {
        const data = await this.$axios.$post(API.ADD_MANAGEMENT_SERIALS, {
            ...payload
        })
        return data
    },
    async GET_MANAGEMENT_SERIALS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_MANAGEMENT_SERIALS_BY_ID(payload))
        return data
    },

    
    async GET_MANAGEMENT_SERIALS_LIST_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_MANAGEMENT_SERIALS_LIST_BY_ID,{
            params: {
                ...payload
            }
        })
        return data
    },
    async UPDATE_MANAGEMENT_SERIALS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.UPDATE_MANAGEMENT_SERIALS_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async REMOVE_MANAGEMENT_SERIALS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.REMOVE_MANAGEMENT_SERIALS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}