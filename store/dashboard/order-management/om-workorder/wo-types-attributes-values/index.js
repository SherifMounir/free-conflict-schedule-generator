import API from '~/services/orderManagementApis.js'

const actions = {

    async OM_GET_WORK_ORDER_TYPE_ATTRIBUTE_VALUES({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_WORK_ORDER_TYPE_ATTRIBUTE_VALUES,{
            params: {
                ...payload
            }
        })
        return data
    },

    async OM_ADD_WORK_ORDER_TYPE_ATTRIBUTE_VALUES({ commit }, payload) {
        const data = await this.$axios.$post(API.OM_ADD_WORK_ORDER_TYPE_ATTRIBUTE_VALUES, {
            ...payload
        })
        return data
    },

    async OM_UPDATE_WORK_ORDER_TYPE_ATTRIBUTE_VALUES_BY_ID({ commit }, payload) {
        const headers = { 
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const urlencoded = new URLSearchParams();
        urlencoded.append("work_order_type_attribute_id", payload.work_order_type_attribute_id);
        urlencoded.append("notes", payload.notes);
        urlencoded.append("active", payload.active);
        for(let v of payload.values) {
            urlencoded.append("values[]", v);
        }
        const data = await this.$axios.$put(API.OM_UPDATE_WORK_ORDER_TYPE_ATTRIBUTE_VALUES_BY_ID, urlencoded , { headers })
        return data
    },

    async OM_GET_WORK_ORDER_TYPE_ATTRIBUTE_VALUES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_WORK_ORDER_TYPE_ATTRIBUTE_VALUES_BY_ID(payload))
        return data
    },

    async OM_GET_WORK_ORDER_TYPE_ATTRIBUTE_VALUES_BY_ID_WORK_ORDER_TYPE({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_WORK_ORDER_TYPE_ATTRIBUTE_VALUES_BY_ID_WORK_ORDER_TYPE(payload))
        return data
    },


    async OM_REMOVE_WORK_ORDER_TYPE_ATTRIBUTE_VALUES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.OM_REMOVE_WORK_ORDER_TYPE_ATTRIBUTE_VALUES_BY_ID(payload))
        return data
    },
}

export default {
    actions
}