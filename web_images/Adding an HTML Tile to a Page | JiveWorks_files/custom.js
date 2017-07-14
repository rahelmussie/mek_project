/**
 * Created by dbogomolov on 6/10/2015.
 */


function displayProfileDetails(){
  if ($j('body').hasClass('j-body-profile')){

    var lis = $j('.jive-modal-content.profile-data .profile-tile.j-extended-profile ul li');
    var unneeded = ["Biography","Last Logged In","Industry","Job Function","Location"];


    lis.each(function(ind,el){
      var spanHtml = $j(el).find('span').html();
      if( unneeded.indexOf(spanHtml) !== -1){
        el.remove();
      }
    })
    lis.show();
  }
}

function fixJiveCustomLinks(){
    $j('#j-globalNav .j-globalNavLink.j-ui-elem .nav-link').each( function(i,el){
        var text = $j(el).text();
        $j(el).text(text.replace(/&amp;/g, '&'));
    });
    $j('#customLink0 .nav-link').text('Product & Support')
    $j('#customLink4 .nav-link').text('Developers & Partners')
}
function addCustomNewsLink(){
    if(!$j('#customLink-news').length){
        $j('#j-globalNav').prepend('<li id="customLink-news" class="j-globalNav-li j-custom-link j-ui-elem">'+
            '<a href="/news" class="j-globalNavLink j-ui-elem " role="menuitem">'+
            '<span class="nav-link  ">News</span>'+
            '</a>'+
            '</li>')
    }
}

function overrideNavAvatarSize(){
    if(_jive_current_user.ID !== -1){
        var avatar = $j('#j-satNav .jive-avatar');
        var currentSrc = avatar.attr('src');
        if(!!avatar.length){
            avatar.attr('src', currentSrc.replace(/24.png/, '35.png'));
        }
    }
}

function toggleTrials(mode) {
    if (!!mode && mode === 'hide'){
        $j('.trials-menu').removeClass('visible');
        $j('body').removeClass('expanded');
    }else{
        $j('.trials-menu').toggleClass('visible');
        $j('body').toggleClass('expanded');
    }
}

function makeBoldGreeting (){
    var mobileGreetingDom = $j('body.j-body-welcome .j-home-welcome-message p')
    var mobileGreetingText = mobileGreetingDom.text().replace(/JiveWorks/g, '<b>JiveWorks</b>')
    mobileGreetingDom.html(mobileGreetingText);
}


$j(function(){

    displayProfileDetails();
    addCustomNewsLink();
    overrideNavAvatarSize();
    fixJiveCustomLinks();

//    make Dev in new widow links  - non TRACK part
    $j.grep($j('li a'), function (n,i) {
        if ( $j(n).html() == "Jive Documentation" )
        {$j(n).attr('target','_blank')}
    });

    //adjust
    $j(window).on('resize', function(){
    })

    window.onscroll = function(){

        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0


        if( scrollTop){
            toggleTrials('hide');
        }

        if( scrollTop && !/fixed-bar/.test(document.body.className)){
            document.body.className += ' fixed-bar';
        }else if(! scrollTop && /fixed-bar/.test(document.body.className)){
            document.body.className = document.body.className.replace(/ fixed-bar/g,'');
        }
    }


    //toggle menus on the global nav
    $j('.try-jive-link').on('click touch', toggleTrials);

    setTimeout(makeBoldGreeting,100);
    setTimeout(makeBoldGreeting,200);
    setTimeout(makeBoldGreeting,500);
    setTimeout(makeBoldGreeting,1000);
    setTimeout(makeBoldGreeting,2000);

})
