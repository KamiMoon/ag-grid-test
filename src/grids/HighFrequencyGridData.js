import { Observable } from 'rxjs';

/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
const MIN_BOOK_COUNT = 10;
const MAX_BOOK_COUNT = 20;
const MIN_TRADE_COUNT = 1;
const MAX_TRADE_COUNT = 10;
const products = [
  'Palm Oil',
  'Rubber',
  'Wool',
  'Amber',
  'Copper',
  'Lead',
  'Zinc',
  'Tin',
  'Aluminium',
  'Aluminium Alloy',
  'Nickel',
  'Cobalt',
  'Molybdenum',
  'Recycled Steel',
  'Corn',
  'Oats',
  'Rough Rice',
  'Soybeans',
  'Rapeseed',
  'Soybean Meal',
  'Soybean Oil',
  'Wheat',
  'Milk',
  'Coca',
  'Coffee C',
  'Cotton No.2',
  'Sugar No.11',
  'Sugar No.14',
];
const portfolios = ['Aggressive', 'Defensive', 'Income', 'Speculative', 'Hybrid'];
let nextBookId = 62472;
let nextTradeId = 24287;
const UPDATE_COUNT = 200;

let globalRowData;

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createBookName() {
  nextBookId++;
  return `GL-${nextBookId}`;
}
function createTradeId() {
  nextTradeId++;
  return nextTradeId;
}
function createTradeRecord(product, portfolio, book) {
  const current = Math.floor(Math.random() * 100000) + 100;
  const previous = current + Math.floor(Math.random() * 10000) - 2000;
  const trade = {
    product,
    portfolio,
    book,
    trade: createTradeId(),
    submitterID: randomBetween(10, 1000),
    submitterDealID: randomBetween(10, 1000),
    dealType: Math.random() < 0.2 ? 'Physical' : 'Financial',
    bidFlag: Math.random() < 0.5 ? 'Buy' : 'Sell',
    current,
    previous,
    pl1: randomBetween(100, 1000),
    pl2: randomBetween(100, 1000),
    gainDx: randomBetween(100, 1000),
    sxPx: randomBetween(100, 1000),
    _99Out: randomBetween(100, 1000),
  };
  return trade;
}

function copyObject(object) {
  const newObject = {};
  Object.keys(object).forEach((key) => {
    newObject[key] = object[key];
  });
  return newObject;
}

export function createRowData() {
  globalRowData = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    for (let j = 0; j < portfolios.length; j++) {
      const portfolio = portfolios[j];
      const bookCount = randomBetween(MAX_BOOK_COUNT, MIN_BOOK_COUNT);
      for (let k = 0; k < bookCount; k++) {
        const book = createBookName();
        const tradeCount = randomBetween(MAX_TRADE_COUNT, MIN_TRADE_COUNT);
        for (let l = 0; l < tradeCount; l++) {
          const trade = createTradeRecord(product, portfolio, book);
          globalRowData.push(trade);
        }
      }
    }
  }
}

function getNewItem() {
  const index = Math.floor(Math.random() * globalRowData.length);
  const itemToUpdate = globalRowData[index];
  const newItem = copyObject(itemToUpdate);
  newItem.previous = newItem.current;
  newItem.current = Math.floor(Math.random() * 100000) + 100;
  return newItem;
}

export function getGlobalRowData() {
  return globalRowData;
}

const UPDATE_INTERVAL = 1000;

function runUpdates(subscriber) {
  for (let i = 0; i < UPDATE_COUNT; i++) {
    setTimeout(() => {
      const newItem = getNewItem();
      subscriber.next(newItem);
    }, 0);
  }
}

export function getDataSubscription() {
  const observable = new Observable(function subscribe(subscriber) {
    const intervalId = setInterval(() => {
      runUpdates(subscriber);
    }, UPDATE_INTERVAL);

    return function unsubscribe() {
      clearInterval(intervalId);
    };
  });

  return observable;
}
