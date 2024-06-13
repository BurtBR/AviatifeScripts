// ==UserScript==
// @name         Group Commodities
// @namespace    http://tampermonkey.net/
// @version      2024-06-12
// @description  Group same commodities in the same airport
// @author       Me
// @match        https://aviatife.com/market/owned
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aviatife.com
// @grant        none
// ==/UserScript==

GroupCommodities();

function GroupCommodities() {
    var table = document.getElementsByTagName("table");
    var tr, subelements, samesubelements;
    var product, where, units, totvalue, quality, same;
    var auxvalue, unitaux, sameunitaux;

    if(table.length < 1){
        return;
    }

    // Get rows
    tr = table[0].getElementsByTagName("tr");
    if(tr.length <= 1){
        return;
    }

    subelements = tr[0].querySelectorAll("td,th");
    product=FindColumn(subelements, "Product");
    where=FindColumn(subelements, "Where");
    units=FindColumn(subelements, "Units / Space / Weight");
    totvalue=FindColumn(subelements, "Total value");
    quality=FindColumn(subelements, "Quality");

    for(var i=1; i<tr.length ;i++){
        subelements = tr[i].querySelectorAll("td,th");

        same = FindSame(tr, product, where+1, subelements, i);

        if(same != -1){
            samesubelements = tr[same].querySelectorAll("td,th");

            if(!samesubelements[where].innerText.includes(subelements[where].innerText)){
                samesubelements[where].innerText = samesubelements[where].innerText +
                    "," + subelements[where].innerText;
            }

            if(!samesubelements[quality].innerText.includes(subelements[quality].innerText)){
                samesubelements[quality].innerText =
                    samesubelements[quality].innerText +
                    "," + subelements[quality].innerText;
            }

            auxvalue = parseFloat(samesubelements[totvalue].innerText.replace(/[$,]+/g,""));
            if(!isNaN(auxvalue)){
                auxvalue += parseFloat(subelements[totvalue].innerText.replace(/[$,]+/g,""));
                samesubelements[totvalue].innerText = auxvalue.toLocaleString(
                                                                        'en-US', {
                                                                        style: 'currency',
                                                                        currency: 'USD',
                                                                    });
            }

            unitaux = subelements[units].innerText.split("/");
            sameunitaux = samesubelements[units].innerText.split("/");

            sameunitaux[0] = parseInt(sameunitaux[0]) + parseInt(unitaux[0]);

            sameunitaux[1] = parseFloat(sameunitaux[1]) + parseFloat(unitaux[1]);

            sameunitaux[2] = parseFloat(sameunitaux[2]) + parseFloat(unitaux[2]);

            samesubelements[units].innerText =
                sameunitaux[0] + " / " +
                sameunitaux[1].toFixed(2) + " L / " +
                sameunitaux[2].toFixed(2) + " Kg";

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

function FindSame(rows, product, ICAO, elements, currrow){

    var subelements;

    for(var i=1; i<currrow ;i++){
        subelements = rows[i].querySelectorAll("td,th");
        if(subelements[product].innerText==elements[product].innerText &&
           subelements[ICAO].innerText==elements[ICAO].innerText){
            return i;
        }
    }
    return -1;
}
