import API from '~/services/rigManagementApis.js'

const actions = {
    async RM_GET_RIGS({ commit }, payload) {
        const data = await this.$axios.$get(API.RM_GET_RIGS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async RM_ADD_RIGS({ commit }, payload) {
        const data = await this.$axios.$post(API.RM_ADD_RIGS, {
            ...payload
        })
        return data
    },
    async RM_GET_RIGS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.RM_GET_RIGS_BY_ID(payload))
        return data
    },
    async RM_UPDATE_RIGS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.RM_UPDATE_RIGS_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async RM_REMOVE_RIGS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.RM_REMOVE_RIGS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}