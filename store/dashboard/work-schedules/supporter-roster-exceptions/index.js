import API from '~/services/workSchedulesApis.js'

const actions = {
    async WS_GET_OM_SUPPORTER_ROSTER_EXCEPTIONS({ commit }, payload) {
        const data = await this.$axios.$get(API.WS_GET_OM_SUPPORTER_ROSTER_EXCEPTIONS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async WS_ADD_OM_SUPPORTER_ROSTER_EXCEPTIONS({ commit }, payload) {
        const data = await this.$axios.$post(API.WS_ADD_OM_SUPPORTER_ROSTER_EXCEPTIONS, {
            ...payload
        })
        return data
    },
    async WS_GET_OM_SUPPORTER_ROSTER_EXCEPTIONS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.WS_GET_OM_SUPPORTER_ROSTER_EXCEPTIONS_BY_ID(payload))
        return data
    },
    async WS_UPDATE_OM_SUPPORTER_ROSTER_EXCEPTIONS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.WS_UPDATE_OM_SUPPORTER_ROSTER_EXCEPTIONS_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async WS_REMOVE_OM_SUPPORTER_ROSTER_EXCEPTIONS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.WS_REMOVE_OM_SUPPORTER_ROSTER_EXCEPTIONS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}