function searchAssetName() {
    var opts, input, filter, assetList, assetArr, assetItem, assetTitle, assetStatusId, assetStatus, i, txtValue;
    input = document.getElementById("fsearch");
    filter = input.value.toUpperCase();
    opts = getSelectedOptions();
    assetList = document.getElementById("assetOwner");
    assetStatusId = "assetOwner-status";
    if ( assetList.style.display == "none") {
        assetList = document.getElementById("assetCommunity");
        assetStatusId = "assetCom-status";
    }
    assetArr = assetList.getElementsByClassName("asset-content-list-detail");
    for(i=0;i<assetArr.length;i++) {
        assetItem = assetArr[i].getElementsByClassName("asset-content-item-title");
        assetTitle = assetItem[0].getElementsByTagName("span");
        assetStatus = document.getElementById(assetStatusId+""+i);
        if(assetTitle[0] && (opts != false)) {
            txtValue = assetTitle[0].innerText || assetTitle[0].textContent;
            if((txtValue.toUpperCase().indexOf(filter) > -1) && (opts.indexOf(assetStatus.innerText) > -1)) {
                assetArr[i].style.display = "flex";
            } else {
                assetArr[i].style.display = "none";
            }
        }
        else if (assetTitle[0] && (opts == false)) {
            txtValue = assetTitle[0].innerText || assetTitle[0].textContent;
            if(txtValue.toUpperCase().indexOf(filter) > -1) {
                assetArr[i].style.display = "flex";
            } else {
                assetArr[i].style.display = "none";
            }
        }
    }
}

function getSelectedOptions () {
    var opts=[], opt;
    var sel = document.getElementById("status-search");
    for(var i=0, len=sel.options.length;i<len;i++) {
        opt = sel.options[i];
        if(opt.selected) {
            opts.push(opt.innerText);
        }
    }
    if (opts.length == 0) {return false}
    else {return opts;}
}

function searchStatus() {

}

function openTab(evt, id) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("asset-content-list");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
}
function formatState(state) {
    if (!state.id) {
        return state.text;
    }
    var baseUrl = "/user/pages/images/flags";
    var $state = $(
        '<span><img src="' + baseUrl + '/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
    );
    return $state;
};
$(document).ready(function () {
    $('.js-states').select2({minimumResultsForSearch: -1});
    $('.js-states-status').select2({});
});