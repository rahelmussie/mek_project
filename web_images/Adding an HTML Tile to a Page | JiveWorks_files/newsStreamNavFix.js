$j(function(){
    if(window.location.pathname == '/news'){
        $j('#j-home-side-nav li').on('click', () => {
            setTimeout( () => {
                $j("html, body").animate({ scrollTop: 0 }, 150);
            }, 250)
        })
    }
})