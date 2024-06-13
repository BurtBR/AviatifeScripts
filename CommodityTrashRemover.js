// ==UserScript==
// @name         Commodity Trash Remover
// @namespace    http://tampermonkey.net/
// @version      2024-06-12
// @description  Remove empty items
// @author       Me
// @match        https://aviatife.com/market/owned
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aviatife.com
// @grant        none
// ==/UserScript==

RemoveCommodities("0 / 0 L / 0 kg");

function RemoveCommodities(text) {
    var table = document.getElementsByTagName("table");
    var tr, subelements;

    if(table.length < 1){
        return;
    }

    // Get rows
    tr = table[0].getElementsByTagName("tr");

    for(var i=1; i<tr.length ;i++){
        subelements = tr[i].querySelectorAll("td,th");
        if(FindColumn(subelements, text) != -1){
            tr[i].remove();
            i--;
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
