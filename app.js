let cookieVal = 0,
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
  priceNew = (price, counter) => Math.floor(price + counter * 0.1 * price), //funkcja do obliczania nowej ceny
  production = (prodVal, counter) => prodVal * counter, //oblicznie produkcji jednego producenta w 1 sec
  cookieProdSec = 0;
  currCookieVal = 0;

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
  farmVis = document.querySelector('.farm')
  minePanel = document.querySelector('.producers-mine'),
  minePriceInfo = minePanel.querySelector('.producers-price'),
  mineQuanity = minePanel.querySelector('.producers-quantity'),
  mineVis = document.querySelector('.mine')
  factoryPanel = document.querySelector('.producers-factory'),
  factoryPriceInfo = factoryPanel.querySelector('.producers-price'),
  factoryQuanity = factoryPanel.querySelector('.producers-quantity'),
  factoryVis = document.querySelector('.factory');

  cookie.addEventListener('click', function(){
    cookieVal++;
  });

  cursorPanel.addEventListener('click', function(){
    if (cursorPrice <= currCookieVal){
      cursorCounter++;
      cookieVal -= cursorPrice;
      currCookieVal -= cursorPrice;
      cursorPrice = priceNew(cursorPrice, cursorCounter);
      cursorPriceInfo.innerText = cursorPrice;
      cursorQuanity.innerText = cursorCounter;
      const cursorExtra = document.createElement('div');
      cursorExtra.className = 'cursor-image';
      cursorVis.appendChild(cursorExtra);

    }
  });

  grandmaPanel.addEventListener('click', function(){
    if (grandmaPrice <= currCookieVal){
      grandmaCounter++;
      cookieVal -= grandmaPrice;
      currCookieVal -= grandmaPrice;
      grandmaPrice = priceNew(grandmaPrice, grandmaCounter);
      grandmaPriceInfo.innerText = grandmaPrice;
      grandmaQuanity.innerText = grandmaCounter;
      const grandmaExtra = document.createElement('div');
      grandmaExtra.className = 'grandma-image';
      grandmaVis.appendChild(grandmaExtra);
    }
  });

  farmPanel.addEventListener('click', function(){
    if (farmPrice <= currCookieVal){
      farmCounter++;
      cookieVal -= farmPrice;
      currCookieVal -= farmPrice;
      farmPrice = priceNew(farmPrice, farmCounter);
      farmPriceInfo.innerText = farmPrice;
      farmQuanity.innerText = farmCounter;
      const farmExtra = document.createElement('div');
      farmExtra.className = 'farm-image';
      farmVis.appendChild(farmExtra);
    }
  });

  minePanel.addEventListener('click', function(){
    if (minePrice <= currCookieVal){
      mineCounter++;
      cookieVal -= minePrice;
      currCookieVal -= minePrice;
      minePrice = priceNew(minePrice, mineCounter);
      minePriceInfo.innerText = minePrice;
      mineQuanity.innerText = mineCounter;
      const mineExtra = document.createElement('div');
      mineExtra.className = 'mine-image';
      mineVis.appendChild(mineExtra);
    }
  });
  factoryPanel.addEventListener('click', function(){
    if (factoryPrice <= currCookieVal){
      factoryCounter++;
      cookieVal -= factoryPrice;
      currCookieVal -= factoryPrice;
      factoryPrice = priceNew(factoryPrice, factoryCounter);
      factoryPriceInfo.innerText = factoryPrice;
      factoryQuanity.innerText = factoryCounter;
      const factoryExtra = document.createElement('div');
      factoryExtra.className = 'factory-image';
      factoryVis.appendChild(factoryExtra);
    }
  });

setInterval(function() {
  let cursorProdVal = production(0.1, cursorCounter),
  grandmaProdVal = production(1, grandmaCounter),
  farmProdVal = production(8, farmCounter),
  mineProdVal = production(47, mineCounter),
  factoryProdVal = production(260, factoryCounter);
  cookieProdSec = cursorProdVal + grandmaProdVal + farmProdVal + mineProdVal + factoryProdVal;//(zaokrąglić)oblicznie produkcji na sec
  currCookieVal = Math.floor(cookieVal += cookieProdSec); //obecny stan ciasteczek
  cookieValDiv.innerText = currCookieVal + ' cookies';
  cookieValDivSec.innerText = 'per second: ' + cookieProdSec;

  if (cursorPrice <= currCookieVal){
    cursorPriceInfo.style.color = '#63b521';
  }else{
    cursorPriceInfo.style.color = '#ff0000';
  }
  if (grandmaPrice <= currCookieVal){
    grandmaPriceInfo.style.color = '#63b521';
  }else{
    grandmaPriceInfo.style.color = '#ff0000';
  }
  if (farmPrice <= currCookieVal){
    farmPriceInfo.style.color = '#63b521';
  }else{
    farmPriceInfo.style.color = '#ff0000';
  }
  if (minePrice <= currCookieVal){
    minePriceInfo.style.color = '#63b521';
  }else{
    minePriceInfo.style.color = '#ff0000';
  }
  if (factoryPrice <= currCookieVal){
    factoryPriceInfo.style.color = '#63b521';
  }else{
    factoryPriceInfo.style.color = '#ff0000';
  }
}, 1000);
