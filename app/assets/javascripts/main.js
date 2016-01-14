/**
 * Created by Lilik on 17.12.2015.
 */
$(document).ready(function(){
    var filterHead = $('.filter-heading-wrapper');
    var subFilter = $('.filter-name');
    var showMoreLink = $('.showmore-link-wrapper');
    var plusIcon = $('.filter-plus-icon');
    var checkBox = $('.checkbox-inline');

    // 'Buying guides' show block
    $('#buying-guides').click(function(){
        var leftPos = $(this).offset().left;
        var topPos = $(this).offset().top + 35;
        $('.buying-guides-block-wrapper').toggle(300).css({
            'left': leftPos,
            'top': topPos
        });
    });

    // 'Compare' show block
    $('#compare-button').click(function(){
        var leftPos = $(this).offset().left;
        var topPos = $(this).offset().top + 35;
        $('.compare-block-wrapper').toggle(300).css({
            'left': leftPos,
            'top': topPos
        });
    });

    // 'Categories' show block
    $('#categories-button').click(function(){
        var leftPos = $(this).offset().left;
        var topPos = $(this).offset().top + 30;
        $('.categories-block-wrapper').toggle(300).css({
            'left': leftPos,
            'top': topPos
        });
    });

    // Show 'burger' menu on mobile screen
    $('.mobile-burger-menu').click(function(){
       $('.main-menu-wrapper').slideToggle(200);
    });

    // Show 'filter' menu on mobile screen
    $('.mobile-filter-button').click(function(){
       $('.side-panel-wrapper').toggleClass('mobile-visible');
    });

    // Removing 'plus' icons if there are no sub-filters
    $(subFilter).each(function(){
       if($(this).siblings('.sub-filter-wrapper').length == 0){
           $(this).siblings('.filter-plus-icon').hide();
       }
    });

    // Adding a custom scrollbar for filtering
    var container = $('.filter-group-contents');
    $(container).perfectScrollbar({
        wheelSpeed: .1,
        wheelPropagation: true,
        minScrollbarLength: 20,
        scrollYMarginOffset: 150,
        maxScrollbarLength: 80
    });

    // Showing 'Your categories' filters by default
    $('.filter-group.your-categories').children('.filter-group-contents').toggle().addClass('visible');
    $('.filter-group.your-categories .filter-group-arrow').addClass('rotated');


    // Hiding more than 5 filters
    if($(filterHead).siblings('.filter-group-contents').find('.filter-wrapper').length > 5){
        $(filterHead).siblings('.filter-group-contents').find('.filter-wrapper:gt(4)').hide();
    }

     // Toggling main filters
    $(filterHead).click(function(){
        $(this).siblings('.filter-group-contents').toggle(300).toggleClass('visible');
        $(this).children('.filter-group-arrow').toggleClass('rotated');

        if($(this).nextAll('.showmore-link-wrapper:first').css('display') == 'block'){
            $(this).nextAll('.showmore-link-wrapper:first').hide(300);
        }

        if($(this).siblings('.filter-group-contents').find('.filter-wrapper').length > 5 && $(this).nextAll('.showmore-link-wrapper:first').css('display') == 'none'){
            $(this).nextAll('.showmore-link-wrapper:first').show(300);
        }
    });

    // Adding filter boxes to grey bar
    function applyFilter(filterText, filterCheckBoxId, isChecked){

        var filterHtml = "<div data-filterId="+filterCheckBoxId+" class='applied-filter'>" +
            "<span class='glyphicon glyphicon-remove'></span>" +
            "<span class='applied-filter-text'>"+filterText+"</span>";

        if(isChecked)
            $('.applied-filters-wrapper').append(filterHtml);

        var appliedFilters = $('.applied-filter');
        if(!isChecked){
            $(appliedFilters).each(function(){

                if($(this).attr('data-filterId') == filterCheckBoxId)
                    $(this).remove();
            });
            return 0;
        }
    }


    // Toggle sub filters
    $(subFilter).click(function(event){
        event.preventDefault();
        var isChecked;
        if($(this).siblings('.sub-filter-wrapper').length > 0){
            $(this).siblings('.sub-filter-wrapper:first').toggle(300);
            $(this).siblings('.filter-plus-icon').toggleClass('glyphicon-minus');
        }
        if($(this).siblings('.checkbox-style:first').children('input').prop('checked') == true){
            $(this).siblings('.checkbox-style:first').children('input').prop('checked', false);
            isChecked = false;
        }
        else if($(this).siblings('.checkbox-style:first').children('input').prop('checked') == false) {
            $(this).siblings('.checkbox-style:first').children('input').prop('checked', true);
            isChecked = true;
        }
        var filterCheckBoxId = $(this).siblings('.checkbox-style:first').children('input').attr('id');
        applyFilter($(this).text(), filterCheckBoxId, isChecked);
    });


    // Removing applied filters from grey bar
    $('body').on('click','.applied-filter', function(){
        var filterCheckBoxId = $(this).attr('data-filterId');
        var checkBoxes = $('.checkbox-style').children('input');

        $(checkBoxes).each(function(){
           if($(this).attr('id') == filterCheckBoxId){
               $(this).prop('checked', false);

               if($(this).parent().siblings('.sub-filter-wrapper').length > 0){
                   $(this).parent().siblings('.sub-filter-wrapper:first').toggle(300);
                   $(this).parent().siblings('.filter-plus-icon:first').toggleClass('glyphicon-minus');
               }
           }
        });

        $(this).remove();

    });

    //  Showing/hiding filters sub-groups
    $(plusIcon).click(function(){
        if($(this).siblings('.sub-filter-wrapper').length > 0){
            $(this).siblings('.sub-filter-wrapper:first').toggle(300);
            $(this).toggleClass('glyphicon-minus');
        }
        if($(this).siblings('.checkbox-style:first').children('input').prop('checked') == true){
            var appliedFilter = $('.applied-filter');
            $(this).siblings('.checkbox-style:first').children('input').prop('checked', false);
        }
        else if($(this).siblings('.checkbox-style:first').children('input').prop('checked') == false) {
            $(this).siblings('.checkbox-style:first').children('input').prop('checked', true);
        }

        var filterCheckBoxId = $(this).siblings('.checkbox-style:first').children('input').attr('id');
        var isChecked = $(this).siblings('.checkbox-style:first').children('input').prop('checked')
        applyFilter($(this).siblings('.filter-name:first').text(), filterCheckBoxId, isChecked);
    });

    $(checkBox).click(function(){
        if($(this).parent().siblings('.sub-filter-wrapper').length > 0){
            $(this).parent().siblings('.sub-filter-wrapper:first').toggle(300);
            $(this).parent().siblings('.filter-plus-icon').toggleClass('glyphicon-minus');
        }

        var filterCheckBoxId = $(this).attr('id');
        var isChecked = $(this).prop('checked');
        applyFilter($(this).parent().siblings('.filter-name:first').text(), filterCheckBoxId, isChecked);
    });

    $('.filter-name').click(function(event){
        event.stopImmediatePropagation();
    });


    // Behaviour of 'Show more' button
    $(showMoreLink).click(function(event){
        if($(this).children('.more-link').text() == 'More...'){
            $(this).siblings('.filter-group-contents').children('.filter-wrapper:gt(4)').show(400);
            $(this).siblings('.filter-group-contents').children('.ps-scrollbar-y-rail:first').css('display', 'block');
            $(this).children('.more-link').text('Less...');
        }
        else{
            $(this).siblings('.filter-group-contents').children('.filter-wrapper:gt(4)').hide(400)
            $(this).siblings('.filter-group-contents').children('.ps-scrollbar-y-rail:first').css('display', 'none');
            $(this).children('.more-link').text('More...');

        }
    });
});