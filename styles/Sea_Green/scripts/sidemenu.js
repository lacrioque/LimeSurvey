
/**
 * Make the sidemenu scalable at will
 */
var SideMenuMovement = function(
    sidemenuSelector,           // standard: #sideMenuContainer'               
    sideBodySelector,           // standard: .side-body'
    dragButtonSelector,         // standard: #scaleSidebar' 
    collapseButtonSelector,     // standard: #chevronClose' 
    uncollapsedHomeSelector,    // standard: #sidemenu-home' 
    quickMenuSelector,          // standard: #quick-menu-container' 
    options){                   

    //define options, or standardized values
    options = options || {};
    options.fixedTopMargin = options.fixedTopMargin || $('#questiongroupbarid').height()+2;
    options.baseWidth = options.baseWidth || 320;
    options.collapsedWidth = options.collapsedWidth || 55;

    var 
        isRTL       = ($('html').attr('dir') == 'rtl'),
    //define DOM Variables
        oSideMenu           = $(sidemenuSelector),
        oSideBody           = $(sideBodySelector),
        oDragButton         = $(dragButtonSelector),
        oCollapseButton     = $(collapseButtonSelector),
        oUnCollapsedHome    = $(uncollapsedHomeSelector),
        oQuickMenu          = $(quickMenuSelector),
    
    //define calculateble values
        wWidth      = $('body').width(),
        wHeight     = $('html').height(),
        dHeight     = oSideBody.parent().height(),
    
    //define runtimevariables
        offsetX     = 0,
        offsetY     = 0,
        position    = 0,
    
    //define rtl-specific classes
        chevronClosed = (isRTL ? 'fa-chevron-left' : 'fa-chevron-right'),
        chevronOpened = (isRTL ? 'fa-chevron-right' : 'fa-chevron-left'),

//////define methods
    //setter methods to set the items
        /**
         * Sets the body margin, fitted to the isRTL value.
         * @param int newValue New margin of the body
         * @param boolean|undefined animate Animate the easing of the body
         * @return Promise Fulfilled on finishing the animation, or at once if there is no animation 
         */
        setBody = function(newValue, animate){
            animate = animate || false;
            var marginObj = isRTL ? {'margin-right': (newValue+10)+"px"} : {'margin-left': (newValue+10)+"px"};
            //We use Promises here to have the animation not flawed by unscaling buttons and lists.
            return new Promise(function(resolve, reject){    
                if(animate) {
                    oSideBody.animate(marginObj,600,'swing', function(){resolve(true)});
                } else {
                    oSideBody.css(marginObj);
                    resolve(true);
                }
            });
        },
        /**
         * Sets the menu-width
         * @param int newValue New width of the sidemenu
         * @param boolean|undefined animate Animate the easing of the body
         * @return Promise Fulfilled on finishing the animation, or at once if there is no animation 
         */
        setMenu = function(newValue, animate){
            animate = animate || false;
            //We use Promises here to have the animation not flawed by unscaling buttons and lists.
            return new Promise(function(resolve, reject){    
                if(animate) {
                    oSideMenu.animate({'width': newValue+"px"},600,'swing', function(){resolve(true)});
                } else {
                    oSideMenu.css({'width': newValue+"px"});
                    resolve(true);
                }
            });
        },
        /**
         * Method to collapse the sidebar
         * The method handles the Promise of the setDivision-method and reacts to it.
         * Either by making the quick-menu visible and switching the buttons, or toggeling the width.
         * Fitted to work with RTL-languages
         * @param boolean force force collapsing the sidemenu 
         * @return void
         */
        collapseSidebar = function(force){
            force = force || false;
            // console.log("collapsing",oCollapseButton.data('collapsed'));
            var collapsedWidth = isRTL ? wWidth-options.collapsedWidth : options.collapsedWidth;
            if(oCollapseButton.data('collapsed') != 1 || force){ 
                oSideMenu.addClass('collapsed');
                setDivisionOn(collapsedWidth,false,true).then(function(){
                    oQuickMenu.css('display','');
                    oCollapseButton.find('i').removeClass(chevronOpened).addClass(chevronClosed);
                    oCollapseButton.data('collapsed', 1);
                });
            }
        },
        /**
         * Method to uncollapse the sidebar.
         * The method handles a Promise of the setDivision-method to hide the quick-menu and make the tree visible.
         * Also it fits back to the preset width of the sidemenu.
         * @param int position The position it should uncollapse to
         * @animate boolean Animate the uncollapsing
         */
        unCollapseSidebar = function(position, animate){
            animate = animate || false;
            console.log('animate',animate);
            // console.log(oCollapseButton.data('collapsed'));
            if(oCollapseButton.data('collapsed') != 0){
                oQuickMenu.css('display','none');
                setDivisionOn(position,true,true).then(function(){
                    oSideMenu.removeClass('collapsed');
                    oCollapseButton.find('i').removeClass(chevronClosed).addClass(chevronOpened);
                    oCollapseButton.data('collapsed', 0);
                })
            } else {
                setDivisionOn(position,true);
            }
        },

    //definer and mutators
        //Define the offset of the button handle to fit with the correct dragging
        defineOffset = function(oX,oY){
            offsetX = oX;
            offsetY = oY;
        },
        /**
         * Gets the saved offset and does some error handling
         * @return int startOffset 
         */
        getSavedOffset = function(){
            var savedOffset = null;
            try{
                var savedOffset = parseInt(localStorage.getItem('ls_admin_view_sidemenu'));
            } catch(e){}

            var startOffset = (isNaN(savedOffset) || !savedOffset) ? options.baseWidth : savedOffset;

            // console.log('startOffset', startOffset)
            startOffset = isRTL ? wWidth-startOffset : startOffset;

            return startOffset;
        },

    //utility and calculating methods
        /**
         * Calculates the values needed for setting the division correctly
         * Taking into account RTL-languages
         * @param float xClient The position of the mousepointer relative to the page
         * @return Object Returns Object with 
         *              sidebar -> new width of sidebar, 
         *              body    -> new margin for the side-body 
         *              button  -> left top position of the button 
         */
        calculateValue = function(xClient){
            if(isRTL){
                xClient = (wWidth-xClient);
                var sidebarWidth = xClient+(xClient>options.collapsedWidth ? (50-offsetX) : 5),
                    sidebodyMargin = sidebarWidth+Math.floor(wWidth/200),
                    buttonLeftTop = Math.abs(wWidth-(xClient-offsetX));
            } else {
                var sidebarWidth = xClient+(xClient>options.collapsedWidth ? (50-offsetX) : 5),
                    sidebodyMargin = sidebarWidth+Math.floor(wWidth/200),
                    buttonLeftTop = xClient-offsetX;
            }
            return {sidebar : sidebarWidth, body : sidebodyMargin, button: buttonLeftTop};
        },
        /**
         * save the offset-value of the division to reset it later
         * @param int offset
         */
        saveOffsetValue = function(offset){
            try{
                localStorage.setItem('ls_admin_view_sidemenu',''+offset);
            } catch(e){}
        },
        /**
         * Sets the division between sidemenu and sidebodyMargin
         * RTL-aware and returns a Promise
         * @param int xClient x-offset of the mouse or position to go to
         * @param boolean|undefined save Save the value into local-storage
         * @param boolean|undefined animation Animate the transition
         * @return Promise resolved when all animation is done, or at once
         */
        setDivisionOn = function(xClient,save,animation){
            save = save || false;
            animation = animation || false;
            var oValues = calculateValue(xClient);
            if(save){
                saveOffsetValue(xClient);
            }
            return Promise.all([setBody(oValues.body, animation), setMenu(oValues.sidebar, animation)]);
        },

    //eventHandler
        /**
         * Method to be bound to a doubleclick on the slide-handler button
         */
        onDblClick = function(e){
            var baseWidth = isRTL ? wWidth-options.baseWidth : options.baseWidth;
            unCollapseSidebar(baseWidth,false);
            window.localStorage.setItem('ls_admin_view_sidemenu',null);
        },
        /**
         * Method to be bound on the collapse/uncollapsebutton
         */
        onClickCollapseButton = function(e){
            if(oCollapseButton.data('collapsed')==0 ){ 
                collapseSidebar();
            } else {
                var setWidth = getSavedOffset();
                // console.log('setWidth',setWidth);
                unCollapseSidebar(setWidth,true);
            }
        },
        /**
         * Method to be bound to the mousedownevent on the slide-handler.
         * This methods bind events onto the body
         */
        onDragStartMethod = function(e){
            // console.log('dragstart triggered', e);
            defineOffset(e.offsetX, e.offsetY);
            //Using namespace .touched
            $('body').on('mousemove.touched', onDragMethod)
            $('body').on('mouseup.touched', onDragEndMethod)
        },
        /**
         * Method to be bound on the body while the mousebutton is held down
         */
        onDragMethod = function(e){
            // console.log('drag triggered', e.screenX);
            position =  e.clientX;
            setDivisionOn(position);
        },
        /**
         * Method to be called when the mousebutton is lifted.
         * This method must remove itselv together with the onDragMethod,
         * to avoid problems and undesired behaviour
         */
        onDragEndMethod = function(e){
            // console.log('dragend triggered', e.screenX);
            position =  e.clientX;
            if(position <  wWidth/8 ){
                collapseSidebar();
            } else {
                unCollapseSidebar(position,true);
            }
            //Removing namespace .touched
             $('body').off('.touched');
        };
    
//Initialize the system
    //get the saved offset
    var startOffset = getSavedOffset();
    //if the startOffset is below one eighth of the window, collapse it.
    if(startOffset <  wWidth/8 || oCollapseButton.data('collapsed')==1 ){
        collapseSidebar(true);
    //else run uncollapse 
    } else {
        unCollapseSidebar(startOffset, true);
    }
    //bind Methods to the slider-handle
    oDragButton
        .on('dblclick', onDblClick)
        .on('mousedown', onDragStartMethod)
        .on('dragstart', function(e){e.preventDefault();return false;});
    //bind Method to the collapse/uncollapse-button
    oCollapseButton
        .on('click', onClickCollapseButton);
};

