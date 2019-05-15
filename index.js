const API_URL = 'https://api.github.com/';
const rootElement = document.getElementById('root');
const loadingElement = document.getElementById('loading-overlay');

async function startApp() {
    const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
    const fighters = await callApi(endpoint, 'GET');
    rootElement.innerText = getFightersNames(fighters);
}

function* createFileFetcher(url, options) {
    const response = yield fetch(url, options);
    const file = yield response.ok ? response.json() : Promise.reject(Error('Failed to load'));
    return JSON.parse(atob(file.content));
}
  
function callApi(endpoind, method) {
    const url = API_URL + endpoind;
    const options = {
        method
    };
    const fileFetcher = createFileFetcher(url, options);
    const handle = result => result.done 
        ? Promise.resolve(result.value)
        : Promise.resolve(result.value).then(res => handle(fileFetcher.next(res)))
  
    return handle(fileFetcher.next())
        .then(res => res)
        .catch(error => { throw error });
  }

function getFightersNames(fighters) {
  const names = fighters.map(it => it.name).join('\n');
  return names;
}

startApp();