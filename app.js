'use strict'
//-------------------------public variables---------------------
let allImages = document.getElementById('img');
let firstImage = document.getElementById('firstImg');
let secondImage = document.getElementById('secondImg');
let thirdImage = document.getElementById('thirdImag');
let buttonResult = document.getElementById('Results');
let results = document.getElementById('result-section');
let ulList = document.createElement('ul');
results.appendChild(ulList);

let imgArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg',
  'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png',
  'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

let firstImageIndex = 0;
let secondImageIndex = 0;
let thirdImageIndex = 0;

let clickes = 0;
let voteNumber = 25;
productName.allProducts = [];

//----------------------random number function------------------
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
//----------------------productName constructor----------------
function productName(name, path, clk, vi) {
  this.prodName = name;
  this.clickNumber = clk;
  this.views = vi;
  this.imgSrc = `./img/${path}`;
  productName.allProducts.push(this)

  // updateArray();
}
//------------------------create objects-------------------------



// function updateArray(){
// let d=JSON.stringify(productName.allProducts);
//   localStorage.setItem('product',d)
//   console.log(d);
// }

// console.log(productName.allProducts)
//-------------------image render function------------------------
function imgRenader() {
  let imgIndex1 = randomNumber(0, imgArray.length - 1);
  if (imgIndex1 == firstImageIndex) {
    imgIndex1 = randomNumber(0, imgArray.length - 1);
  }
  productName.allProducts[imgIndex1].views++;

  let imgIndex2 = randomNumber(0, imgArray.length - 1);
  if (imgIndex2 == secondImageIndex || imgIndex2 == firstImageIndex) {
    imgIndex1 = randomNumber(0, imgArray.length - 1);
  }
  while (imgIndex1 == imgIndex2) {

    imgIndex1 = randomNumber(0, imgArray.length - 1);
  }
  productName.allProducts[imgIndex2].views++;

  let imgIndex3 = randomNumber(0, imgArray.length - 1);
  if (imgIndex3 == thirdImageIndex || imgIndex3 == secondImageIndex || imgIndex3 == firstImageIndex) {
    imgIndex3 = randomNumber(0, imgArray.length - 1);
  }
  while (imgIndex3 == imgIndex1 || imgIndex3 == imgIndex2) {
    imgIndex3 = randomNumber(0, imgArray.length - 1);
  }
  productName.allProducts[imgIndex3].views++;

  firstImage.setAttribute('src', productName.allProducts[imgIndex1].imgSrc);
  secondImage.setAttribute('src', productName.allProducts[imgIndex2].imgSrc);
  thirdImage.setAttribute('src', productName.allProducts[imgIndex3].imgSrc);

  firstImageIndex = imgIndex1;
  secondImageIndex = imgIndex2;
  thirdImageIndex = imgIndex3;
}
//----------------call image render function------------------

//-----------------click handler function-----------------------
function clickHandler(event) {
  if ((event.target.id == 'firstImg' || event.target.id == 'secondImg' || event.target.id == 'thirdImag') && clickes < voteNumber) {
    if (event.target.id == 'firstImg') {
      productName.allProducts[firstImageIndex].clickNumber++;
      imgRenader();
      clickes++;
    }
    if (event.target.id == 'secondImg') {
      productName.allProducts[secondImageIndex].clickNumber++;
      imgRenader();
      clickes++;

    }
    if (event.target.id == 'thirdImag') {
      productName.allProducts[thirdImageIndex].clickNumber++;
      imgRenader();
      clickes++;
    }
  } else if (clickes == voteNumber) {
    allImages.removeEventListener('click', clickHandler);
    chartRender();
  }

}
//--------------------button handler----------------------------
function resultHandler(event) {
  event.preventDefault();
  for (let index = 0; index < productName.allProducts.length; index++) {
    let listItem = document.createElement('li');
    listItem.textContent = `${productName.allProducts[index].prodName} had  ${productName.allProducts[index].clickNumber}   votes ,and was seen  ${productName.allProducts[index].views}  times .`;
    ulList.appendChild(listItem);

  }
  buttonResult.removeEventListener('click', resultHandler)
  localStorage.setItem('products', JSON.stringify(productName.allProducts));
}
//----------------------------------------
allImages.addEventListener('click', clickHandler);

buttonResult.addEventListener('click', resultHandler)


//---------------------create chart render --------------------------
function chartRender() {
  let clickTimes = [];
  let names = [];
  let viewTime = [];

  for (let i = 0; i < productName.allProducts.length; i++) {
    clickTimes.push(productName.allProducts[i].clickNumber);
    names.push(productName.allProducts[i].prodName);
    viewTime.push(productName.allProducts[i].views);
  }

  let ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [
        {
          label: '# of Votes',
          data: clickTimes,
          backgroundColor: '#EBA83A',
          borderColor: '#BB371A',
          borderWidth: 3
        },
        {
          label: '# of views',
          data: viewTime,
          backgroundColor: '#BB371A',
          borderColor: '#EBA83A',
          borderWidth: 3
        }
      ]

    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//--------------------------get data function ------------------------------------
function getProduct() {
  let products = JSON.parse(localStorage.getItem('products'));
  
  if (products) {
    for (let i = 0; i < products.length; i++) {
     
      new productName(products[i].prodName, ((products[i].imgSrc).replace( './img/' ,'' )), products[i].clickNumber, products[i].views);
    
    }
    imgRenader();}else {
      for (let j = 0; j < imgArray.length; j++) {
        let img = imgArray[j].split('.')[0];
       new productName(img, imgArray[j],0,0);}
       imgRenader();
      
    }
  
}


getProduct();