var WindowBindings = function(){
    var surveybar = $('.surveybar'),
        sideBody = $('.side-body'),
        sidemenu = $('#sideMenu'),
        sidemenuContainer = $('#sideMenuContainer'),
        upperContainer = $('#in_survey_common'),
    
    //calculated vars
        maxHeight =  $(window).height() - $('#in_survey_common').offset().top - 10,
        basePosition = {top: 0, left: 0},
    //methods
        //create the first setting and calculate therefor
        setInitial = function(){
            basePosition = sidemenuContainer.offset();
            onWindowScroll();
            onWindowResize();
        },
        //Stick the side menu and the survey bar to the top
        onWindowScroll = function(e){
            var $toTop = (surveybar.offset().top - $(window).scrollTop());
            var topPosition = (basePosition.top - $(window).scrollTop());
            sidemenuContainer.css({position:"absolute", top: 'auto'});

            if($toTop <= 0)
            {
                surveybar.addClass('navbar-fixed-top');
                sidemenuContainer.css({position:"fixed", top: "45px"});
            }

            if ($(window).scrollTop() <= 45)
            {
                surveybar.removeClass('navbar-fixed-top');
            }
        },
        //fixSizings
        onWindowResize = function(){
            maxHeight       = ($(window).height()-95);
            // console.log("body", $('body').height());
            // console.log("base", basePosition.top);
            // console.log("footer", $('footer').height());
            // console.log("maxHeight", maxHeight);

            //maxHeightInside = (maxHeight - $('#in_survey_common').offset().top-2);
            sidemenu.css({'height': maxHeight, "overflow-y": 'auto'});
            sidemenuContainer.css({'max-height': (maxHeight)});
        }
    
    setInitial();
    $(window).on('scroll',onWindowScroll);
    $(window).on('resize',onWindowResize);
};


/**
 * Side Menu
 */
    
$(document).ready(function(){
   if($('#sideMenuContainer').length >0){
        new SideMenuMovement(
            '#sideMenuContainer', 
            '.side-body', 
            '#scaleSidebar', 
            '#chevronClose', 
            '#sidemenu-home',
            '#quick-menu-container',
            {baseWidth: 320});
        new WindowBindings();
    }
});
