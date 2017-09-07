function start_load() {
     $(document).ready(function(){
        $('.parallax').parallax();
      });

      $(document).ready(function(){
    $('.carousel').carousel();
    update_carousel();
      });
    $('.carousel').on('mouseup',function(){
	update_link();
    });
    setInterval(function(){
	update_link();
    },5000);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/*
a[] => An array of releases.
a[]['assets'] => An array representing assets to the release; Three of these should be binary packages
a[]['assets'][i][browser_download_url] => A link to the download of the i'th asset.
a[]['assets'][i][name] => Name of the i'th asset.
*/
function get_state(id){
	var output = "";
        for (var property in document.getElementById(id)) {
	    output += property + '===> ' + document.getElementById(id)[property]+'; ';
	}
    return output;
}

function get_active_carousel(){
    if(get_state('i_windows').indexOf('carousel-item active') !== -1){
	console.log("Windows is active");
	return 1;
    }
    if(get_state('i_linux').indexOf('carousel-item active') !== -1){
	console.log("Linux is active");
	return 2;
      }
    if(get_state('i_mac').indexOf('carousel-item active') !== -1){
	console.log("Mac is active");
	return 3;
    }
    return -1;
}

function update_link(){
    var os = get_active_carousel();
    if(os !== -1){
	set_link('prothesis-software', 'prothesis-software.github.io', 'down_anchor', translate_os(os), "<i class=\"material-icons left\">cloud</i> Download ")
    }
}

function set_link(owner, repo, el_id, distro, prefix) {
               var baseUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/releases";
               var xhttp = new XMLHttpRequest();
               xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                         var element = document.getElementById(el_id);
                         var data = JSON.parse(this.responseText);
                         var i;

                         var workingData = data[data.length-1]; // Assume we want the latest release.
                         for (i = 0; i < workingData['assets'].length-1 ; i++) {
                              if(workingData['assets'][i]['name'].indexOf(distro) !== -1)
                                   break;
                         }


                         if (element && data) {
                              element.href = workingData['assets'][i]['browser_download_url'];
                              element.innerHTML = prefix + workingData['assets'][i]['name'];
                              update_carousel(distro);
                         } else {
                              alert("Something went terribly wrong!");
                         }

                    }
               };
               xhttp.open("GET", baseUrl, true);
               xhttp.send();
          }

function get_os_easy(){
    if(window.navigator.userAgent.indexOf("Windows") !== -1){
          return "windows";
     }
     if(window.navigator.userAgent.indexOf("Linux")  !== -1 ){
          return "linux";
     }
     if(window.navigator.userAgent.indexOf("Mac")  !== -1){
          return "mac";
     }
}

function translate_os(os){
    if(os === 1){
	console.log("Translated Windows");
	return "windows";
    }
    if(os === 2){
	console.log("Translated Linux");
	return "linux";
    }
    if(os === 3){
	console.log("Translated Mac");
	return "mac";
    }
}


function update_carousel(distro){
     if(distro === "windows"){
          set_carousel_win();
     }
     if(distro === "linux"){
          set_carousel_linux();
     }
     if(distro === "mac"){
          set_carousel_mac();
     }
}

function set_carousel_win(){
     $('.carousel').carousel('set', 1);
}

function set_carousel_mac(){
     $('.carousel').carousel('set', 2);
}

function set_carousel_linux(){
    $('.carousel').carousel('set', 3);
}

set_link('prothesis-software', 'prothesis-software.github.io', 'down_anchor', get_os_easy(), "<i class=\"material-icons left\">cloud</i> Download ");
