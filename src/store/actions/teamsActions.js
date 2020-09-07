import axios from 'axios';
import {
    GET_TEAM_SUCCESS,
    RENDER_ALL_PERSONS_SUCCESS, RENDER_MY_TEAMS_SUCCESS,
    RENDER_PERSONS_SUCCESS,
    RENDER_TEAMS_SUCCESS, TEAM_HISTORY_SUCCESS
} from "./actionTypes";
import {API_URL, Headers_API} from "../../components/HOC/Api";

export function renderTeams() {
    return async dispatch => {
         try {
             const response = await axios.get(`${API_URL}/team`, Headers_API);

             const teams = Object.entries(response.data.content).map((team) => {
                 return {
                     team: team[1]
                 }
             });

             dispatch(renderTeamsSuccess(teams))

         } catch (e) {
             console.log(e)
         }
    }
}

export function renderMyTeams() {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/team/my`, Headers_API);

            const myTeams = Object.entries(response.data.content).map((team) => {
                return {
                    team: team[1]
                }
            });

            dispatch(renderMyTeamsSuccess(myTeams))
        } catch (e) {
            console.log(e)
        }
    }
}

export function getCurrentTeam(id) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/team/${id}`, Headers_API);

            dispatch(getTeamSuccess(response.data, response.data.owner));
        } catch (e) {
            console.log(e)
        }
    }
}

export function renderPersons(id) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/team/${id}/person`, Headers_API);

            const persons = Object.entries(response.data).map((person) => {
                return {
                    person: person[1]
                }
            });

            dispatch(renderPersonsSuccess(persons));
        } catch (e) {
            console.log(e)
        }
    }
}

export function renderAllPersons() {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/person/skill`, Headers_API);

            dispatch(renderAllPersonsSuccess(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export function teamHistory(id) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}team/${id}/history`, Headers_API);

            const historyList = Object.entries(response.data).map((item) => {
                return {
                    id: item[1].transactionId,
                    historyInfo: item[1].records
                }
            });

            dispatch(teamHistorySuccess(historyList));
        } catch (e) {
            console.log(e)
        }
    }
}

export function renderTeamsSuccess(teams) {
    return {
        type: RENDER_TEAMS_SUCCESS,
        teams
    }
}

export function renderMyTeamsSuccess(myTeams) {
    return {
        type: RENDER_MY_TEAMS_SUCCESS,
        myTeams
    }
}

export function getTeamSuccess(teamInfo, owner) {
    return {
        type: GET_TEAM_SUCCESS,
        teamInfo,
        owner
    }
}

export function renderPersonsSuccess(persons) {
    return {
        type: RENDER_PERSONS_SUCCESS,
        persons
    }
}

export function renderAllPersonsSuccess(personsList) {
    return {
        type: RENDER_ALL_PERSONS_SUCCESS,
        personsList
    }
}

export function teamHistorySuccess(historyList) {
    return {
        type: TEAM_HISTORY_SUCCESS,
        historyList
    }
}