import API from '~/services/inventoryManagement.js'

const actions = {
    async GET_ITEM_UNIT_OF_MEASURE({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_ITEM_UNIT_OF_MEASURE,{
            params: {
                ...payload
            }
        })
        return data
    },
    async ADD_ITEM_UNIT_OF_MEASURE({ commit }, payload) {
        const data = await this.$axios.$post(API.ADD_ITEM_UNIT_OF_MEASURE, {
            ...payload
        })
        return data
    },
    async GET_ITEM_UNIT_OF_MEASURE_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_ITEM_UNIT_OF_MEASURE_BY_ID(payload))
        return data
    },
    async UPDATE_ITEM_UNIT_OF_MEASURE_BY_ID({ commit }, payload) {
        const data = await this.$axios.$put(API.UPDATE_ITEM_UNIT_OF_MEASURE_BY_ID(payload.id), {
            ...payload
        })
        return data
    },
    async REMOVE_ITEM_UNIT_OF_MEASURE_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.REMOVE_ITEM_UNIT_OF_MEASURE_BY_ID(payload))
        return data
    },
}

export default {
    actions
}