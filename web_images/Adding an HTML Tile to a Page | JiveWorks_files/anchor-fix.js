$j(function() {
    $j('a[href*=#]:not([href=#])').click(function() {
        if(/^#[a-zA-Z0-9_]*$/.test($j(this).attr('href'))){  //making sure it starts with #word, #_ or #0-9
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
                && location.hostname == this.hostname) {

                var target = $j(this.hash);
                target = target.length ? target : $j('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $j('html,body').animate({
                        scrollTop: target.offset().top - 125 //offsets for fixed header
                    }, 1000);
                }
            }
        }
    });
    //Executed on page load with URL containing an anchor tag.
    try {
        if(location.href.indexOf("#/") == -1 && location.href.split("#")[1]) {
            var target = $j('#'+location.href.split("#")[1]);
            if (target.length) {
                $j('html,body').animate({
                    scrollTop: target.offset().top - 125 //offset height of header here too.
                }, 1000);
            }
        }
    } catch(e) {
        if(window.location.hash){
            console.info('no anchor for current location.hash')
        }
    }
})