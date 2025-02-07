import API from '~/services/orderManagementApis.js'

const actions = {
    async OM_GET_BUSINESS_ROLES_TYPES({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_BUSINESS_ROLES_TYPES,{
            params: {
                ...payload
            }
        })
        return data
    },
    async OM_GET_BUSINESS_RULE_EXECUTION_TYPES({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_BUSINESS_RULE_EXECUTION_TYPES,{
            params: {
                ...payload
            }
        })
        return data
    },
}

export default {
    actions
}