const fetchRecordsAPI = (apiUrl) => {
    return fetch(apiUrl).then(resp => resp.json());
}

const fetchFilterRecordAPI = (apiUrl,option) => {
    const request = new Request(apiUrl,option);
    return fetch(request).then(resp => resp.json()).catch((e)=>{console.error('Error: fetch err:', e)});
}

export {
    fetchRecordsAPI,
    fetchFilterRecordAPI
}