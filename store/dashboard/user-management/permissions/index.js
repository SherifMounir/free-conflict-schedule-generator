import API from '~/services/usersAndPermissions.js'

const actions = {
    async GET_PERMISSIONS({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_PERMISSIONS)
        return data
    },
    async GET_PERMISSIONS_GROUPS({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_PERMISSIONS_GROUPS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async GET_PERMISSIONS_GROUP_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_PERMISSIONS_GROUP_BY_ID(payload))
        return data
    },
    async ADD_PERMISSIONS_GROUP({ commit }, payload) {
        const data = await this.$axios.$post(API.ADD_PERMISSIONS_GROUP, {
            ...payload
        })
        return data
    },
    async UPDATE_PERMISSIONS_GROUP_BY_ID({ commit }, payload) {
        let id = payload.id
        delete payload.id
        const data = await this.$axios.$put(API.UPDATE_PERMISSIONS_GROUP_BY_ID(id), {
            ...payload
        })
        return data
    },
}

export default {
    actions
}