// ==UserScript==
// @name         Remove Unused Buildings
// @namespace    http://tampermonkey.net/
// @version      2024-06-13
// @description  Remove without worker
// @author       Me
// @match        https://aviatife.com/corporation/current
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aviatife.com
// @grant        none
// ==/UserScript==

RemoveUnusedCorporation();

function RemoveUnusedCorporation() {
    var table = document.getElementsByTagName("table");
    var tr, subelements;
    var information;

    if(table.length <= 1){
        return;
    }

    // Get rows
    tr = table[1].getElementsByTagName("tr");
    if(tr.length <= 1){
        return;
    }

    subelements = tr[0].querySelectorAll("td,th");
    information = FindColumn(subelements, "Information");

    for(var i=1; i<tr.length ;i++){
        subelements = tr[i].querySelectorAll("td,th")[information];

        subelements = subelements.getElementsByTagName("span");
        if(subelements.length > 1){
            if(subelements[0].innerText == " You must hire at least one employee"){
                tr[i].remove();
                i--;
            }
        }
    }
}

function FindColumn(elements, text) {

    for(var i=0; i<elements.length ;i++){
        if(elements[i].innerText == text){
            return i;
        }
    }

    return -1;
}
