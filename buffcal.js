

var Percentage = 1;

var base = "CNY";

var target = "EUR";

var Rate;

var name = "";

var before = 0;

var after = 0;

var currBefore = "RMB";

var currAfter = "EUR";

var storNum = 1;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setRate() {
    await sleep(500);
    var selectElement = document.getElementById("secondary");
    target = (selectElement.value);
    var tocurr = (selectElement.value);

    fetch(`https://exchange-rates.abstractapi.com/v1/live/?api_key=daaa52fb144545498fe37e279f5c200b&base=${base}&target=${target}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(tocurr)
            Rate = parseFloat(data["exchange_rates"][tocurr]);
            console.log(Rate)
            getRate()
            saveNumber()
        })
        .catch(error => {
            console.error('Error:', error);
        });

}
function getRate(){
    return Rate
}

console.log(Rate)

function saveNumber(){
    var numberInput = document.getElementById("amount")
    var number = parseFloat(numberInput.value);

    var afterExchange = ((number * getRate()) * Percentage).toFixed(2);

    let result = document.getElementById("result")
    result.value = afterExchange;
    console.log(result.value)
}

function changeCurrency(){
    var selectElementSecondary = document.getElementById("secondary");
    target = (selectElementSecondary.value);

    var selectElementPrimary = document.getElementById("primary");
    base = (selectElementPrimary.value);
}

function changePercentage(){
    var selectElement = document.getElementById("PercentageValue");
    Percentage = parseFloat(selectElement.value);
}



function addItem(){

    var getMainDiv = document.getElementById("saveItemDiv");

    var saveStorage = document.createElement('div');
    saveStorage.classList.add("saveStorage")
    saveStorage.id = `deleteId${storNum}`
    console.log(`Created element with ID: deleteId${storNum}`);
    getMainDiv.appendChild(saveStorage)

    var captions = document.createElement('div');
    captions.classList.add("captions")
    saveStorage.appendChild(captions)

    var saveModule = document.createElement('div');
    saveModule.classList.add("saveModule")
    saveStorage.appendChild(saveModule)


    captions.innerHTML = "<p style=\"margin: 5px 10px\">#</p><p>Name</p>"

    var getCurrBefore = document.getElementById("primary");
    currBefore = (getCurrBefore.value);
    let curBefore = document.createElement("p");
    curBefore.id = `curBefore${storNum}`;
    curBefore.classList.add("curBefore")
    curBefore.innerText = currBefore;
    captions.appendChild(curBefore)

    var getCurrAfter = document.getElementById("secondary");
    currAfter = (getCurrAfter.value)
    let curAfter = document.createElement("p");
    curAfter.id = `curAfter${storNum}`;
    curAfter.classList.add("curAfter")
    curAfter.innerText = currAfter;
    captions.appendChild(curAfter)

    let getlistNum = document.createElement("p")
    getlistNum.innerText = storNum;
    getlistNum.id =`listNum${storNum}`
    getlistNum.classList.add("listNum")
    saveModule.appendChild(getlistNum)

    var getName = document.getElementById("inputSkinName");
    name = (getName.value)
    let skimName = document.createElement("p")
    skimName.id = `skinName${storNum}`
    skimName.classList.add("skinName")
    skimName.innerText = name;
    saveModule.appendChild(skimName)

    var getBefore = document.getElementById("amount");
    before = (getBefore.value)
    let priceBefore = document.createElement("p")
    priceBefore.id = `priceBefore${storNum}`
    priceBefore.classList.add("priceBefore")
    priceBefore.innerText = before;
    saveModule.appendChild(priceBefore)

    var getAfter = document.getElementById("result");
    after = (getAfter.value)
    let priceAfter = document.createElement("p")
    priceAfter.id = `priceAfter${storNum}`
    priceAfter.classList.add("priceAfter")
    priceAfter.innerText = after;
    saveModule.appendChild(priceAfter)

    var delButton = document.createElement("button");
    delButton.classList.add("bi-trash3-fill");
    delButton.id = `buttonId${storNum}`;
    delButton.addEventListener("click", function() {
        deleteItem(this);
    });
    saveModule.appendChild(delButton);

    var item = {
        id: storNum,
        currBefore: currBefore,
        currAfter: currAfter,
        name: name,
        before: before,
        after: after
    };
    localStorage.setItem(`item${storNum}`, JSON.stringify(item));

    storNum++;
    console.log("ITEM SUCCESSFULLY ADDED")
}

function deleteItem(elem){
    var storId = elem.id.replace("buttonId", "");
    console.log(`Deleting element with ID: deleteId${storId}`);
    var elem = document.querySelector(`#deleteId${storId}`);
    elem.parentNode.removeChild(elem);
    localStorage.removeItem(`item${storId}`);
    console.log("item deleted");
}

for (var i = 1; i <= localStorage.length; i++) {
    var item = JSON
}

