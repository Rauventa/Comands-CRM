import axios from 'axios';
import {
    GET_TEAM_SUCCESS,
    RENDER_ALL_PERSONS_SUCCESS, RENDER_MY_TEAMS_SUCCESS,
    RENDER_PERSONS_SUCCESS,
    RENDER_TEAMS_SUCCESS
} from "./actionTypes";

export function renderTeams() {
    return async dispatch => {
         try {
             const response = await axios.get('http://5.61.56.234/team', {
                 headers: { Authorization: "Bearer " + localStorage.token }
             });

             const teams = Object.entries(response.data.content).map((team, id) => {
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
            const response = await axios.get('http://5.61.56.234/team/my', {
                headers: { Authorization: "Bearer " + localStorage.token }
            });

            const myTeams = Object.entries(response.data.content).map((team, id) => {
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
            const response = await axios.get(`http://5.61.56.234/team/${id}`, {
                headers: { Authorization: "Bearer " + localStorage.token }
            });

            dispatch(getTeamSuccess(response.data, response.data.owner));
        } catch (e) {
            console.log(e)
        }
    }
}

export function renderPersons(id) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://5.61.56.234/team/${id}/person`, {
                headers: { Authorization: "Bearer " + localStorage.token }
            });

            console.log(response.data)

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
            const response = await axios.get(`http://5.61.56.234/person/skill`, {
                headers: { Authorization: "Bearer " + localStorage.token }
            });

            dispatch(renderAllPersonsSuccess(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export function teamHistory(id) {
    return async dispatch => {
        try {
            const response = await axios.get(`http://5.61.56.234/team/${id}/history`, {
                headers: { Authorization: "Bearer " + localStorage.token }
            })

            console.log(response.data)
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