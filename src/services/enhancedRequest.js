const fetchRecordsAPI = (apiUrl) => {
    return fetch(apiUrl).then(resp => resp.json());
}

export {
    fetchRecordsAPI
}