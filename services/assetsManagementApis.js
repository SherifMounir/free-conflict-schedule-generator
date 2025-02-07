let base =  "";

export default {

    ////////////////////////////////
    //                            //
    //        Assets SERVICES     //
    //                            //
    ////////////////////////////////

    AM_GET_ASSETS: base + '/om/assets/asset',
    AM_ADD_ASSETS: base + '/om/assets/asset',
    AM_UPDATE_ASSETS_BY_ID: id => base + `/om/assets/asset/${id}`,
    AM_GET_ASSETS_BY_ID: id => base + `/om/assets/asset/${id}`,
    AM_REMOVE_ASSETS_BY_ID: id => base + `/om/assets/asset/${id}`, 

    //////////////////////////////////////////
    //                                      //
    //        Asset Categories SERVICES     //
    //                                      //
    //////////////////////////////////////////

    AM_GET_CATEGORIES: base + '/om/assets/categories',
    AM_ADD_CATEGORIES: base + '/om/assets/categories',
    AM_UPDATE_CATEGORIES_BY_ID: id => base + `/om/assets/categories/${id}`,
    AM_GET_CATEGORIES_BY_ID: id => base + `/om/assets/categories/${id}`,
    AM_REMOVE_CATEGORIES_BY_ID: id => base + `/om/assets/categories/${id}`, 

    //////////////////////////////////////////
    //                                      //
    //      Asset Manufacturers SERVICES    //
    //                                      //
    //////////////////////////////////////////

    AM_GET_MANUFACTURERS: base + '/om/assets/manufacturers',
    AM_ADD_MANUFACTURERS: base + '/om/assets/manufacturers',
    AM_UPDATE_MANUFACTURERS_BY_ID: id => base + `/om/assets/manufacturers/${id}`,
    AM_GET_MANUFACTURERS_BY_ID: id => base + `/om/assets/manufacturers/${id}`,
    AM_REMOVE_MANUFACTURERS_BY_ID: id => base + `/om/assets/manufacturers/${id}`, 


    //////////////////////////////////////////
    //                                      //
    //        Asset Locations SERVICES      //
    //                                      //
    //////////////////////////////////////////

    AM_GET_LOCATIONS: base + '/om/assets/locations',
    AM_ADD_LOCATIONS: base + '/om/assets/locations',
    AM_UPDATE_LOCATIONS_BY_ID: id => base + `/om/assets/locations/${id}`,
    AM_GET_LOCATIONS_BY_ID: id => base + `/om/assets/locations/${id}`,
    AM_REMOVE_LOCATIONS_BY_ID: id => base + `/om/assets/locations/${id}`, 

    //////////////////////////////////////////
    //                                      //
    //           Asset Logs SERVICES        //
    //                                      //
    //////////////////////////////////////////

    AM_ADD_LOGS: base + '/om/assets/logs',
    AM_GET_LOGS_BY_ID: id => base + `/om/assets/${id}/logs`,


    ///////////////////////////////////////////////////////
    //                                                   //
    //   OM Preventive Maintenance Checklist SERVICES    //
    //                                                   //
    ///////////////////////////////////////////////////////

    OM_GET_PREVENTIVE_MAINTENANCE: base + '/om/assets/asset-preventive-maintenance',
    OM_ADD_PREVENTIVE_MAINTENANCE: base + '/om/assets/asset-preventive-maintenance',
    OM_UPDATE_PREVENTIVE_MAINTENANCE_BY_ID: id => base + `/om/assets/asset-preventive-maintenance/${id}`,
    OM_GET_PREVENTIVE_MAINTENANCE_BY_ID: id => base + `/om/assets/asset-preventive-maintenance/${id}`,
    OM_REMOVE_PREVENTIVE_MAINTENANCE_BY_ID: id => base + `/om/assets/asset-preventive-maintenance/${id}`, 
    OM_GET_PREVENTIVE_MAINTENANC_BY_ASSET_ID: id => base + `/om/assets/get-preventive-maintenance-by-asset-id/${id}`, 
    OM_CREATE_PREVENTIVE_MAINTENANC_MANUAL: id => base + `/om/assets/create-preventive-maintenance-manual?asset_pm_id=${id}`, 

    ///////////////////////////////////////////////////////
    //                                                   //
    //   OM Preventive Maintenance Checklist SERVICES    //
    //                                                   //
    ///////////////////////////////////////////////////////

    OM_GET_PREVENTIVE_MAINTENANCE_CHECKLIST: base + '/om/preventive-maintenance-checklists',
    OM_ADD_PREVENTIVE_MAINTENANCE_CHECKLIST: base + '/om/preventive-maintenance-checklists',
    OM_UPDATE_PREVENTIVE_MAINTENANCE_CHECKLIST_BY_ID: id => base + `/om/preventive-maintenance-checklists/${id}`,
    OM_GET_PREVENTIVE_MAINTENANCE_CHECKLIST_BY_ID: id => base + `/om/preventive-maintenance-checklists/${id}`,
    OM_REMOVE_PREVENTIVE_MAINTENANCE_CHECKLIST_BY_ID: id => base + `/om/preventive-maintenance-checklists/${id}`, 

    ///////////////////////////////////////////////////////////
    //                                                       //
    // OM Preventive Maintenance Checklist Details SERVICES  //
    //                                                       //
    ///////////////////////////////////////////////////////////

    OM_GET_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS: base + '/om/preventive-maintenance-checklist-details',
    OM_ADD_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS: base + '/om/preventive-maintenance-checklist-details',
    OM_UPDATE_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS_BY_ID: id => base + `/om/preventive-maintenance-checklist-details/${id}`,
    OM_GET_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS_BY_ID: id => base + `/om/preventive-maintenance-checklist-details/${id}`,
    OM_REMOVE_PREVENTIVE_MAINTENANCE_CHECKLIST_DETAILS_BY_ID: id => base + `/om/preventive-maintenance-checklist-details/${id}`, 

    ///////////////////////////////////////////////////////////
    //                                                       //
    //   OM Preventive Maintenance Frequency Type SERVICES   //
    //                                                       //
    ///////////////////////////////////////////////////////////

    OM_GET_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE: base + '/om/preventive-maintenance-frequency-types',
    OM_ADD_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE: base + '/om/preventive-maintenance-frequency-types',
    OM_UPDATE_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_BY_ID: id => base + `/om/preventive-maintenance-frequency-types/${id}`,
    OM_GET_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_BY_ID: id => base + `/om/preventive-maintenance-frequency-types/${id}`,
    OM_REMOVE_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_BY_ID: id => base + `/om/preventive-maintenance-frequency-types/${id}`, 


    /////////////////////////////////////////////////////////////////////
    //                                                                 //
    //    OM Preventive Maintenance Frequency Type Metric SERVICES     //
    //                                                                 //
    /////////////////////////////////////////////////////////////////////

    OM_GET_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_METRIC: base + '/om/preventive-maintenance-frequency-type-metrics',
    OM_ADD_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_METRIC: base + '/om/preventive-maintenance-frequency-type-metrics',
    OM_UPDATE_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_METRIC_BY_ID: id => base + `/om/preventive-maintenance-frequency-type-metrics/${id}`,
    OM_GET_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_METRIC_BY_ID: id => base + `/om/preventive-maintenance-frequency-type-metrics/${id}`,
    OM_REMOVE_PREVENTIVE_MAINTENANCE_FREQUENCY_TYPE_METRIC_BY_ID: id => base + `/om/preventive-maintenance-frequency-type-metrics/${id}`, 


}