$ = (queryString) => document.querySelector(queryString);

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
            $("#hadith").appendChild(document.createTextNode(hadith));
          },
         function(xhr) { 
            return; 
         }
    );
}



function loadDataFromLocalStorage(){
    if(localStorage.getItem("hadith") === null){
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
        $("#hadith").appendChild(document.createTextNode(hadith));
     }  
}

window.onload = function(){
    loadDataFromLocalStorage();
};


