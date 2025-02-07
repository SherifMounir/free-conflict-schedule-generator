import API from '~/services/assetsManagementApis.js'

const actions = {
    async OM_GET_PREVENTIVE_MAINTENANCE({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_PREVENTIVE_MAINTENANCE,{
            params: {
                ...payload
            }
        })
        return data
    },
    
    async OM_ADD_PREVENTIVE_MAINTENANCE({ commit }, payload) {
        const data = await this.$axios.$post(API.OM_ADD_PREVENTIVE_MAINTENANCE, {
            ...payload
        })
        return data
    },
    async OM_GET_PREVENTIVE_MAINTENANCE_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_PREVENTIVE_MAINTENANCE_BY_ID(payload))
        return data
    },
    async OM_UPDATE_PREVENTIVE_MAINTENANCE_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.OM_UPDATE_PREVENTIVE_MAINTENANCE_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async OM_REMOVE_PREVENTIVE_MAINTENANCE_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.OM_REMOVE_PREVENTIVE_MAINTENANCE_BY_ID(payload))
        return data
    },

    async OM_GET_PREVENTIVE_MAINTENANC_BY_ASSET_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_PREVENTIVE_MAINTENANC_BY_ASSET_ID(payload), {
            ...payload
        })
        return data
    },
    async OM_CREATE_PREVENTIVE_MAINTENANC_MANUAL({ commit }, payload) {
        const data = await this.$axios.$post(API.OM_CREATE_PREVENTIVE_MAINTENANC_MANUAL(payload), {
            ...payload
        })
        return data
    },
}

export default {
    actions
}