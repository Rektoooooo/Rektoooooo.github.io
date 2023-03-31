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
var currOneSum = 0;
var currTwoSum = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setRate() {
    var loader = document.getElementById('loader');
    loader.style.display = 'block';
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
    await sleep(200);
    loader.style.display = 'none';
}
function getRate() {
    return Rate
}

console.log(Rate)

function saveNumber() {
    var numberInput = document.getElementById("amount")
    var number = parseFloat(numberInput.value);

    var afterExchange = ((number * getRate()) * Percentage).toFixed(2);

    let result = document.getElementById("result")
    result.value = afterExchange;
    console.log(result.value)
}

function changeCurrency() {
    var selectElementSecondary = document.getElementById("secondary");
    target = (selectElementSecondary.value);
    console.log(currAfter)
    console.log(target)

    var selectElementPrimary = document.getElementById("primary");
    base = (selectElementPrimary.value);
    console.log(currBefore)
    console.log(base)
}

function changePercentage() {
    var selectElement = document.getElementById("PercentageValue");
    Percentage = parseFloat(selectElement.value);
}

function addItem(item) {
    document.getElementById("totalDiv").classList.remove("hidden");
    document.getElementById("totalDiv").classList.add("flex");

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

    if (item) {
        storNum = item.id;
        currBefore = item.currBefore;
        currAfter = item.currAfter;
        name = item.name;
        before = item.before;
        after = item.after;
    } else {
        var getCurrBefore = document.getElementById("primary");
        currBefore = (getCurrBefore.value);

        var getCurrAfter = document.getElementById("secondary");
        currAfter = (getCurrAfter.value)

        var getName = document.getElementById("inputSkinName");
        name = (getName.value)

        var getBefore = document.getElementById("amount");
        before = (getBefore.value)

        var getAfter = document.getElementById("result");
        after = (getAfter.value)
    }

    let curBefore = document.createElement("p");
    curBefore.id = `curBefore${storNum}`;
    curBefore.classList.add("curBefore")
    curBefore.innerText = currBefore;
    captions.appendChild(curBefore)

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

    let skimName = document.createElement("p")
    skimName.id = `skinName${storNum}`
    skimName.classList.add("skinName")
    skimName.innerText = name;
    saveModule.appendChild(skimName)

    let priceBefore = document.createElement("p")
    priceBefore.id = `priceBefore${storNum}`
    priceBefore.classList.add("priceBefore")
    priceBefore.innerText = before;
    saveModule.appendChild(priceBefore)

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

    currOneSum += parseFloat(before);
    currTwoSum += parseFloat(after);

    const parentElement = document.getElementById("saveItemDiv");
    const numberOfChildren = parentElement.childElementCount;

    if (numberOfChildren > 0) {
        document.getElementById("reminder").classList.remove("hidden");
    }

    var summOneElement = document.getElementById('summOne')
    summOneElement.innerHTML = (currOneSum).toFixed(2) + " " + currBefore;
    var summTwoElement = document.getElementById('summTwo')
    summTwoElement.innerHTML = (currTwoSum).toFixed(2) + " " + currAfter;

    if (!item) {
        var newItem = {
            id: storNum,
            currBefore: currBefore,
            currAfter: currAfter,
            name: name,
            before: before,
            after: after
        };
        localStorage.setItem(`item${storNum}`, JSON.stringify(newItem));
    }

    storNum++;
    document.getElementById("inputSkinName").value = "";
    document.getElementById('primary').disabled = true;
    document.getElementById('secondary').disabled = true;
    console.log("ITEM SUCCESSFULLY ADDED")

}

function deleteItem(elem) {
    var storId = elem.id.replace("buttonId", "");
    console.log(`Deleting element with ID: deleteId${storId}`);

    var deleteElem = document.querySelector(`#deleteId${storId}`);

    deleteElem.parentNode.removeChild(deleteElem);

    localStorage.removeItem(`item${storId}`);
    console.log("item storID : " + `item${storId}`);
    currOneSum -= parseFloat(deleteElem.querySelector('.priceBefore').innerText);
    currTwoSum -= parseFloat(deleteElem.querySelector('.priceAfter').innerText);
    var summOneElement = document.getElementById('summOne');
    var summTwoElement = document.getElementById('summTwo');
    summOneElement.innerHTML = (currOneSum).toFixed(2) + " " + currBefore;
    summTwoElement.innerHTML = (currTwoSum).toFixed(2) + " " + currAfter;
    console.log("item deleted");

    const parentElement = document.getElementById("saveItemDiv");
    const numberOfChildren = parentElement.childElementCount;
    storNum--;

    if (numberOfChildren == 0){
        document.getElementById("totalDiv").classList.add("hidden");
        document.getElementById("reminder").classList.add("hidden");
        document.getElementById("totalDiv").classList.remove("flex");
        storNum = 1;
        document.getElementById('primary').disabled = false;
        document.getElementById('secondary').disabled = false;
    }
}

function loadItems() {
    let maxId = 0;
    for (var i = 1; i <= localStorage.length; i++) {
        var item = localStorage.getItem(`item${i}`);
        if (item) {
            item = JSON.parse(item);
            addItem(item);
            maxId = Math.max(maxId, item.id);
        }
    }
    storNum = maxId + 1;
}


document.addEventListener("DOMContentLoaded", loadItems);


window.addEventListener('load', function() {
    var loader = document.getElementById('loader');
    loader.style.display = 'none';
});
