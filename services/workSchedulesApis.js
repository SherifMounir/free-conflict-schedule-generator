let base =  "";

export default {

    ///////////////////////////////////////////
    //                                       //
    //        Supporter Rosters SERVICES     //
    //                                       //
    ///////////////////////////////////////////

    WS_GET_OM_SUPPORTER_ROSTERS: base + '/om-supporter-rosters',
    WS_ADD_OM_SUPPORTER_ROSTERS: base + '/om-supporter-rosters',
    AM_UPDATE_OM_SUPPORTER_ROSTERS_BY_ID: id => base + `/om-supporter-rosters/${id}`,
    AM_GET_OM_SUPPORTER_ROSTERS_BY_ID: id => base + `/om-supporter-rosters/${id}`,
    AM_REMOVE_OM_SUPPORTER_ROSTERS_BY_ID: id => base + `/om-supporter-rosters/${id}`, 

    /////////////////////////////////////////////////////
    //                                                 //
    //        Supporter Roster Exceptions SERVICES     //
    //                                                 //
    /////////////////////////////////////////////////////

    WS_GET_OM_SUPPORTER_ROSTER_EXCEPTIONS: base + '/om-supporter-roster-exceptions',
    WS_ADD_OM_SUPPORTER_ROSTER_EXCEPTIONS: base + '/om-supporter-roster-exceptions',
    WS_UPDATE_OM_SUPPORTER_ROSTER_EXCEPTIONS_BY_ID: id => base + `/om-supporter-roster-exceptions/${id}`,
    WS_GET_OM_SUPPORTER_ROSTER_EXCEPTIONS_BY_ID: id => base + `/om-supporter-roster-exceptions/${id}`,
    WS_REMOVE_OM_SUPPORTER_ROSTER_EXCEPTIONS_BY_ID: id => base + `/om-supporter-roster-exceptions/${id}`, 

    //////////////////////////////////////////
    //                                      //
    //      Supporter Vacations SERVICES    //
    //                                      //
    //////////////////////////////////////////

    WS_GET_OM_SUPPORTER_VACATIONS: base + '/om-supporter-vacations',
    WS_ADD_OM_SUPPORTER_VACATIONS: base + '/om-supporter-vacations',
    WS_UPDATE_OM_SUPPORTER_VACATIONS_BY_ID: id => base + `/om-supporter-vacations/${id}`,
    WS_GET_OM_SUPPORTER_VACATIONS_BY_ID: id => base + `/om-supporter-vacations/${id}`,
    WS_REMOVE_OM_SUPPORTER_VACATIONS_BY_ID: id => base + `/om-supporter-vacations/${id}`, 

    //////////////////////////////////////////
    //                                      //
    //       Supporter Slots SERVICES       //
    //                                      //
    //////////////////////////////////////////

    WS_GET_OM_SUPPORTER_SLOTS: base + '/om-supporter-slots',
    WS_GET_OM_SUPPORTER_SLOTS_BY_ID: id => base + `/om-supporter-slots/${id}`,
}