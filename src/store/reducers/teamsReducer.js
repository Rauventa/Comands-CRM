import {
    GET_TEAM_SUCCESS,
    RENDER_ALL_PERSONS_SUCCESS, RENDER_MY_TEAMS_SUCCESS,
    RENDER_PERSONS_SUCCESS,
    RENDER_TEAMS_SUCCESS, TEAM_HISTORY_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    teams: [],
    myTeams: [],
    teamInfo: {},
    owner: '',
    persons: [],
    personsList: [],
    historyList: []
};

export default function teamsReducer(state = initialState, action) {
    switch(action.type) {
        case RENDER_TEAMS_SUCCESS:
            return {
                ...state,
                teams: action.teams
            };
        case RENDER_MY_TEAMS_SUCCESS:
            return {
                ...state,
                myTeams: action.myTeams
            };
        case GET_TEAM_SUCCESS:
            return {
                ...state,
                teamInfo: action.teamInfo,
                owner: action.owner
            };
        case RENDER_PERSONS_SUCCESS:
            return {
                ...state,
                persons: action.persons
            };
        case RENDER_ALL_PERSONS_SUCCESS:
            return {
                ...state,
                personsList: action.personsList
            };
        case TEAM_HISTORY_SUCCESS:
            return {
                ...state,
                historyList: action.historyList
            };
        default:
            return state
    }
}