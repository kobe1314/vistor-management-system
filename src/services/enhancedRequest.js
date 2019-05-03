const fetchAPI = (apiUrl,params = {}) => {
    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (apiUrl.search(/\?/) === -1) {
            apiUrl += '?' + paramsArray.join('&')
        } else {
            apiUrl += '&' + paramsArray.join('&')
        }
    }
    return fetch(apiUrl).then(resp => resp.json());
}


const fetchFilterRecordAPI = (apiUrl,option) => {
    const request = new Request(apiUrl,option);
    return fetch(request).then(resp => resp.json()).catch((e)=>{console.error('Error: fetch err:', e)});
}

export {
    fetchAPI,
    fetchFilterRecordAPI
}