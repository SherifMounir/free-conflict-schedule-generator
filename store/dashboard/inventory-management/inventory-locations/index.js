import API from '~/services/inventoryManagement.js'

const actions = {
    async GET_LOCATIONS({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_LOCATIONS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async GET_LOCATION_TYPES({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_LOCATION_TYPES,{
            params: {
                ...payload
            }
        })
        return data
    },
    async ADD_LOCATION({ commit }, payload) {
        const data = await this.$axios.$post(API.ADD_LOCATION, {
            ...payload
        })
        return data
    },
    async GET_LOCATION_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_LOCATION_BY_ID(payload))
        return data
    },
    async UPDATE_LOCATION_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.UPDATE_LOCATION_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async REMOVE_LOCATION_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.REMOVE_LOCATION_BY_ID(payload))
        return data
    },
}

export default {
    actions
}