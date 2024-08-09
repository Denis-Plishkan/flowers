export default class Pagination{
    constructor(){
        this.letfBtn = document.querySelector('.pagination__arrow_left');
        this.rightBtn = document.querySelector('.pagination__arrow_right');
        this.pointContainer = document.querySelector('.pagination__points');
        this.current = 1

    }
    quantityPages(num){
        this.pages = num
        this.addPoints(this.pages);
        this.startLoadPage();
        this.buttons();
        this.clickPoint();
        this.currentPages(this.current);
        this.sendUrl(this.current);
    }
    startLoadPage(){
        const url = new URL(window.location.href);
        const page = url.searchParams.get('point');
        const maxPoint = this.getMaxPoint()
        if(page && page < this.pages){
            this.current = page
        }
        if(page >= maxPoint && page < this.pages){
            const hidePage = page - this.getMaxPoint()
            for(let i = 0; i < hidePage; i++){
                this.getAllPoint()[i].classList.add('pagination__point_hide')
            }
        }
    }
    getAllPoint(){
        return document.querySelectorAll('.pagination__point');
    }
    sendUrl(currentPages){
        const url = new URL(window.location.href);
        url.searchParams.set('point', currentPages);
        window.history.replaceState({}, '', url);
    }
    opacityArrow(currentPoint){
        this.arrowActive = 'pagination__arrow_active';
        if(this.pages == 1){
            this.letfBtn.classList.remove(this.arrowActive);
            this.rightBtn.classList.remove(this.arrowActive);
        }else if(currentPoint == 1){
            this.letfBtn.classList.remove(this.arrowActive);
            this.rightBtn.classList.add(this.arrowActive);
        }else if (currentPoint > (this.pages - 1)){
            this.letfBtn.classList.add(this.arrowActive);
            this.rightBtn.classList.remove(this.arrowActive);
        }else{
            this.letfBtn.classList.add(this.arrowActive);
            this.rightBtn.classList.add(this.arrowActive);
        }
    }
    getMaxPoint(){
        if(window.innerWidth > 768){
            return 7
        }else{
            return 5
        }
    }
    event(){
        this.customEvent = new CustomEvent('paginationEvent', {
            detail: {
              page: +this.current
            }
        });
        document.dispatchEvent(this.customEvent);

        window.scroll({
            top: 200,
        });
    }
    getPage(){
        return +this.current
    }
    currentPages(currentPoint = 1){
        this.current = currentPoint;
        const pointActive = 'pagination__point_active';
        this.getAllPoint().forEach(point => {
            point.classList.remove(pointActive)
        })
        this.getAllPoint()[currentPoint - 1].classList.add(pointActive)
        this.opacityArrow(currentPoint)
        this.hidePoint(currentPoint);
        this.sendUrl(currentPoint);

    }
    buttons(){
        this.letfBtn.addEventListener('click', () => {
            if(this.current > 1){
                this.current--;
                this.currentPages(this.current);
                this.event()
            }
        });
        this.rightBtn.addEventListener('click', () => {
            if(this.current < this.pages){
                this.current++;
                this.currentPages(this.current);
                this.event()
            }
        })
    }
    clickPoint(){
        this.getAllPoint().forEach((point, index) => {
            point.addEventListener('click', () => {
                if(!point.classList.contains('pagination__point_hide')){
                    this.current = index + 1;
                    this.currentPages(index + 1)
                    this.event()
                }
            })
        })
    }
    
    addPoints(pages){
        if(isNaN(pages)){
            pages = 1
        }else if(pages < 1){
            pages = 1
        }
        this.pointContainer.innerHTML = '';
        for(let i = 1; i <= pages; i++){
            this.pointContainer.innerHTML += `
                <li class="pagination__point ">${i}</li>
            `;
        }
    }
    hidePoint(current){
        const allPoint = this.getAllPoint();
        const maxPoint = this.getMaxPoint()
        if(current > (maxPoint - 1) && current < this.pages){
            allPoint[current - maxPoint].classList.add('pagination__point_hide');
        }
        if(current > 1){
            allPoint[current - 2].classList.remove('pagination__point_hide');
        }
    }
}
