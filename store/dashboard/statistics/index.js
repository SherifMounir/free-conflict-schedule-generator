import API from '~/services/statisticsApis.js'

const actions = {
    async GET_DASHBOARD_COUNTS({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_DASHBOARD_COUNTS)
        return data
    },
    async GET_DASHBOARD_REAL_TIME_WO_STATUS({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_DASHBOARD_REAL_TIME_WO_STATUS)
        return data
    },
    async GET_DASHBOARD_PRIORITY_PENDING_WO({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_DASHBOARD_PRIORITY_PENDING_WO,{
            params: {
                ...payload
            }
        })
        return data
    },
    async GET_DASHBOARD_COMPLETED_WORK_ORDER_AGING({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_DASHBOARD_COMPLETED_WORK_ORDER_AGING)
        return data
    },
}

export default {
    actions
}