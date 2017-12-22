/*
*   content.js
*   Create by Ross Carrigan
*/

var body = document.getElementsByTagName("body")[0];

//Creates the Increment Button
var incrementButton = document.createElement("button");
incrementButton.innerHTML = "Next >>";

//Event Handler used to get to next page
incrementButton.addEventListener ("click", function() {
    //Need to increment the ID value and go to the next page.
    var currentIdString = GetCurrentIdValue().id;
    var currentId = parseInt(currentIdString);
    currentId++;
    currentIdString = String(currentId);
    var newUrl = UpdateQueryString(currentIdString);
    
    window.location.href = newUrl;    
});

//Creates the Decrement Button
var decrementButton = document.createElement("button");
decrementButton.innerHTML = "<< Previous";
//Event Handler used to get to last page
decrementButton.addEventListener ("click", function() {
    //Need to decrement the ID value and go to the previous page.
    var currentIdString = GetCurrentIdValue().id;
    var currentId = parseInt(currentIdString);
    currentId--;
    currentIdString = String(currentId);
    var newUrl = UpdateQueryString(currentIdString);
    
    window.location.href = newUrl;   
});

//Format the buttons.
var buttonBox = document.createElement("div");
buttonBox.setAttribute("id", "btn-box");
buttonBox.appendChild(decrementButton);
buttonBox.appendChild(incrementButton);

if ($("img").length) //check to see if the image is present.
    $("img").before(buttonBox); //add buttons before the image.
else { // if the image is not present then append the buttons to the buttom of the page.
    body.appendChild(buttonBox);
    
}





/**
 * UpdateQueryString
 * 
 * Updates current URL to refect the desire changes depending on the button press.
 * 
 * Credit to https://stackoverflow.com/users/209568/adam
 * From https://stackoverflow.com/questions/5999118/how-can-i-add-or-update-a-query-string-parameter thread.
 * 
 * @param value = The new value to insert into the id queryString.
 */
function UpdateQueryString(value) {
    var key = "id";
    var url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"), 
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}

/**
 * GetCurrentIdValue
 * 
 * Creates key value pairs for all the queryStrings.
 */
function GetCurrentIdValue() { 
    var queryString = window.location.href ? window.location.href.split('?')[1] : window.location.search.slice(1);
    var obj = {};

    if (queryString) {
        queryString = queryString.split('#')[0]; //removes possible trailing info
        var arr = queryString.split('&'); //splits the information into seperate elements

        for (var i=0; i<arr.length; i++) { //for each of the elements
            var a = arr[i].split('='); //seperates the keys and the values

            // in case params are super fubr
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function(v) {
                paramNum = v.slice(1,-1);
                return '';
            });

            var paramValue = typeof(a[1])==='undefined' ? true : a[1]; // set parameter value (use 'true' if empty)

            
            if (obj[paramName]) { // if parameter name already exists
                if (typeof obj[paramName] === 'string') { // convert value to array (if still string)
                    obj[paramName] = [obj[paramName]];
                }
                if (typeof paramNum === 'undefined') { // if no array index number specified...
                    obj[paramName].push(paramValue); // put the value on the end of the array
                }
               
                else {  // if array index number specified...
                    obj[paramName][paramNum] = paramValue; // put the value at that index number
                }
            }
            else {  // if param name doesn't exist yet, set it
                obj[paramName] = paramValue;
            }
        }
    }

    return obj
}