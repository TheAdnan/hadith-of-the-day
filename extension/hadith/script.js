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

loadJSON('data/bukhari.json',
         function(data) {
            var ahadith = [];
         	var result = JSON.parse(data);
         	var size = Object.keys(result).length;
         	for(var i = 0; i < size; i++)
                if (typeof result[i] !== 'undefined') {
                    ahadith.push(result[i]);
                }

            var hadith = ahadith[Math.floor(Math.random()*ahadith.length)];
            console.log(hadith)
          },
         function(xhr) { 
         	return; 
         }
);