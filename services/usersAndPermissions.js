let base =  "";

export default {

    ////////////////////////////////////////////
    //                                        //
    //       Users & Permissions SERVICE      //
    //                                        //
    ////////////////////////////////////////////

    GET_USERS: base + '/user-manage/users',
    ADD_USERS: base + '/auth/register',
    GET_USER_BY_ID: id => base + `/user-manage/users/${id}`,
    UPDATE_USER_BY_ID: id => base + `/user-manage/users/${id}`,
    GET_PERMISSIONS: base + '/user-manage/permissions',
    GET_PERMISSIONS_GROUPS: base + '/user-manage/permission-groups',
    GET_PERMISSIONS_GROUP_BY_ID: id => base + `/user-manage/permission-groups/${id}`,
    ADD_PERMISSIONS_GROUP: base + `/user-manage/permission-groups`,
    UPDATE_PERMISSIONS_GROUP_BY_ID: id => base + `/user-manage/permission-groups/${id}`,

}