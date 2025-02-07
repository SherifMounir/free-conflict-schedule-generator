import API from '~/services/orderManagementApis.js'

const actions = {

    async OM_GET_WORK_ORDER_STATUS({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_WORK_ORDER_STATUS,{
            params: {
                ...payload
            }
        })
        return data
    },

    async OM_ADD_WORK_ORDER_STATUS({ commit }, payload) {
        const data = await this.$axios.$post(API.OM_ADD_WORK_ORDER_STATUS, {
            ...payload
        })
        return data
    },

    async OM_UPDATE_WORK_ORDER_STATUS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.OM_UPDATE_WORK_ORDER_STATUS_BY_ID(payload.id), {
            ...payload
        })
        return data
    },

    async OM_GET_WORK_ORDER_STATUS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_WORK_ORDER_STATUS_BY_ID(payload))
        return data
    },

    async OM_GET_WORK_ORDER_STATUS_FILTER_BY_ID({ commit }, payload) {
        let url = new URLSearchParams(payload).toString();
        const data = await this.$axios.$get(API.OM_GET_WORK_ORDER_STATUS_FILTER_BY_ID(url))
        return data
    },

    async OM_REMOVE_WORK_ORDER_STATUS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.OM_REMOVE_WORK_ORDER_STATUS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}