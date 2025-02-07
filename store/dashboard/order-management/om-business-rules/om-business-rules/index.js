import API from '~/services/orderManagementApis.js'

const actions = {
    async OM_GET_BUSINESS_ROLES({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_BUSINESS_ROLES,{
            params: {
                ...payload
            }
        })
        return data
    },
    async OM_ADD_BUSINESS_ROLES({ commit }, payload) {
        const data = await this.$axios.$post(API.OM_ADD_BUSINESS_ROLES, {
            ...payload
        })
        return data
    },
    async OM_GET_BUSINESS_ROLES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_BUSINESS_ROLES_BY_ID(payload))
        return data
    },
    async OM_UPDATE_BUSINESS_ROLES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.OM_UPDATE_BUSINESS_ROLES_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async OM_REMOVE_BUSINESS_ROLES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.OM_REMOVE_BUSINESS_ROLES_BY_ID(payload))
        return data
    },
}

export default {
    actions
}