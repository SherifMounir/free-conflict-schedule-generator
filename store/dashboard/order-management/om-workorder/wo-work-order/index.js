import API from '~/services/orderManagementApis.js'

const actions = {

    async OM_GET_WORK_ORDER({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_WORK_ORDER,{
            params: {
                ...payload
            }
        })
        return data
    },

    async OM_ADD_WORK_ORDER({ commit }, payload) {
        let formData = new FormData();
        formData.append('work_order_statuse_id', payload.work_order_statuse_id)
        formData.append('priority', payload.priority)
        formData.append('work_order_type_id', payload.work_order_type_id)
        formData.append('work_order_workflow_id', payload.work_order_workflow_id)
        formData.append('file', payload.file[0].file)
        if(payload.parent_wo_id) {
            formData.append('parent_wo_id', payload.parent_wo_id)
        }
        if(payload.order_type_attrs && payload.order_type_attrs.length) {
            for (let i = 0; i < payload.order_type_attrs.length; i++) {
                for (const [key, value] of Object.entries(payload.order_type_attrs[i])) {
                   formData.append(`order_type_attrs[`+i+`][`+key+`]`, value)
                 }
           }
        }
        const data = await this.$axios.$post(API.OM_ADD_WORK_ORDER, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': '*/*',
            }
          })
        return data

    },

    async OM_UPDATE_WORK_ORDER_BY_ID({ commit }, payload) {
        console.log(payload)
        let NewformData = new FormData();
        NewformData.append('_method', 'put')
        NewformData.append('work_order_statuse_id', payload.work_order_statuse_id)
        NewformData.append('priority', payload.priority)
        NewformData.append('work_order_type_id', payload.work_order_type_id)
        NewformData.append('work_order_workflow_id', payload.work_order_workflow_id)
        NewformData.append('supporter_id', payload.supporter_id)
        if(payload.parent_wo_id) {
            NewformData.append('parent_wo_id', payload.parent_wo_id)
        }
        if(payload.order_type_attrs && payload.order_type_attrs.length) {
            for (let i = 0; i < payload.order_type_attrs.length; i++) {
                for (const [key, value] of Object.entries(payload.order_type_attrs[i])) {
                    NewformData.append(`order_type_attrs[`+i+`][`+key+`]`, value)
                 }
           }
        }
        if(payload.file.length) {
            if(payload.file[0].new) {
                NewformData.append('file', payload.file[0].file)
            }
        }else {
            NewformData.append('file', null)
        }
        const data = await this.$axios.$post(API.OM_UPDATE_WORK_ORDER_BY_ID(payload.id), NewformData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
          })
        return data
        // const data = await this.$axios.$put(API.OM_UPDATE_WORK_ORDER_BY_ID(payload.id), {
        //     ...payload
        // })
        // return data
    },

    async OM_GET_WORK_ORDER_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_WORK_ORDER_BY_ID(payload))
        return data
    },

    async OM_WORK_ORDER_RE_EXECUTE({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_WORK_ORDER_RE_EXECUTE(payload))
        return data
    },
    async OM_GET_WORK_ORDER_ATTRIBUTES_LOOKUPS_DETAILS({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_WORK_ORDER_ATTRIBUTES_LOOKUPS_DETAILS(payload))
        return data
    },
    async OM_GET_WORK_ORDER_LOGS({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_WORK_ORDER_LOGS(payload))
        return data
    },

    async OM_GET_FORM_WORK_ORDER_TYPES_ATTRIBUTES_BY_ID({ commit }, payload) {
        const data = await this.$axios.$get(API.OM_GET_FORM_WORK_ORDER_TYPES_ATTRIBUTES_BY_ID(payload))
        return data
    },
    
    async OM_REMOVE_WORK_ORDER_BY_ID({ commit }, payload) {
        const data = await this.$axios.$delete(API.OM_REMOVE_WORK_ORDER_BY_ID(payload))
        return data
    },
}

export default {
    actions
}