import API from '~/services/assetsManagementApis.js'

const actions = {
    async OM_GET_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE,{
            params: {
                ...payload
            }
        })
        return data
    },
    async OM_ADD_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE({ commit }, payload) {
        const data = await this.$axios.$post(API.OM_ADD_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE, {
            ...payload
        })
        return data
    },
    async OM_GET_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_BY_ID(payload))
        return data
    },
    async OM_UPDATE_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.OM_UPDATE_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async OM_REMOVE_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.OM_REMOVE_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_BY_ID(payload))
        return data
    },
}

export default {
    actions
}