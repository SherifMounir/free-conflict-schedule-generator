import API from '~/services/workSchedulesApis.js'

const actions = {
    async WS_GET_OM_SUPPORTER_ROSTERS({ commit }, payload) {
        const data = await this.$axios.$get(API.WS_GET_OM_SUPPORTER_ROSTERS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async WS_ADD_OM_SUPPORTER_ROSTERS({ commit }, payload) {
        const data = await this.$axios.$post(API.WS_ADD_OM_SUPPORTER_ROSTERS, {
            ...payload
        })
        return data
    },
    async AM_GET_OM_SUPPORTER_ROSTERS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.AM_GET_OM_SUPPORTER_ROSTERS_BY_ID(payload))
        return data
    },
    async AM_UPDATE_OM_SUPPORTER_ROSTERS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.AM_UPDATE_OM_SUPPORTER_ROSTERS_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async AM_REMOVE_OM_SUPPORTER_ROSTERS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.AM_REMOVE_OM_SUPPORTER_ROSTERS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}