import API from '~/services/usersAndPermissions.js'

const actions = {
    async GET_USERS({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_USERS,{
            params: {
                ...payload
            }
        })
        return data
    },
    async ADD_USERS({ commit }, payload) {
        const data = await this.$axios.$post(API.ADD_USERS, {
            ...payload
        })
        return data
    },
    async GET_USER_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.GET_USER_BY_ID(payload))
        return data
    },
    async UPDATE_USER_BY_ID({ commit }, payload) {
        let id = payload.id
        delete payload.id
        const data = await this.$axios.put(API.UPDATE_USER_BY_ID(id), {
            ...payload
        })
        return data
    },
}

export default {
    actions
}