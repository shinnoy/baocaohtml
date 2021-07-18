   // sidebar
   function sidebarSearch() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("sidebarSearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("sidebarMenu");
    li = ul.getElementsByTagName("li");

    for(i=0;i<li.length;i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        }  else {
            li[i].style.display = "none";
        }
    }
}
function openContent(evt, index) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(index).style.display = "block";
    evt.currentTarget.className += " active";
}

// filter search 
function filterSearch(x) {
    var input, filter, rootNode, ip, label, i;
    input = document.getElementById("filterSearch"+x);
    filter = input.value.toUpperCase();
    rootNode = document.getElementById("filterdetail"+x);
    ip = rootNode.getElementsByTagName("input");
    label = rootNode.getElementsByTagName("label");
    for(i=0;i<label.length;i++) {
        if (ip[i+1].value.toUpperCase().indexOf(filter) > -1) {
            label[i].style.display = "";
           
        }  else {
            label[i].style.display = "none";
        }
    }
}
// end filter search