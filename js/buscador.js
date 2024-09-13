const searchContainer = document.querySelector('.search-input-box');
const inputSearch = searchContainer.querySelector('input');
const boxSuggestions = document.querySelector('.container-suggestions');

const searchLink = document.querySelector('a');



inputSearch.onkeyup = e => {
    const userData = e.target.value;
    var emptyArray = [];

    if (userData) {
        emptyArray = suggestions.filter(data => {
            return data
            .toLocaleLowerCase()
            .startsWith(userData.toLocaleLowerCase());
        });
        
        emptyArray = emptyArray.map(data => {
            return (`<li>${data}</li>`);
        });

        searchContainer.classList.add('active');
        showSuggestions(emptyArray);

    }
    else {
        searchContainer.classList.remove('active');
        
    }
};

const showSuggestions = (list) => {
    var listData;

    if (!list.length) {
        userValue = inputSearch.value;
        listData = `<li>${userValue}</li>`;
    }

    else {
        listData = list.join (' ');
    }

    boxSuggestions.innerHTML = listData;
};