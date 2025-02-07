import API from '~/services/rigManagementApis.js'

const actions = {
    async RM_GET_RIG_DOCUMENTATION({ commit }, payload) {
        const data = await this.$axios.$get(API.RM_GET_RIG_DOCUMENTATION,{
            params: {
                ...payload
            }
        })
        return data
    },

    
    async RM_ADD_RIG_DOCUMENTATION({ commit }, payload) {
        let formData = new FormData();
        formData.append('file', payload.file[0].file)
        formData.append('rig_id', payload.rig_id)
        formData.append('om_rig_documentation_type_id', payload.om_rig_documentation_type_id)
        formData.append('note', payload.note)

        const data = await this.$axios.$post(API.RM_ADD_RIG_DOCUMENTATION, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br'
            }
          })
        return data
    },
    async RM_GET_RIG_DOCUMENTATION_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.RM_GET_RIG_DOCUMENTATION_BY_ID(payload))
        return data
    },
    
    async RM_UPDATE_RIG_DOCUMENTATION_BY_ID({ commit }, payload) {
        let NewformData = new FormData();
        NewformData.append('_method', 'put')
        NewformData.append('rig_id', payload.rig_id.id)
        NewformData.append('om_rig_documentation_type_id', payload.om_rig_documentation_type_id.id)
        NewformData.append('note', payload.note)
        if(payload.file.length) {
            if(payload.file[0].new) {
                NewformData.append('file', payload.file[0].file)
            }
        }else {
            NewformData.append('file', null)
        }
        

        const data = await this.$axios.$post(API.RM_UPDATE_RIG_DOCUMENTATION_BY_ID(payload.id), NewformData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
          })
        return data
    },
    async RM_REMOVE_RIG_DOCUMENTATION_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.RM_REMOVE_RIG_DOCUMENTATION_BY_ID(payload))
        return data
    },
}

export default {
    actions
}