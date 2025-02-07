import API from '~/services/orderManagementApis.js'

const actions = {

    async OM_GET_SUPPORT_GROUP_SUPPORTERS({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_SUPPORT_GROUP_SUPPORTERS,{
            params: {
                ...payload
            }
        })
        return data
    },

    async OM_ADD_SUPPORT_GROUP_SUPPORTERS({ commit }, payload) {
        const data = await this.$axios.$post(API.OM_ADD_SUPPORT_GROUP_SUPPORTERS, {
            ...payload
        })
        return data
    },

    async OM_GET_SUPPORT_GROUP_SUPPORTERS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_SUPPORT_GROUP_SUPPORTERS_BY_ID(payload))
        return data
    },
    
    async OM_GET_SUPPORT_GROUP_SUPPORTSERS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_SUPPORT_GROUP_SUPPORTSERS_BY_ID(payload))
        return data
    },


    async OM_UPDATE_SUPPORT_GROUP_SUPPORTERS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.OM_UPDATE_SUPPORT_GROUP_SUPPORTERS_BY_ID(payload.id), {
            ...payload
        })
        return data
    },

    async OM_REMOVE_SUPPORT_GROUP_SUPPORTERS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.OM_REMOVE_SUPPORT_GROUP_SUPPORTERS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}