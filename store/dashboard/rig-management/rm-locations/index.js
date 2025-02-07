import API from '~/services/rigManagementApis.js'

const actions = {
    async RM_GET_RIG_LOCATIONS({ commit }, payload) {
        const data = await this.$axios.$get(API.RM_GET_RIG_LOCATIONS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async RM_ADD_RIG_LOCATIONS({ commit }, payload) {
        const data = await this.$axios.$post(API.RM_ADD_RIG_LOCATIONS, {
            ...payload
        })
        return data
    },
    async RM_GET_RIG_LOCATIONS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.RM_GET_RIG_LOCATIONS_BY_ID(payload))
        return data
    },
    async RM_UPDATE_RIG_LOCATIONS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.RM_UPDATE_RIG_LOCATIONS_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async RM_REMOVE_RIG_LOCATIONS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.RM_REMOVE_RIG_LOCATIONS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}