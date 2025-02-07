import API from '~/services/assetsManagementApis.js'

const actions = {
    async OM_GET_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async OM_ADD_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS({ commit }, payload) {
        const data = await this.$axios.$post(API.OM_ADD_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS, {
            ...payload
        })
        return data
    },
    async OM_GET_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS_BY_ID(payload))
        return data
    },
    async OM_UPDATE_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.OM_UPDATE_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async OM_REMOVE_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.OM_REMOVE_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}