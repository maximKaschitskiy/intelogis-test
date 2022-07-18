class AddressApi {
  constructor(baseUrl, apiKey, dataset) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.dataset = dataset;
  }

  getDataset(quantity) {
    return fetch(this._queryStringBuild(quantity), {
      method: "GET",
    }).then(this._checkResponse.bind(this));
  }

  _queryStringBuild(quantity) {
    const query = new URLSearchParams({
      $top: quantity,
      api_key: this.apiKey,
    });
    return this.baseUrl + this.dataset + "/rows?" + query.toString();
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }
}

const baseUrl = `https://apidata.mos.ru/v1/datasets/`;
const apiKey = process.env.REACT_APP_YAMAP_KEY;
const datasetN = "60562";

const addressApi = new AddressApi(baseUrl, apiKey, datasetN);

export default addressApi;
