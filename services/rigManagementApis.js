let base =  "";

export default {

/////////////////////////////
//                         //
//      Rigs SERVICES      //
//                         //
/////////////////////////////

RM_GET_RIGS: base + '/om-rigs',
RM_ADD_RIGS: base + '/om-rigs',
RM_UPDATE_RIGS_BY_ID: id => base + `/om-rigs/${id}`,
RM_GET_RIGS_BY_ID: id => base + `/om-rigs/${id}`,
RM_REMOVE_RIGS_BY_ID: id => base + `/om-rigs/${id}`, 

/////////////////////////////////////
//                                 //
//      Rig Categories SERVICES    //
//                                 //
/////////////////////////////////////

RM_GET_RIG_CATEGORIES: base + '/om-rig-categories',
RM_ADD_RIG_CATEGORIES: base + '/om-rig-categories',
RM_UPDATE_RIG_CATEGORIES_BY_ID: id => base + `/om-rig-categories/${id}`,
RM_GET_RIG_CATEGORIES_BY_ID: id => base + `/om-rig-categories/${id}`,
RM_REMOVE_RIG_CATEGORIES_BY_ID: id => base + `/om-rig-categories/${id}`, 

//////////////////////////////////////////////////
//                                              //
//       Rig Operational Status SERVICES        //
//                                              //
//////////////////////////////////////////////////

RM_GET_RIG_OPERATIONAL_STATUS: base + '/om-rig-operational-status',
RM_ADD_RIG_OPERATIONAL_STATUS: base + '/om-rig-operational-status',
RM_UPDATE_RIG_OPERATIONAL_STATUS_BY_ID: id => base + `/om-rig-operational-status/${id}`,
RM_GET_RIG_OPERATIONAL_STATUS_BY_ID: id => base + `/om-rig-operational-status/${id}`,
RM_REMOVE_RIG_OPERATIONAL_STATUS_BY_ID: id => base + `/om-rig-operational-status/${id}`, 

////////////////////////////////////////////
//                                        //
//        Rig Locations SERVICES          //
//                                        //
////////////////////////////////////////////

RM_GET_RIG_LOCATIONS: base + '/om-rig-locations',
RM_ADD_RIG_LOCATIONS: base + '/om-rig-locations',
RM_UPDATE_RIG_LOCATIONS_BY_ID: id => base + `/om-rig-locations/${id}`,
RM_GET_RIG_LOCATIONS_BY_ID: id => base + `/om-rig-locations/${id}`,
RM_REMOVE_RIG_LOCATIONS_BY_ID: id => base + `/om-rig-locations/${id}`, 

////////////////////////////////////////////
//                                        //
//          Rig Attribute SERVICES        //
//                                        //
////////////////////////////////////////////

RM_GET_RIG_ATTRIBUTE: base + '/om-rig-attributes',
RM_ADD_RIG_ATTRIBUTE: base + '/om-rig-attributes',
RM_UPDATE_RIG_ATTRIBUTE_BY_ID: id => base + `/om-rig-attributes/${id}`,
RM_GET_RIG_ATTRIBUTE_BY_ID: id => base + `/om-rig-attributes/${id}`,
RM_REMOVE_RIG_ATTRIBUTE_BY_ID: id => base + `/om-rig-attributes/${id}`, 

////////////////////////////////////////////
//                                        //
//     Rig Category Attributes SERVICES   //
//                                        //
////////////////////////////////////////////

RM_GET_RIG_CATEGORIE_ATTRIBUTE: base + '/om-rig-category-attributes',
RM_ADD_RIG_CATEGORIE_ATTRIBUTE: base + '/om-rig-category-attributes',
RM_UPDATE_RIG_CATEGORIE_ATTRIBUTE_BY_ID: id => base + `/om-rig-category-attributes/${id}`,
RM_GET_RIG_CATEGORIE_ATTRIBUTE_BY_ID: id => base + `/om-rig-category-attributes/${id}`,
RM_REMOVE_RIG_CATEGORIE_ATTRIBUTE_BY_ID: id => base + `/om-rig-category-attributes/${id}`, 

//////////////////////////////////////////////////
//                                              //
//          Rig Documentation SERVICES          //
//                                              //
//////////////////////////////////////////////////

RM_GET_RIG_DOCUMENTATION: base + '/om-rig-documentation',
RM_ADD_RIG_DOCUMENTATION: base + '/om-rig-documentation',
RM_UPDATE_RIG_DOCUMENTATION_BY_ID: id => base + `/om-rig-documentation/${id}`,
RM_GET_RIG_DOCUMENTATION_BY_ID: id => base + `/om-rig-documentation/${id}`,
RM_REMOVE_RIG_DOCUMENTATION_BY_ID: id => base + `/om-rig-documentation/${id}`, 

//////////////////////////////////////////////////
//                                              //
//       Rig Documentation Types SERVICES       //
//                                              //
//////////////////////////////////////////////////

RM_GET_RIG_DOCUMENTATION_TYPES: base + '/om-rig-documentation-types',
RM_ADD_RIG_DOCUMENTATION_TYPES: base + '/om-rig-documentation-types',
RM_UPDATE_RIG_DOCUMENTATION_TYPES_BY_ID: id => base + `/om-rig-documentation-types/${id}`,
RM_GET_RIG_DOCUMENTATION_TYPES_BY_ID: id => base + `/om-rig-documentation-types/${id}`,
RM_REMOVE_RIG_DOCUMENTATION_TYPES_BY_ID: id => base + `/om-rig-documentation-types/${id}`, 

//////////////////////////////////////////////////
//                                              //
//    Rig Category Attribute Values SERVICES    //
//                                              //
//////////////////////////////////////////////////

RM_GET_RIG_GATEGORY_ATTRIBUTE_VALUES: base + '/om-rig-category-attribute-values',
RM_ADD_RIG_GATEGORY_ATTRIBUTE_VALUES: base + '/om-rig-category-attribute-values',
RM_UPDATE_RIG_GATEGORY_ATTRIBUTE_VALUES_BY_ID: id => base + `/om-rig-category-attribute-values/${id}`,
RM_GET_RIG_GATEGORY_ATTRIBUTE_VALUES_BY_ID: id => base + `/om-rig-category-attribute-values/${id}`,
RM_REMOVE_RIG_GATEGORY_ATTRIBUTE_VALUES_BY_ID: id => base + `/om-rig-category-attribute-values/${id}`, 
RM_GET_FORM_RIG_GATEGORY_ATTRIBUTE_BY_CAT_ID: base + '/om-rig-category-attrs-by-cat-id',
}