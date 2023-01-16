// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const getData = async (url, headers) => {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        }
    });
    return await response.json();
}
Object.prototype.patronage.setGlobalKey('api_getData', getData);