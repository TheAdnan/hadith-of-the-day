$ = (queryString) => document.querySelector(queryString);

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(xhr.responseText);
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function loadHadithJSON(){
    loadJSON('data/bukhari.json',
         function(data) {
            localStorage.setItem("hadith", data);
            var ahadith = [];
            var result = JSON.parse(data);
            var size = Object.keys(result).length;
            for(var i = 0; i < size; i++)
                if (typeof result[i] !== 'undefined') {
                    ahadith.push(result[i]);
                }
            var hadith = ahadith[Math.floor(Math.random()*ahadith.length)];
            hadith = hadith.replace("()", "(s.a.w.s.)");
            hadith = hadith.replace("( )", "(s.a.w.s.)");
            $("#hadith").innerHTML = hadith;
          },
         function(xhr) { 
            return; 
         }
    );
}



function loadDataFromLocalStorage(){
    if(isEmpty(localStorage)){
        loadHadithJSON();
    }
    else{
        var ahadith = [];
        var result = JSON.parse(localStorage.getItem("hadith"));
        var size = Object.keys(result).length;
        for(var i = 0; i < size; i++)
            if (typeof result[i] !== 'undefined') {
                ahadith.push(result[i]);
            }
        var hadith = ahadith[Math.floor(Math.random()*ahadith.length)];
        hadith = hadith.replace("()", "(s.a.w.s.)");
        hadith = hadith.replace("( )", "(s.a.w.s.)");
        $("#hadith").innerHTML += hadith;
     }  
}

window.onload = function(){
    loadDataFromLocalStorage();
}


