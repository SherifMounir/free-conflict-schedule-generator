import API from '~/services/inventoryManagement.js'

const actions = {
    async GET_USERS_LOCATIONS({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_USERS_LOCATIONS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async ADD_USERS_LOCATION({ commit }, payload) {
        const data = await this.$axios.$post(API.ADD_USERS_LOCATION, {
            ...payload
        })
        return data
    },
    async GET_USERS_LOCATION_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_USERS_LOCATION_BY_ID(payload))
        return data
    },
    async UPDATE_USERS_LOCATION_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.UPDATE_USERS_LOCATION_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async REMOVE_USERS_LOCATION_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.REMOVE_USERS_LOCATION_BY_ID(payload))
        return data
    },
}

export default {
    actions
}