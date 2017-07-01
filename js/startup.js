function start_load() {
     $(document).ready(function(){
        $('.parallax').parallax();
      });

      $(document).ready(function(){
    $('.carousel').carousel();
    update_carousel();
  });
}


function set_link(owner, repo, el_id, distro, prefix) {
               var baseUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/tags";
               var xhttp = new XMLHttpRequest();
               xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                         var element = document.getElementById(el_id);
                         var data = JSON.parse(this.responseText);
                         var i;

                         for (i = 0; i < data.length; i++) {
                              if(data[i]['name'].indexOf(distro) !== -1)
                                   break;
                         }

                         if (element && data) {
                              element.href = data[i]['zipball_url'];
                              element.innerHTML = prefix + data[i]['name'];
                              update_carousel();
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


function update_carousel(){
     if(window.navigator.userAgent.indexOf("Windows") !== -1){
          set_carousel_win();
     }
     if(window.navigator.userAgent.indexOf("Linux")  !== -1 ){
          set_carousel_mac();
     }
     if(window.navigator.userAgent.indexOf("Mac")  !== -1){
          set_carousel_mac();
     }
}

function set_carousel_win(){
     $('.carousel').carousel('set', 1);
}

function set_carousel_mac(){
     $('.carousel').carousel('set', 2);
}

function set_carousel_mac(){
     $('.carousel').carousel('set', 3);
}

set_link('prothesis-software', 'prothesis-software.github.io', 'down_anchor', get_os_easy(), "<i class=\"material-icons left\">cloud</i> Download ");
