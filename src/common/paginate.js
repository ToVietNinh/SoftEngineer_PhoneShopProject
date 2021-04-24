module.exports = (page, totalPage, delta=2) => {
    
    const pages = [];
    const pagesWithDot = [];
    const left = page - delta;
    const right = page + delta;
    for(let i=1; i<=totalPage; i++){
        if(i===1 || i===totalPage || i===page || (i>=left && i<=right)){
            pages.push(i);
        }
        else if(i===left-1 || i===right+1){
            pages.push("...");
        }
    }
    
    /*let i = 0;
    while(i < pages.length) {
        pagesWithDot.push(pages[i]);
        
        /*if(pages[i+1] - pages[i] >= delta){
            pagesWithDot.push("...");
        }
        ++i;
    }*/
    return pages;
}