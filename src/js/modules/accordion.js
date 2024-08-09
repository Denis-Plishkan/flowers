class Accordion{
    constructor(){
        this.tabs = document.querySelectorAll('.accordion');
        this.addActive();
    }
    addActive(){
        this.tabs.forEach(tab => {
            tab.addEventListener('click', event => {
                if(event.target.classList.contains('accordion__title')){
                    tab.classList.toggle("accordion_active")
                    this.removeActive(event)
                }
            })
        })
    }
    removeActive(event){
        this.tabs.forEach(tab => {
            if(!tab.contains(event.target)){
                tab.classList.remove("accordion_active")
            }
        })
    }
}

const accordion = new Accordion();
