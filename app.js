document.addEventListener("DOMContentLoaded", function() {
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

let cookieVal = 0,
    currCookieVal = cookieVal,
    cookieProdSec = 0,
    cursorCounter = 0,
    grandmaCounter = 0,
    farmCounter = 0,
    mineCounter = 0,
    factoryCounter = 0,
    cursorPrice = 15,
    grandmaPrice = 100,
    farmPrice = 1100,
    minePrice = 12000,
    factoryPrice = 130000,
    cursorExtra, grandmaExtra, farmExtra, mineExtra, factoryExtra,
    cursorProdVal, grandmaProdVal, farmProdVal, mineProdVal, factoryProdVal,
    round = (n) => Math.round(n*10)/10,
    priceNew = (pr, co) => Math.floor(pr + co * 0.1 * pr),
    production = (prodVal, counter) => round(prodVal * counter);

//storing and getting data from indexesDB
const variablesData = [
  { id: 'cookieVal', val: cookieVal},
  { id: 'cursorCounter', val: cursorCounter},
  { id: 'grandmaCounter', val: grandmaCounter},
  { id: 'farmCounter', val: farmCounter},
  { id: 'mineCounter', val: mineCounter},
  { id: 'factoryCounter', val: factoryCounter},
  { id: 'cursorPrice', val: cursorPrice},
  { id: 'grandmaPrice', val: grandmaPrice},
  { id: 'farmPrice', val: farmPrice},
  { id: 'minePrice', val: minePrice},
  { id: 'factoryPrice', val: factoryPrice}
];

var db;
var request = window.indexedDB.open('appStateDb', 3);

request.onupgradeneeded = function(event) {

    db = request.result;

    if (db.objectStoreNames.contains('variables'))
    {
      db.deleteObjectStore('variables');
    }
  var objectStore = db.createObjectStore("variables", {keyPath: "id"});

  }

request.onerror = function() {
    console.log("error: ");
};

request.onsuccess = function() {
    db = request.result;
    var trans = db.transaction("variables", "readwrite");
    var store = trans.objectStore("variables");
    console.log("success: "+ db);
    readVariables();
};

function getdataVal(keyid) {
  //  pobranie wartości zmiennej wg jej nazwy w Stringu
  var retVal = 0

  if (variablesData.some(function(currid) { return currid.id === keyid;}))
   {
    try {
      retVal = eval(keyid); // rozwinięcie nazwy zmiennej
    } catch (err) {
      return 0;
    }
  }
  console.log("some", keyid, retVal)
  return retVal;
}
function setdataVal(keyid, newval) {
 // przypisanie zmiennej nowej wartości wg ID
 switch ( keyid ){
  case "cookieVal":
   cookieVal = newval;
   break;
  case "cursorCounter":
   cursorCounter = newval;
   break;
  case "grandmaCounter":
   grandmaCounter = newval;
   break;
  case "farmCounter":
   farmCounter = newval;
   break;
  case "mineCounter":
   mineCounter = newval;
   break;
  case "factoryCounter":
   factoryCounter = newval;
   break;
  case "cursorPrice":
   cursorPrice = newval;
   break;
  case "grandmaPrice":
   grandmaPrice = newval;
   break;
  case "farmPrice":
   farmPrice = newval;
   break;
  case "minePrice":
   minePrice = newval;
   break;
  case "factoryPrice":
   factoryPrice = newval;
   break;
  default :
    return false;
  }
  return true;
}

function readVariables(){
// odczyt zmiennych z bazy

 var trans = db.transaction("variables", "readwrite");
 var store = trans.objectStore("variables");

 variablesData.forEach(function(datavar) {

  var request = store.get(datavar.id); // odczyt rekordu

  request.onsuccess = function(event) {
  // Get the old value that we want to update
   var data = event.target.result;
   console.log("success get",data.id,data.val);
   setdataVal(data.id, data.val); // zapisać do zmiennej
   };
 });
}

function saveVariables(){
// zapis zmiennych do bazy
console.log('save', db);
if (!db) {
  return;
}
 var trans = db.transaction("variables", "readwrite");
 var store = trans.objectStore("variables");

variablesData.forEach(function(datavar) {
 var request = store.get(datavar.id);

 request.onerror = function(event) {
  // nie występuje w bazie, dodać
   var requestUpdate = store.add({id : datavar.id, val : getdataVal(datavar.id)})
   requestUpdate.onerror = function(event) {
     // Do something with the error
	 console.log("error add",datavar.id)
   };
   requestUpdate.onsuccess = function(event) {
     // Success - the data is updated!
   };

 };

 request.onsuccess = function(event) {
  // Get the old value that we want to update
  var data = event.target.result;
  console.log("success get",datavar)
  // update the value(s) in the object that you want to change
  // Put this updated object back into the database.
  var requestUpdate = store.put({id : datavar.id , val : getdataVal(datavar.id)});

   requestUpdate.onsuccess = function(event) {
     // Success - the data is updated!
	 console.log("put success",{id : datavar.id , val : getdataVal(datavar.id)});//usuną
   };
  };
 });
}

const cookieValDiv = document.querySelector('.cookie-quantity'),
      cookieValDivSec = document.querySelector('.cookie-quantity-sec'),
      cookie = document.querySelector('.cookie-img'),
      cursorPanel = document.querySelector('.producers-cursor'),
      cursorPriceInfo = cursorPanel.querySelector('.producers-price'),
      cursorQuanity = cursorPanel.querySelector('.producers-quantity'),
      cursorVis = document.querySelector('.cursor'),
      grandmaPanel = document.querySelector('.producers-grandma'),
      grandmaPriceInfo = grandmaPanel.querySelector('.producers-price'),
      grandmaQuanity = grandmaPanel.querySelector('.producers-quantity'),
      grandmaVis = document.querySelector('.grandma'),
      farmPanel = document.querySelector('.producers-farm'),
      farmPriceInfo = farmPanel.querySelector('.producers-price'),
      farmQuanity = farmPanel.querySelector('.producers-quantity'),
      farmVis = document.querySelector('.farm'),
      minePanel = document.querySelector('.producers-mine'),
      minePriceInfo = minePanel.querySelector('.producers-price'),
      mineQuanity = minePanel.querySelector('.producers-quantity'),
      mineVis = document.querySelector('.mine'),
      factoryPanel = document.querySelector('.producers-factory'),
      factoryPriceInfo = factoryPanel.querySelector('.producers-price'),
      factoryQuanity = factoryPanel.querySelector('.producers-quantity'),
      factoryVis = document.querySelector('.factory');

  cookie.addEventListener('click', function(){
    cookieVal++;
  });

  function addProducer (counter, price, info, quanity, elem, classCss, imgSrc, vis){
    info.innerText = price;
    quanity.innerText = counter;
    elem = document.createElement('img');
    elem.className = classCss;
    elem.src = imgSrc;
    vis.appendChild(elem);
  }

  cursorPanel.addEventListener('click', function(e){
    if (cursorPrice <= currCookieVal){
        cursorCounter++;
        cookieVal -= cursorPrice;
        currCookieVal -= cursorPrice;
        cursorPrice = priceNew(cursorPrice, cursorCounter);
      addProducer (cursorCounter, cursorPrice, cursorPriceInfo, cursorQuanity, cursorExtra, 'cursor-image', 'img/cursor.png', cursorVis);
    }
  });

  grandmaPanel.addEventListener('click', function(){
    if (grandmaPrice <= currCookieVal){
      grandmaCounter++;
      cookieVal -= grandmaPrice;
      currCookieVal -= grandmaPrice;
      grandmaPrice = priceNew(grandmaPrice, grandmaCounter);
      addProducer (grandmaCounter, grandmaPrice, grandmaPriceInfo, grandmaQuanity, grandmaExtra, 'producers-img', 'img/grandmother.png', grandmaVis);
    }
  });

  farmPanel.addEventListener('click', function(){
    if (farmPrice <= currCookieVal) {
        farmCounter++;
        cookieVal -= farmPrice;
        currCookieVal -= farmPrice;
        farmPrice = priceNew(farmPrice, farmCounter);
        addProducer (farmCounter,farmPrice, farmPriceInfo, farmQuanity, farmExtra, 'producers-img', 'img/farm.png', farmVis);
    }
  });

  minePanel.addEventListener('click', function(){
    if (minePrice <= currCookieVal){
      mineCounter++;
      cookieVal -= minePrice;
      currCookieVal -= minePrice;
      minePrice = priceNew(minePrice, mineCounter);
      addProducer (mineCounter, minePrice, minePriceInfo, mineQuanity, mineExtra, 'producers-img', 'img/mine.png', mineVis);
    }

  });
  factoryPanel.addEventListener('click', function(){
    if (factoryPrice <= currCookieVal){
      factoryCounter++;
      cookieVal -= factoryPrice;
      currCookieVal -= factoryPrice;
      factoryPrice = priceNew(factoryPrice, factoryCounter);
      calcPriceAndQuanity();
      addProducer(factoryCounter, factoryPrice, factoryPriceInfo, factoryQuanity, factoryExtra, 'producers-img', 'img/factory.png', factoryVis);
    }
  });

function changeColor (price, elem){
    if (price <= currCookieVal){
    elem.style.color = '#63b521';
  }else{
    elem.style.color = '#ff0000';
  }
}

let countCookie = setInterval( function() {
  cursorProdVal = production(0.1, cursorCounter),
  grandmaProdVal = production(1, grandmaCounter),
  farmProdVal = production(8, farmCounter),
  mineProdVal = production(47, mineCounter),
  factoryProdVal = production(260, factoryCounter);

  cookieProdSec = cursorProdVal + grandmaProdVal + farmProdVal + mineProdVal + factoryProdVal;
  currCookieVal = Math.floor(cookieVal += cookieProdSec); //obecny stan ciasteczek
}, 1000);

setInterval(function(){
  currCookieVal = Math.floor(cookieVal);
  countCookie;
  cookieValDiv.innerText = currCookieVal + ' cookies';
  cookieValDivSec.innerText = 'per second: ' + cookieProdSec;

  changeColor (cursorPrice, cursorPriceInfo);
  changeColor (grandmaPrice, grandmaPriceInfo);
  changeColor (farmPrice, farmPriceInfo);
  changeColor (minePrice, minePriceInfo);
  changeColor (factoryPrice, factoryPriceInfo);

}, 1);

window.addEventListener("beforeunload", function (event) {
   saveVariables();
    var dialogText = 'end';
  event.returnValue = dialogText;
  return dialogText;
 });
});
