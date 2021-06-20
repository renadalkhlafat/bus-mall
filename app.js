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
function productName(name, path) {
    this.prodName = name;
    this.clicks = 0;
    this.views = 0;
    this.imgSrc = `./img/${path}`;
    productName.allProducts.push(this)
}
//------------------------create objects-------------------------
for (let j = 0; j < imgArray.length; j++) {
    let img = imgArray[j].split('.')[0];
    new productName(img, imgArray[j]);
    // console.log(img);
}
// console.log(productName.allProducts)
//-------------------image render function------------------------
function imgRenader() {
    let imgIndex1 = randomNumber(0, imgArray.length - 1);
    productName.allProducts[imgIndex1].views++;
    let imgIndex2 = randomNumber(0, imgArray.length - 1);

    while (imgIndex1 == imgIndex2) {
        imgIndex2 = randomNumber(0, imgArray.length - 1);
    }
    productName.allProducts[imgIndex2].views++;
    let imgIndex3 = randomNumber(0, imgArray.length - 1);
    while (imgIndex3 == imgIndex1 || imgIndex3 == imgIndex2) {
        imgIndex3 = randomNumber(0, imgArray.length - 1);
    }
    productName.allProducts[imgIndex3].views++;

    // firstImage.src = productName.allProducts[imgIndex1].imgSrc;
    // secondImage.src = productName.allProducts[imgIndex2].imgSrc;
    // thirdImage.src = productName.allProducts[imgIndex3].imgSrc;

    firstImage.setAttribute('src', productName.allProducts[imgIndex1].imgSrc);
    secondImage.setAttribute('src', productName.allProducts[imgIndex2].imgSrc);
    thirdImage.setAttribute('src', productName.allProducts[imgIndex3].imgSrc);

    // console.log(productName.allProducts[imgIndex2].imgSrc)

    firstImageIndex = imgIndex1;
    secondImageIndex = imgIndex2;
    thirdImageIndex = imgIndex3;
}
//----------------call image render function------------------
imgRenader();
//-----------------click handler function-----------------------
function clickHandler(event) {
    if ((event.target.id == 'firstImg' || event.target.id == 'secondImg' || event.target.id == 'thirdImag') && clickes < voteNumber) {
        if (event.target.id == 'firstImg') {
            productName.allProducts[firstImageIndex].clicks++;
            imgRenader();
            clickes++;
        }
        if (event.target.id == 'secondImg') {
            productName.allProducts[secondImageIndex].clicks++;
            imgRenader();
            clickes++;

        }
        if (event.target.id == 'thirdImag') {
            productName.allProducts[thirdImageIndex].clicks++;
            imgRenader();
            clickes++;
        }
    }

}
//--------------------button handler----------------------------
function resultHandler(event) {
    event.preventDefault();
    for (let index = 0; index < productName.allProducts.length; index++) {
        let listItem = document.createElement('li');
        listItem.textContent = `${productName.allProducts[index].prodName} had  ${productName.allProducts[index].clicks}   votes ,and was seen  ${productName.allProducts[index].views}  times .`;
        ulList.appendChild(listItem);
    }
    buttonResult.removeEventListener('click', resultHandler)
}
//----------------------------------------
allImages.addEventListener('click', clickHandler);
buttonResult.addEventListener('click', resultHandler)

