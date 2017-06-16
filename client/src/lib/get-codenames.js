import fetch from 'isomorphic-fetch'
import { filter } from 'lodash'

export default async function getCodenames(query = null) {
    let url = '/api/codenames';

    if (typeof module !== 'undefined' && !!module.exports) {
        url = 'http://localhost:8080/api/codenames';
    }

    const response = await fetch(url);
    const codenames = await response.json();

    return !!query ? filter(codenames, query) : codenames;
}

export function filterCodenames(codenames, query = null) {
    return !!codenames ? (!!query ? filter(codenames, query) : codenames)
        : new Error("A list of codenames must be supplied");
}