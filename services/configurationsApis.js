let base =  "";
export default {

    /////////////////////////////////////////////
    //                                         //
    //         Notifications Templates         //
    //                                         //
    /////////////////////////////////////////////
    GET_NOTIFICATIONS_TEPLATES_TYPES: base + '/om/notification-template-types',
    GET_NOTIFICATIONS_TEPLATES: base + '/om/notification-templates',
    ADD_NOTIFICATIONS_TEPLATES: base + '/om/notification-templates',
    UPDATE_NOTIFICATIONS_TEPLATES_BY_ID: id => base + `/om/notification-templates/${id}`,
    GET_NOTIFICATIONS_TEPLATES_BY_ID: id => base + `/om/notification-templates/${id}`,
    REMOVE_NOTIFICATIONS_TEPLATES_BY_ID: id => base + `/om/notification-templates/${id}`,

}