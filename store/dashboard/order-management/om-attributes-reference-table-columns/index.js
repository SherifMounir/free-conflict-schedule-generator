import API from '~/services/orderManagementApis.js'

const actions = {
    async OM_GET_ATTRIBUTES_REFERENCE_TABLE_COLUMNS({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_ATTRIBUTES_REFERENCE_TABLE_COLUMNS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async OM_ADD_ATTRIBUTES_REFERENCE_TABLE_COLUMNS({ commit }, payload) {
        const data = await this.$axios.$post(API.OM_ADD_ATTRIBUTES_REFERENCE_TABLE_COLUMNS, {
            ...payload
        })
        return data
    },
    async OM_GET_ATTRIBUTES_REFERENCE_TABLE_COLUMNS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_ATTRIBUTES_REFERENCE_TABLE_COLUMNS_BY_ID(payload))
        return data
    },
    async OM_UPDATE_ATTRIBUTES_REFERENCE_TABLE_COLUMNS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.OM_UPDATE_ATTRIBUTES_REFERENCE_TABLE_COLUMNS_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async OM_REMOVE_ATTRIBUTES_REFERENCE_TABLE_COLUMNS_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.OM_REMOVE_ATTRIBUTES_REFERENCE_TABLE_COLUMNS_BY_ID(payload))
        return data
    },
}

export default {
    actions
}