function fixSatNavPopup(){

    var satNavFix = $j('#satNav-fix');
    if(satNavFix.length){
        satNavFix.remove();
    }

    $j('head').append(
        $j('<style id="satNav-fix">' +
                '.j-nav-user .j-pop{ max-height: '+window.innerHeight*0.75+'px; }  ' +
                '.j-nav-user .j-pop #j-satNav-menu div{ max-height: '+window.innerHeight*0.75+'px; overflow-y: auto; background-color: #ffffff; }' +
            '</style>')
    )
}

$j(function(){
    fixSatNavPopup()

    window.onresize = fixSatNavPopup
})

