const urlWiki = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";

const global = {
  j: 0,
  n: 0,
  searchResult: []
}

function jsonp(url, callback) {
  let myCallBack = 'jsonp_callback_' + Math.round(100000 * Math.random());
  window[myCallBack] = function(data) {
    delete window[myCallBack];
    document.body.removeChild(script);
    callback(data);
  };
  let script = document.createElement('script');
  script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + myCallBack;
  document.body.appendChild(script);
}


function searchUrl() {
  let term = document.getElementById('search-term').value.toLowerCase()
    .replace(/\s/g, "_");
  if (term == "") {
    document.getElementById('search-result').innerHTML = "Please Enter Something";
  } else {
    let request = new jsonp(urlWiki + term + "&format=json", function(data) {
      global.searchResult = data;
      displayResult();
    });
  }
}

function displayResult() {
  let text = "";
  if (global.searchResult[1].length == 0) {
    text = "<h5>Sorry no results found</h5>";
  } else {
    for (i in global.searchResult[1]) {
      text += `<div><a href=\""${global.searchResult[3][global.j]}"\" target=\"_blank\"><h4>${global.searchResult[1][i]}</h4></a>`
      global.j++;
      text += `<p>${global.searchResult[2][global.n]}</p></div>`
      global.n++;
    }
  }
  document.getElementById('search-result').innerHTML = text;
  global.j = 0;
  global.n = 0;
}

function checkKey(e) {
  if (e.keyCode === 13) {
    searchUrl();
  }
}
