'use strict';

const apiKey = 'BCTrKL1oY0ZM7OSB9kn4HCdGQKAqPddgt3MKNL6b'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
      <p>Website: <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a></p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getParks(query, state, maxResults) {
  const params = {
    stateCode: state,
    limit: maxResults - 1,
    api_key: apiKey,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    //.then(responseJson => console.log(responseJson))
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const parkName = $('#js-park-name').val();
    const state = $('#js-state').val();
    const maxResults = $('#js-max-results').val();
    console.log(typeof maxResults);
    getParks(parkName, state, maxResults);
  });
}

$(watchForm);
