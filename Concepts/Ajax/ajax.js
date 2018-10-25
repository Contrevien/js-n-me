// Asynchronous JavaScript & XML
// Axios & Superagent are libraries to make requests!
// Fetch API is a new way, but support is limited
// http://api.wordnik.com/v4/words.json/randomWord?api_key=1951e6dada0a610fa300b00926204a886d3186416c0e5cacd
document.getElementsByTagName("body")[0].style.fontFamily = "monospace";
document.getElementById("text").addEventListener("click", loadText);

function loadText() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'sample.txt', true);
    // 3 parameters are: Request Type, URL & Async or Not
    
    // There are 2 ways to load data async-ly - onload & onreadystatechange
    
    // Onload function is called after the data has been loaded Asynchronously
    // The script will wait for the loading to be completed
    xhr.onload = function(){
        if(this.status === 200){
            document.getElementById("resText").innerHTML = this.responseText;
        }
        else if(this.status === 404){
            document.getElementById("resText").innerHTML = "Not Found!";
        }
    }

    // Just a utility function to handle errors, if any
    xhr.onerror = function() {
        document.getElementById("resText").innerHTML = "Something went wrong!";
    }

    // The onreadystatechange function depends on the readyStates
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("resText").innerHTML = this.responseText;
        } 
    }

    /* The difference between onload & onreadystatechange is that 
        onload runs only when the readyState reaches the value 4
        where as onreadystatechange runs just after the connection
        is established i.e. 1 */

    // There is one more function to send AJAX requests
    // It is specifically for loaders on websites

    xhr.onprogress = function() {
        // This one gets executed when the readyState value is set to 3
    }

    // Sends Request
    xhr.send();
}

// readyState values
// 0: request not initialized
// 1: request connection established
// 2: request received
// 3: processing request
// 4: request finished and response is ready


// JSON

document.getElementById("json-1").addEventListener("click", loadJSON);

function loadJSON() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'user.json', true);

    xhr.onload = function() {
        if (this.status === 200) {
            document.getElementById("resJSON-1").innerHTML = this.response;

            // Use JSON.parse() to convert this JSON to a JS object
            var user = JSON.parse(this.response);
            console.log(user);
        }
    }

    xhr.send();
}

document.getElementById("json-2").addEventListener("click", loadJSONS);

function loadJSONS() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'users.json', true);

    xhr.onload = function() {
        if (this.status === 200) {
            document.getElementById("resJSON-2").innerHTML = this.response;
            var users = JSON.parse(this.response);
            console.log(users);
            // This time users will be an array of objects
        }
    }

    xhr.send();
}

document.getElementById("api").addEventListener("click", loadAPI);

function loadAPI() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&api_key=1951e6dada0a610fa300b00926204a886d3186416c0e5cacd', true);
    xhr.onload = function() {
        if(this.status === 200) {
            var words = JSON.parse(this.responseText);
            for ( var x in words) {
                document.getElementById("resApi").innerHTML += words[x].word + " ";
            }
        }

    }

    xhr.send();
}

// PHP
// You need to have these files in htdocs folder of xampp
// The Apache server must be running to see the output
document.getElementById("php").addEventListener("click", get);

function get() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'process.php', true);
    xhr.onload = function(){
        console.log(this.responseText);
    }
    xhr.send();
}
