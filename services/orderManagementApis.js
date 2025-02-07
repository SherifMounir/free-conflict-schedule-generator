let base =  "";

export default {


///////////////////////////////////////////////////////
//                                                   //
//      OM Att Reference Table Columns SERVICES      //
//                                                   //
///////////////////////////////////////////////////////

OM_GET_ATTRIBUTES_REFERENCE_TABLE_COLUMNS: base + '/om-att-reference-table-columns',
OM_ADD_ATTRIBUTES_REFERENCE_TABLE_COLUMNS: base + '/om-att-reference-table-columns',
OM_UPDATE_ATTRIBUTES_REFERENCE_TABLE_COLUMNS_BY_ID: id => base + `/om-att-reference-table-columns/${id}`,
OM_GET_ATTRIBUTES_REFERENCE_TABLE_COLUMNS_BY_ID: id => base + `/om-att-reference-table-columns/${id}`,
OM_REMOVE_ATTRIBUTES_REFERENCE_TABLE_COLUMNS_BY_ID: id => base + `/om-att-reference-table-columns/${id}`, 

///////////////////////////////////////////////////////
//                                                   //
//      OM Attributes Reference Tables SERVICES      //
//                                                   //
///////////////////////////////////////////////////////

OM_GET_ATTRIBUTES_REFERENCE_TABLES: base + '/om-attributes-reference-tables',
OM_ADD_ATTRIBUTES_REFERENCE_TABLES: base + '/om-attributes-reference-tables',
OM_UPDATE_ATTRIBUTES_REFERENCE_TABLES_BY_ID: id => base + `/om-attributes-reference-tables/${id}`,
OM_GET_ATTRIBUTES_REFERENCE_TABLES_BY_ID: id => base + `/om-attributes-reference-tables/${id}`,
OM_REMOVE_ATTRIBUTES_REFERENCE_TABLES_BY_ID: id => base + `/om-attributes-reference-tables/${id}`, 


///////////////////////////////////////////////////////
//                                                   //
//           OM Attributes Types SERVICES            //
//                                                   //
///////////////////////////////////////////////////////

OM_GET_ATTRIBUTES_TYPES: base + '/om-attributes-types',
OM_ADD_ATTRIBUTES_TYPES: base + '/om-attributes-types',
OM_UPDATE_ATTRIBUTES_TYPES_BY_ID: id => base + `/om-attributes-types/${id}`,
OM_GET_ATTRIBUTES_TYPES_BY_ID: id => base + `/om-attributes-types/${id}`,
OM_REMOVE_ATTRIBUTES_TYPES_BY_ID: id => base + `/om-attributes-types/${id}`, 


///////////////////////////////////////////////////////
//                                                   //
//               OM Supports SERVICES                //
//                                                   //
///////////////////////////////////////////////////////

OM_GET_SUPPORTS: base + '/supports',
OM_ADD_SUPPORTS: base + '/supports',
OM_UPDATE_SUPPORTS_BY_ID: id => base + `/supports/${id}`,
OM_GET_SUPPORTS_BY_ID: id => base + `/supports/${id}`,
OM_REMOVE_SUPPORTS_BY_ID: id => base + `/supports/${id}`, 

///////////////////////////////////////////////////////
//                                                   //
//          OM Supporter skills SERVICES             //
//                                                   //
///////////////////////////////////////////////////////

OM_GET_SUPPORTER_SKILLS: base + '/supporter-skills',
OM_ADD_SUPPORTER_SKILLS: base + '/supporter-skills',
OM_UPDATE_SUPPORTER_SKILLS_BY_ID: id => base + `/supporter-skills/${id}`,
OM_GET_SUPPORTER_SKILLS_BY_ID: id => base + `/supporter-skills/${id}`,
OM_REMOVE_SUPPORTER_SKILLS_BY_ID: id => base + `/supporter-skills/${id}`, 

//////////////////////////////////////////////////
//                                              //
//        Supp Groups Supports SERVICES         //
//                                              //
//////////////////////////////////////////////////

OM_GET_SUPPORT_GROUP_SUPPORTERS: base + '/support-group-supporters',
OM_ADD_SUPPORT_GROUP_SUPPORTERS: base + '/support-group-supporters',
OM_UPDATE_SUPPORT_GROUP_SUPPORTERS_BY_ID: id => base + `/support-group-supporters/${id}`,
OM_GET_SUPPORT_GROUP_SUPPORTERS_BY_ID: id => base + `/support-group-supporters/${id}`,
OM_REMOVE_SUPPORT_GROUP_SUPPORTERS_BY_ID: id => base + `/support-group-supporters/${id}`, 
OM_GET_SUPPORT_GROUP_SUPPORTSERS_BY_ID: id => base + `/support-group-supporters?support_group_id=${id}`, 


//////////////////////////////////////////////////
//                                              //
//            Support Groups SERVICES           //
//                                              //
//////////////////////////////////////////////////

OM_GET_SUPPORT_GROUPS: base + '/support-groups',
OM_ADD_SUPPORT_GROUPS: base + '/support-groups',
OM_UPDATE_SUPPORT_GROUPS_BY_ID: id => base + `/support-groups/${id}`,
OM_GET_SUPPORT_GROUPS_BY_ID: id => base + `/support-groups/${id}`,
OM_REMOVE_SUPPORT_GROUPS_BY_ID: id => base + `/support-groups/${id}`, 

//////////////////////////////////////////////////
//                                              //
//       Support Groups Status SERVICES         //
//                                              //
//////////////////////////////////////////////////

OM_GET_SUPPORT_GROUP_STATUS: base + '/support-group-status',
OM_ADD_SUPPORT_GROUP_STATUS: base + '/support-group-status',
OM_UPDATE_SUPPORT_GROUP_STATUS_BY_ID: id => base + `/support-group-status/${id}`,
OM_GET_SUPPORT_GROUP_STATUS_BY_ID: id => base + `/support-group-status/${id}`,
OM_REMOVE_SUPPORT_GROUP_STATUS_BY_ID: id => base + `/support-group-status/${id}`, 


//////////////////////////////////////////////////
//                                              //
//                 Skills SERVICES              //
//                                              //
//////////////////////////////////////////////////

OM_GET_SKILLS: base + '/skills',
OM_ADD_SKILLS: base + '/skills',
OM_UPDATE_SKILLS_BY_ID: id => base + `/skills/${id}`,
OM_GET_SKILLS_BY_ID: id => base + `/skills/${id}`,
OM_REMOVE_SKILLS_BY_ID: id => base + `/skills/${id}`, 


//////////////////////////////////////////////////
//                                              //
//          Work Order Types SERVICES           //
//                                              //
//////////////////////////////////////////////////

OM_GET_WORK_ORDER_TYPES: base + '/work-order-types',
OM_ADD_WORK_ORDER_TYPES: base + '/work-order-types',
OM_UPDATE_WORK_ORDER_TYPES_BY_ID: id => base + `/work-order-types/${id}`,
OM_GET_WORK_ORDER_TYPES_BY_ID: id => base + `/work-order-types/${id}`,
OM_REMOVE_WORK_ORDER_TYPES_BY_ID: id => base + `/work-order-types/${id}`, 


//////////////////////////////////////////////////
//                                              //
//         Work Order Statuses SERVICES         //
//                                              //
//////////////////////////////////////////////////

OM_GET_WORK_ORDER_STATUS: base + '/work-order-statuses',
OM_ADD_WORK_ORDER_STATUS: base + '/work-order-statuses',
OM_UPDATE_WORK_ORDER_STATUS_BY_ID: id => base + `/work-order-statuses/${id}`,
OM_GET_WORK_ORDER_STATUS_BY_ID: id => base + `/work-order-statuses/${id}`,
OM_GET_WORK_ORDER_STATUS_FILTER_BY_ID: id => base + `/get-work-order-type-statuses?${id}`,

OM_REMOVE_WORK_ORDER_STATUS_BY_ID: id => base + `/work-order-statuses/${id}`,


////////////////////////////////////////////
//                                        //
//        Work Order Flow SERVICES        //
//                                        //
////////////////////////////////////////////

OM_GET_WORK_ORDER_WORKFLOWS: base + '/work-order-workflows',
OM_ADD_WORK_ORDER_WORKFLOWS: base + '/work-order-workflows',
OM_UPDATE_WORK_ORDER_WORKFLOWS_BY_ID: id => base + `/work-order-workflows/${id}`,
OM_GET_WORK_ORDER_WORKFLOWS_BY_ID: id => base + `/work-order-workflows/${id}`,
OM_REMOVE_WORK_ORDER_WORKFLOWS_BY_ID: id => base + `/work-order-workflows/${id}`, 
OM_GET_NEXT_WORK_ORDER_WORKFLOWS: base + '/work-order-nextworkflows',

//////////////////////////////////////////////////
//                                              //
//     Work Order Types Attributes SERVICES     //
//                                              //
//////////////////////////////////////////////////

OM_GET_WORK_ORDER_TYPES_ATTRIBUTES: base + '/work-order-type-attributes',
OM_ADD_WORK_ORDER_TYPES_ATTRIBUTES: base + '/work-order-type-attributes',
OM_UPDATE_WORK_ORDER_TYPES_ATTRIBUTES_BY_ID: id => base + `/work-order-type-attributes/${id}`,
OM_GET_WORK_ORDER_TYPES_ATTRIBUTES_BY_ID: id => base + `/work-order-type-attributes/${id}`,
OM_REMOVE_WORK_ORDER_TYPES_ATTRIBUTES_BY_ID: id => base + `/work-order-type-attributes/${id}`, 


/////////////////////////////////////////////////////////
//                                                     //
//     Work Order Types Attributes Values SERVICES     //
//                                                     //
/////////////////////////////////////////////////////////

OM_GET_WORK_ORDER_TYPE_ATTRIBUTE_VALUES: base + '/work-order-type-attribute-values',
OM_ADD_WORK_ORDER_TYPE_ATTRIBUTE_VALUES: base + '/work-order-type-attribute-values',
OM_UPDATE_WORK_ORDER_TYPE_ATTRIBUTE_VALUES_BY_ID: base + `/update-work-order-type-attribute-values`,
OM_GET_WORK_ORDER_TYPE_ATTRIBUTE_VALUES_BY_ID: id => base + `/work-order-type-attribute-values/${id}`,
OM_REMOVE_WORK_ORDER_TYPE_ATTRIBUTE_VALUES_BY_ID: id => base + `/work-order-type-attribute-values/${id}`, 
OM_GET_WORK_ORDER_TYPE_ATTRIBUTE_VALUES_BY_ID_WORK_ORDER_TYPE: id => base + `/getWoTypeAttrValuesByAttrId?work_order_type_attribute_id=${id}`, 


//////////////////////////////////////////////////
//                                              //
//     Work Order Project Phases SERVICES       //
//                                              //
//////////////////////////////////////////////////

OM_GET_WORK_ORDER_PROJECT_PHASES: base + '/project-phases',
OM_ADD_WORK_ORDER_PROJECT_PHASES: base + '/project-phases',
OM_UPDATE_WORK_ORDER_PROJECT_PHASES_BY_ID: id => base + `/project-phases/${id}`,
OM_GET_WORK_ORDER_PROJECT_PHASES_BY_ID: id => base + `/project-phases/${id}`,
OM_REMOVE_WORK_ORDER_PROJECT_PHASES_BY_ID: id => base + `/project-phases/${id}`, 


//////////////////////////////////////////////////
//                                              //
//     Work Order View Sections SERVICES        //
//                                              //
//////////////////////////////////////////////////

OM_GET_WORK_ORDER_VIEW_SECTIONS: base + 'work-order-view-sections',
OM_ADD_WORK_ORDER_VIEW_SECTIONS: base + '/work-order-view-sections',
OM_UPDATE_WORK_ORDER_VIEW_SECTIONS_BY_ID: id => base + `/work-order-view-sections/${id}`,
OM_GET_WORK_ORDER_VIEW_SECTIONS_BY_ID: id => base + `/work-order-view-sections/${id}`,
OM_REMOVE_WORK_ORDER_VIEW_SECTIONS_BY_ID: id => base + `/work-order-view-sections/${id}`, 


//////////////////////////////////////////////////
//                                              //
//        Work Order Project SERVICES           //
//                                              //
//////////////////////////////////////////////////

OM_GET_WORK_ORDER_PROJECT: base + '/projects',
OM_ADD_WORK_ORDER_PROJECT: base + '/projects',
OM_UPDATE_WORK_ORDER_PROJECT_BY_ID: id => base + `/projects/${id}`,
OM_GET_WORK_ORDER_PROJECT_BY_ID: id => base + `/projects/${id}`,
OM_REMOVE_WORK_ORDER_PROJECT_BY_ID: id => base + `/projects/${id}`, 


//////////////////////////////////////////////////
//                                              //
//             Work Order SERVICES              //
//                                              //
//////////////////////////////////////////////////

OM_GET_WORK_ORDER: base + '/work-orders',
OM_ADD_WORK_ORDER: base + '/work-orders',
OM_UPDATE_WORK_ORDER_BY_ID: id => base + `/work-orders/${id}`,
OM_GET_WORK_ORDER_BY_ID: id => base + `/work-orders/${id}`,
OM_REMOVE_WORK_ORDER_BY_ID: id => base + `/work-orders/${id}`, 
OM_GET_FORM_WORK_ORDER_TYPES_ATTRIBUTES_BY_ID: id => base + `/getWoTypeAttrsByTypeId?work_order_type_id=${id}`, 
OM_WORK_ORDER_RE_EXECUTE: id => base + `/workorder_re-execute?workorder_id=${id}`, 
OM_GET_WORK_ORDER_LOGS: id => base + `/work-order-logs?work_order_id=${id}`, 
OM_GET_WORK_ORDER_ATTRIBUTES_LOOKUPS_DETAILS: id => base + `/getAttrLookupDetails/${id}`,

//////////////////////////////////////////////////
//                                              //
//         BUSINESS ROLES SERVICES              //
//                                              //
//////////////////////////////////////////////////

OM_GET_BUSINESS_ROLES: base + '/om/business-rules',
OM_ADD_BUSINESS_ROLES: base + '/om/business-rules',
OM_UPDATE_BUSINESS_ROLES_BY_ID: id => base + `/om/business-rules/${id}`,
OM_GET_BUSINESS_ROLES_BY_ID: id => base + `/om/business-rules/${id}`,
OM_REMOVE_BUSINESS_ROLES_BY_ID: id => base + `/om/business-rules/${id}`, 

//////////////////////////////////////////////////
//                                              //
//         BUSINESS ROLES FILES SERVICE         //
//                                              //
//////////////////////////////////////////////////

OM_GET_BUSINESS_ROLES_FLIES: base + '/om/business-rule-funs-file',
OM_ADD_BUSINESS_ROLES_FLIES: base + '/om/business-rule-funs-file',
OM_UPDATE_BUSINESS_ROLES_FLIES_BY_ID: id => base + `/om/business-rule-funs-file/${id}`,
OM_GET_BUSINESS_ROLES_FLIES_BY_ID: id => base + `/om/business-rule-funs-file/${id}`,
OM_REMOVE_BUSINESS_ROLES_FLIES_BY_ID: id => base + `/om/business-rule-funs-file/${id}`, 

//////////////////////////////////////////////////
//                                              //
//         BUSINESS ROLES TYPES SERVIC          //
//                                              //
//////////////////////////////////////////////////

OM_GET_BUSINESS_ROLES_TYPES: base + '/om/business-rule-types',
OM_GET_BUSINESS_RULE_EXECUTION_TYPES: base + '/om/business-rule-execution-types',
}



