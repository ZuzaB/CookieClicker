let cookieVal = 0,
  cursorCounter = 0,
  grandmaCounter = 0,
  farmCounter = 0,
  mineCounter = 0,
  factoryCounter = 0,
  cursorPrice = 15,
  priceNew = (price, counter) => Math.floor(price + counter * 0.1 * price), //funkcja do obliczania nowej ceny
  production = (prodVal, counter) => prodVal * counter, //oblicznie produkcji jednego producenta w 1 sec
  cookieProdSec = 0;
  currCookieVal = 0;
const cookieValDiv = document.querySelector('.cookie-quantity'),
  cookieValDivSec = document.querySelector('.cookie-quantity-sec'),
  cookie = document.querySelector('.cookie-img'),
  cursorPanel = document.querySelector('.producers'),
  cursorPriceInfo = cursorPanel.querySelector('.producers-price'),
  cursorQuanity = cursorPanel.querySelector('.producers-quantity'),
  cursorVis = document.querySelector('.cursor');

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
      const cursorExtra = document.createElement("div");
      cursorVis.appendChild(cursorExtra);
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
}, 1000);//krótszy czas?
