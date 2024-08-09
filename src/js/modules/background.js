function leftImages() {
    const imageWrapper = document.querySelector('.background__left');
    const allImage = document.querySelectorAll('.background__left-img')
    const pageHeight = Math.max( document.documentElement.scrollHeight, document.body.scrollHeight);
    const quantityImages = Math.floor((pageHeight - 800) / 780)
    const addImage = quantityImages - allImage.length;

    if(addImage > 0 ){
        for(let i = 0; i < addImage; i++){
            imageWrapper.innerHTML += `
                <img class="background__left-img" loading="lazy" src="./images/bg/left-flowers.png" alt="bg-img">
            `;
        }
    }
    allImage.forEach((img, index) => {
        if((index + 1 )> quantityImages){
            img.style.display = 'none'
        }else{
            img.style.display = 'block'
        }
    });
}

function rightImages() {
    const imageWrapper = document.querySelector('.background__right');
    const allImage = document.querySelectorAll('.background__right-img')
    const pageHeight = Math.max( document.documentElement.scrollHeight, document.body.scrollHeight);
    const quantityImages = Math.floor((pageHeight - 1200) / 780)
    const addImage = quantityImages - allImage.length

    if(addImage > 0 ){
        for(let i = 0; i < addImage; i++){
            imageWrapper.innerHTML += `
                <img class="background__right-img" loading="lazy" src="./images/bg/right-flowers.png" alt="bg-img">
            `;
        }
    }
    allImage.forEach((img, index) => {
        if((index + 1 )> quantityImages){
            img.style.display = 'none'
        }else{
            img.style.display = 'block'
        }
    });
};

const observer = new MutationObserver(() => {
    leftImages();
    rightImages();
});
const config = {
    attributes: true,
    childList: true,
    subtree: true,
};
  
observer.observe(document.body, config);
  