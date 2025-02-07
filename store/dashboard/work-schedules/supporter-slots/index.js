import API from '~/services/workSchedulesApis.js'

const actions = {
    async WS_GET_OM_SUPPORTER_SLOTS({ commit }, payload) {
        const data = await this.$axios.$get(API.WS_GET_OM_SUPPORTER_SLOTS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async WS_GET_OM_SUPPORTER_SLOTS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.WS_GET_OM_SUPPORTER_SLOTS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}