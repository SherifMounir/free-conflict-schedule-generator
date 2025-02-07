import API from '~/services/configurationsApis.js'

const actions = {
    async GET_NOTIFICATIONS_TEPLATES_TYPES({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_NOTIFICATIONS_TEPLATES_TYPES,{
            params: {
                ...payload
            }
        })
        return data
    },
    async GET_NOTIFICATIONS_TEPLATES({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_NOTIFICATIONS_TEPLATES,{
            params: {
                ...payload
            }
        })
        return data
    },
    async ADD_NOTIFICATIONS_TEPLATES({ commit }, payload) {
        const data = await this.$axios.$post(API.ADD_NOTIFICATIONS_TEPLATES, {
            ...payload
        })
        return data
    },
    async GET_NOTIFICATIONS_TEPLATES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_NOTIFICATIONS_TEPLATES_BY_ID(payload))
        return data
    },
    async UPDATE_NOTIFICATIONS_TEPLATES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.UPDATE_NOTIFICATIONS_TEPLATES_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async REMOVE_NOTIFICATIONS_TEPLATES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.REMOVE_NOTIFICATIONS_TEPLATES_BY_ID(payload))
        return data
    },
}

export default {
    actions
}