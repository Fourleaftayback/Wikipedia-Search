let urlWiki = "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
let searchResult = [];
let j = 0;
let n = 0;

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
      searchResult = data;
      displayResult();
    });
  }
}

function displayResult() {
  let text = "";
  if (searchResult[1].length == 0) {
    text = "<h5>Sorry no results found</h5>";
  } else {
    for (i in searchResult[1]) {
      text += `<div><a href=\""${searchResult[3][j]}"\" target=\"_blank\"><h4>${searchResult[1][i]}</h4></a>`
      j++;
      text += `<p>${searchResult[2][n]}</p></div>`
      n++;
    }
  }
  document.getElementById('search-result').innerHTML = text;
  j = 0;
  n = 0;
}

function checkKey(e) {
  if (e.keyCode === 13) {
    searchUrl();
  }
}
