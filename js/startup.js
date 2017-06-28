function start_load() {
     $(document).ready(function(){
        $('.parallax').parallax();
      });

      $(document).ready(function(){
    $('.carousel').carousel();
  });
}


function set_link(owner, repo, el_id, prefix) {
               var baseUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/tags";
               var xhttp = new XMLHttpRequest();
               xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                         var element = document.getElementById(el_id);
                         var data = JSON.parse(this.responseText);

                         if (element && data) {
                              element.href = data[0]['zipball_url'];
                              element.innerHTML = prefix + data[0]['name'];
                         } else {
                              alert("Something went terribly wrong!");
                         }

                    }
               };
               xhttp.open("GET", baseUrl, true);
               xhttp.send();
          }


          set_link('egeldenhuys', 'prothesis-release', 'down_anchor', "<i class=\"material-icons left\">cloud</i> Download ");
