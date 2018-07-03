$(document).ready(function(){
    console.log('document is ready');
    getUsers();
});

const buttonLoadMore= document.getElementById('load-more-button');
let lastResponse    = {};
let users           = [];

/**
 * FUNCTION: This will get users from server. Here we are using `fetch()` method of 
 * global object Window. It is replacement of XHR being used earlier. It will return
 * promise that will again return `response` object.
 */
const getUsers = function(page = 1){
    // console.log('getUsers has been clicked');
    buttonLoadMore.setAttribute('disabled', true);
    const baseApi   = 'https://reqres.in/api/users';
    const finalApi  = baseApi + '?page=' + page;
    const myHeaders = new Headers();
    const myInit    = { 
        method      : 'GET',
        headers     : myHeaders,
        mode        : 'cors',
        cache       : 'default' };

    const myRequest = new Request(finalApi, myInit);

    fetch(myRequest).then(function(response) {
        console.log('getUsers successful');
        response.json().then(function(responseData){
            lastResponse  =   responseData;
            users = [...users, ...responseData.data];
            console.log(users);
            if(responseData.page < responseData.total_pages){
                buttonLoadMore.removeAttribute('disabled');
            }
            updateView(responseData.data);
        });
    }, function(){
        console.log('getUsers unsuccessful');
        window.location = '../404.html';
    });
};

const loadMore = function(){
    if(lastResponse.page < lastResponse.total_pages){
        getUsers(lastResponse.page+1);
    }
}

const updateView = function(dataArray){
    const displayElement = document.getElementById('users-display-wrapper');
    for (let i = 0; i < dataArray.length; i++){
        var dataObject = dataArray[i];
        console.log(dataObject);
        const newCard = [
        '<div class="col-xs-12 col-md-4" style="margin-bottom: 20px; display:flex;">',
        '<div class="card" id=" style="align-self:stretched;"',
        dataObject.id,
        '">',
        '<img class="card-img-top" src="',
        dataObject.avatar,
        '" alt="Avatar">',
        '<div class="card-body">',
        '<p class="card-text">',
        '<h5>First Name = ',
        dataObject.first_name,
        '</h5>',
        '<h5>Last Name = ',
        dataObject.last_name,
        '</h5>',
        '</p>',
        '</div>',
        '</div>',
        '</div>',
        ];

        displayElement.innerHTML += newCard.join('');
    }
};
