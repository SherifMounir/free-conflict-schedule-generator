let base =  "";

export default {

    ////////////////////////////////////////////
    //                                        //
    //       Users & Permissions SERVICE      //
    //                                        //
    ////////////////////////////////////////////

    GET_USERS: base + '/user-manage/users',
    GET_USER_BY_ID: id => base + `/user-manage/users/${id}`,
    UPDATE_USER_BY_ID: id => base + `/user-manage/users/${id}`,
    GET_PERMISSIONS: base + '/user-manage/permissions',
    GET_PERMISSIONS_GROUPS: base + '/user-manage/permission-groups',
    GET_PERMISSIONS_GROUP_BY_ID: id => base + `/user-manage/permission-groups/${id}`,
    ADD_PERMISSIONS_GROUP: base + `/user-manage/permission-groups`,
    UPDATE_PERMISSIONS_GROUP_BY_ID: id => base + `/user-manage/permission-groups/${id}`,

    ////////////////////////////////
    //                            //
    //     Category  Service      //
    //                            //
    ////////////////////////////////

    GET_CATEGORIES: base + '/inventory/category',
    GET_ALL_CATEGORIES: base + '/inventory/category/get-all-categories',
    ADD_CATEGORIES: base + '/inventory/category',
    UPDATE_CATEGORIES_BY_ID: id => base + `/inventory/category/${id}`,
    GET_CATEGORIES_BY_ID: id => base + `/inventory/category/${id}`,
    REMOVE_CATEGORIES_BY_ID: id => base + `/inventory/category/${id}`,

    ////////////////////////////////
    //                            //
    //       Item  Service        //
    //                            //
    ////////////////////////////////

    GET_ITEMS: base + '/inventory/item',
    ADD_ITEMS: base + '/inventory/item',
    UPDATE_ITEMS_BY_ID: id => base + `/inventory/item/${id}`,
    GET_ITEMS_BY_ID: id => base + `/inventory/item/${id}`,
    REMOVE_ITEMS_BY_ID: id => base + `/inventory/item/${id}`,


    ////////////////////////////////
    //                            //
    //   Item Condition Service   //
    //                            //
    ////////////////////////////////

    GET_ITEM_CONDITION: base + '/inventory/item-condition',
    ADD_ITEM_CONDITION: base + '/inventory/item-condition',
    UPDATE_ITEM_CONDITION_BY_ID: id => base + `/inventory/item-condition/${id}`,
    GET_ITEM_CONDITION_BY_ID: id => base + `/inventory/item-condition/${id}`,
    REMOVE_ITEM_CONDITION_BY_ID: id => base + `/inventory/item-condition/${id}`,

    ////////////////////////////////
    //                            //
    //  Item Transaction Service  //
    //                            //
    ////////////////////////////////

    GET_ITEM_TRANSACTION: base + '/inventory/transaction',
    GET_ITEM_TRANSACTION_TYPE: base + '/inventory/item-transaction-type',
    ADD_ITEM_TRANSACTION: base + '/inventory/transaction',
    UPDATE_ITEM_TRANSACTION_BY_ID: id => base + `/inventory/transaction/${id}`,
    GET_ITEM_TRANSACTION_BY_ID: id => base + `/inventory/transaction/${id}`,
    REMOVE_ITEM_TRANSACTION_BY_ID: id => base + `/inventory/transaction/${id}`,


    ////////////////////////////////
    //                            //
    //     Item Type Service      //
    //                            //
    ////////////////////////////////

    GET_ITEM_TYPE: base + '/inventory/item-type',
    ADD_ITEM_TYPE: base + '/inventory/item-type',
    UPDATE_ITEM_TYPE_BY_ID: id => base + `/inventory/item-type/${id}`,
    GET_ITEM_TYPE_BY_ID: id => base + `/inventory/item-type/${id}`,
    REMOVE_ITEM_TYPE_BY_ID: id => base + `/inventory/item-type/${id}`,

    ////////////////////////////////
    //                            //
    //     Location  Service      //
    //                            //
    ////////////////////////////////

    GET_LOCATIONS: base + '/inventory/location',
    ADD_LOCATION: base + '/inventory/location',
    GET_LOCATION_TYPES: base + '/inventory/location/location-type',
    UPDATE_LOCATION_BY_ID: id => base + `/inventory/location/${id}`,
    GET_LOCATION_BY_ID: id => base + `/inventory/location/${id}`,
    REMOVE_LOCATION_BY_ID: id => base + `/inventory/location/${id}`,

    ////////////////////////////////
    //                            //
    //   Users Location Service   //
    //                            //
    ////////////////////////////////

    GET_USERS_LOCATIONS: base + '/inventory/user-location',
    ADD_USERS_LOCATION: base + '/inventory/user-location',
    UPDATE_USERS_LOCATION_BY_ID: id => base + `/inventory/user-location/${id}`,
    GET_USERS_LOCATION_BY_ID: id => base + `/inventory/user-location/${id}`,
    REMOVE_USERS_LOCATION_BY_ID: id => base + `/inventory/user-location/${id}`,

    ////////////////////////////////
    //                            //
    //     Management Service     //
    //                            //
    ////////////////////////////////

    GET_MANAGEMENT_SERIALS: base + '/inventory/management/get-item-serials',
    ADD_MANAGEMENT_SERIALS: base + '/inventory/management/add-bulk-item-serial',
    UPDATE_MANAGEMENT_SERIALS_BY_ID: id => base + `/inventory/management/update-item-serial/${id}`,
    GET_MANAGEMENT_SERIALS_BY_ID: id => base + `/inventory/management/get-item-serial/${id}`,
    GET_MANAGEMENT_SERIALS_LIST_BY_ID: base + '/inventory/management/get-item-serials',
    REMOVE_MANAGEMENT_SERIALS_BY_ID: id => base + `/inventory/management/delete-item-serial/${id}`,

    ////////////////////////////////
    //                            //
    //   ManufactureR Service     //
    //                            //
    ////////////////////////////////

    GET_MANUFACTURERS: base + '/inventory/manufacturer',
    ADD_MANUFACTURER: base + '/inventory/manufacturer',
    UPDATE_MANUFACTURER_BY_ID: id => base + `/inventory/manufacturer/${id}`,
    GET_MANUFACTURER_BY_ID: id => base + `/inventory/manufacturer/${id}`,
    REMOVE_MANUFACTURER_BY_ID: id => base + `/inventory/manufacturer/${id}`,

    ////////////////////////////////
    //                            //
    //       Vendor Service       //
    //                            //
    ////////////////////////////////

    GET_VENDOR_SERIALS: base + '/inventory/vendor',
    ADD_VENDOR_SERIALS: base + '/inventory/vendor',
    UPDATE_VENDOR_BY_ID: id => base + `/inventory/vendor/${id}`,
    GET_VENDOR_BY_ID: id => base + `/inventory/vendor/${id}`,
    REMOVE_VENDOR_BY_ID: id => base + `/inventory/vendor/${id}`,

    //////////////////////////////////////////////
    //                                          //
    //       Item Unit Of Measure Service       //
    //                                          //
    //////////////////////////////////////////////

    GET_ITEM_UNIT_OF_MEASURE: base + '/inventory/item-unit-of-measure',
    ADD_ITEM_UNIT_OF_MEASURE: base + '/inventory/item-unit-of-measure',
    UPDATE_ITEM_UNIT_OF_MEASURE_BY_ID: id => base + `/inventory/item-unit-of-measure/${id}`,
    GET_ITEM_UNIT_OF_MEASURE_BY_ID: id => base + `/inventory/item-unit-of-measure/${id}`,
    REMOVE_ITEM_UNIT_OF_MEASURE_BY_ID: id => base + `/inventory/item-unit-of-measure/${id}`,


}