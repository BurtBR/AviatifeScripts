// ==UserScript==
// @name         Remove Cancelled Buildings
// @namespace    http://tampermonkey.net/
// @version      2024-06-13
// @description  Remove Cancelled Buildings
// @author       Me
// @match        https://aviatife.com/airline/buildings
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aviatife.com
// @grant        none
// ==/UserScript==

RemoveCancelledBuildings();

function RemoveCancelledBuildings() {
    var table = document.getElementsByTagName("table");
    var tr, subelements;
    var cost;

    if(table.length < 1){
        return;
    }

    // Get rows
    tr = table[0].getElementsByTagName("tr");
    if(tr.length <= 1){
        return;
    }

    subelements = tr[0].querySelectorAll("td,th");
    cost = FindColumn(subelements, "Weekly cost / Next payment date");

    for(var i=1; i<tr.length ;i++){
        subelements = tr[i].querySelectorAll("td,th")[cost];

        subelements = subelements.getElementsByTagName("span");
        if(subelements.length > 0){
            if(subelements[0].innerText.includes("Cancelled")){
                tr[i].remove();
                i--;
            }
        }
    }
}

function FindColumn(elements, text) {

    for(var i=0; i<elements.length ;i++){
        if(elements[i].innerText.includes(text)){
            return i;
        }
    }

    return -1;
}
