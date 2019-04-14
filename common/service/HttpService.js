export default class HttpService {
    static getResponse(url, callBack) {
        fetch(url, {method: 'GET'}).then((response) => response.json())
        .then((responseJson) => callBack(responseJson))
        .catch((error) => callBack(null));
    }
}