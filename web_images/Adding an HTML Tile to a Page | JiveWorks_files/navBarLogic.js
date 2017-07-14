/**
 * Created by dbogomolov on 11/3/2016.
 */
var cookieName = '_jc_nav_bar_role';

/*customers
 *
 *Ideas & Product Feedback  - #customLink0-3
 */


/*partner
 *
 *Partner Hub  -  #customLink4-2
 */

/*customers & employees
 *
 *
 *Getting Started - #customLink1-0
 Customer only announcements - #customLink3-0
 Advocates program - #customLink3-1
 Hosted & On-Prem Center - #customLink3-3
 Cloud Release Center - #customLink3-2
 */




function buildPartnerItems(){
    $j('#customLink4-2').attr('href','/community/partners/home');
}
function buildEmployeeItems() {
    $j('#customLink1-0').attr('href','/community/about-the-jive-community/blog/2016/10/28/about-the-jive-community');
    $j('#customLink1-4').attr('href','/community/customers/resource-center');
    $j('#customLink3-0').attr('href','/community/customers/pages/overview');
    $j('#customLink3-1').attr('href','/community/customers/pages/jive-advocates');
    $j('#customLink3-3').attr('href','/community/customers/pages/hosted-on-prem-releases');
    $j('#customLink3-2').attr('href','/community/customers/pages/cloud-releases');
    $j('#customLink0-4').attr('href','/support.jspa');
}
function buildCustomerItems() {
    $j('#customLink0-3').attr('href','/community/products/ideas-for-jive');
    $j('#customLink1-0').attr('href','/community/about-the-jive-community/blog/2016/10/28/about-the-jive-community');
    $j('#customLink1-4').attr('href','/community/customers/resource-center');
    $j('#customLink3-0').attr('href','/community/customers/pages/overview');
    $j('#customLink3-1').attr('href','/community/customers/pages/jive-advocates');
    $j('#customLink3-3').attr('href','/community/customers/pages/hosted-on-prem-releases');
    $j('#customLink3-2').attr('href','/community/customers/pages/cloud-releases');
    $j('#customLink0-4').attr('href','/support.jspa');
}


function getRole(){

    if ((window._jc_custom.employeesPlaceTag && window._jc_custom.customersPlaceTag && window._jc_custom.partnersPlaceTag) &&
         (window._jc_custom.employeesPlaceTag !== 'null' && window._jc_custom.customersPlaceTag !== 'null' && window._jc_custom.partnersPlaceTag !== 'null')) 
    {
        var currentCookie = getCookie(cookieName)

        if (document.cookie.indexOf(cookieName) !== -1) {
            
            if(currentCookie.indexOf('employee') !== -1) {
                buildEmployeeItems();
             }

            if(currentCookie.indexOf('customer') !== -1) {
                buildCustomerItems();
            }

            if(currentCookie.indexOf('partner') !== -1) {
                buildPartnerItems();
            }

        }else{
            setJiveRole(window._jc_custom.employeesPlaceTag, 'employee').then( function(val){
                setJiveRole(window._jc_custom.customersPlaceTag, 'customer').then( function(cval){
                    setJiveRole(window._jc_custom.partnersPlaceTag, 'partner').then( function(pval){
                        if((val+cval+pval) !== "") {
                            getRole();
                        }
                    });
                });
            });

        }
    }else{
        // console.log('Navigation is not configured with the correct system properties.');
    }
}


function setJiveRole(tag,value){
    return $j.Deferred(function(defer) {
        if(!!window._jc_custom.employeesPlaceTag){
            $j.ajax({
                type: 'GET',
                dataType: 'text',
                url: "/api/core/v3/search/places?filter=search("+tag+"*)&filter=type(space)",
            }).done(function( data ) {
                var list = JSON.parse(data.replace('throw \'allowIllegalResourceCall is false.\';','')).list
                if (!!list.length){
                    var prevVal = getCookie(cookieName);
                    var newVal = !!prevVal ? prevVal+','+value : value
                    setCookie(cookieName,  newVal);
                    defer.resolve(newVal);
                }else{
                    defer.resolve('');
                }

            });
        }else{
            defer.resolve('');
        }
    }).promise();
}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exHours) {
    var d = new Date();
    d.setTime(d.getTime() + (exHours*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


$j(function(){
    var user = window.parent._jive_current_user;
    var userID = user.ID;
    if (userID !== "-1") {
      getRole();
    }
})
