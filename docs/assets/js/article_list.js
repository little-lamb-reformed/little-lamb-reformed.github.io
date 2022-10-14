var valueNames = [
  'listjs-title',
  'archive__item-excerpt',
  { data: ['category'] }
];

var detailedList = new List('main', {
  valueNames: valueNames,
  listClass: 'entries-list'
});

var simpleList = new List('main', {
  valueNames: valueNames
});

window.onhashchange = refreshList;

var windowWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
if (windowWidth < 600) {
  hideDetails();
}
else {
  showDetails();
}

setupSearchBar();


function setupSearchBar() {
  var searchBar = document.querySelector('input[type="search"]');
  var inputtingSearchTerms = false;
  var fired = false;
  searchBar.addEventListener('compositionstart', function () { inputtingSearchTerms = true });
  searchBar.addEventListener('compositionend', function () {
    inputtingSearchTerms = false;
    search(searchBar.value);
    fired = true;
  });
  searchBar.addEventListener('input', function () {
    if (!inputtingSearchTerms && !fired) {
      search(searchBar.value);
    }
    fired = false;
  });
}

function refreshList() {
  detailedList.filter(categorySelected);
  simpleList.filter(categorySelected);
  var currentSelected = decodeURI(location.hash).substring(1).replace(/\-/g, '、');
  updateBreadCrumb(currentSelected);
}

function categorySelected(item) {
  var category = item.values()['category'].replace(/、/g, '-');
  var currentSelected = decodeURI(location.hash).substring(1);
  return currentSelected === '' ? true : category === currentSelected;
}

function showDetails() {
  document.querySelector('#detailed-list').style.display = '';
  document.querySelector('#simple-list').style.display = 'none';
}

function hideDetails() {
  document.querySelector('#detailed-list').style.display = 'none';
  document.querySelector('#simple-list').style.display = '';
}

function updateBreadCrumb(category) {
  document.querySelector('#selected-catagory').textContent = category !== '' ? ' > ' + category : '';
}

function highlight(element) {
  $('.nav__items li a').removeClass('active');
  element.classList.add('active');
}

function search(keyword) {
  detailedList.search(keyword);
  simpleList.search(keyword);
}
