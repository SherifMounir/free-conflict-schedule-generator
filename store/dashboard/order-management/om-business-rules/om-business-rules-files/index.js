import API from '~/services/orderManagementApis.js'

const actions = {
    async OM_GET_BUSINESS_ROLES_FLIES({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_BUSINESS_ROLES_FLIES,{
            params: {
                ...payload
            }
        })
        return data
    },
    async OM_ADD_BUSINESS_ROLES_FLIES({ commit }, payload) {
        let formData = new FormData();
        formData.append('file', payload.file[0].file)
        formData.append('name', payload.name)
        formData.append('tenant_domain', payload.tenant_domain)
        formData.append('business_rule_type_id', payload.business_rule_type_id)
        formData.append('notes', payload.notes)
        const data = await this.$axios.$post(API.OM_ADD_BUSINESS_ROLES_FLIES, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': '*/*'
            }
          })
        return data


    },
    async OM_GET_BUSINESS_ROLES_FLIES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_BUSINESS_ROLES_FLIES_BY_ID(payload))
        return data
    },
    async OM_UPDATE_BUSINESS_ROLES_FLIES_BY_ID({ commit }, payload) {
        let formData = new FormData();
        if(payload.file[0].new) {
            formData.append('file', payload.file[0].file)
        }
        formData.append('name', payload.name)
        formData.append('_method', 'PUT')
        formData.append('active', '1')
        formData.append('tenant_domain', payload.tenant_domain)
        formData.append('business_rule_type_id', payload.business_rule_type_id)
        formData.append('notes', payload.notes)
        const data = await this.$axios.$post(API.OM_UPDATE_BUSINESS_ROLES_FLIES_BY_ID(payload.id), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': '*/*'
            }
          })
        return data
    },
    async OM_REMOVE_BUSINESS_ROLES_FLIES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.OM_REMOVE_BUSINESS_ROLES_FLIES_BY_ID(payload))
        return data
    },
}

export default {
    actions
}