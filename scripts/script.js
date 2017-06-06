
$(document).ready(function() {

    // INITIALIZE ALL GLOBAL VARIABLES
    var hours = [], minutes = [], seconds = [];
    var x = 0, hr, min, sec;
    var hoursList = 0, minutesList = 0, secondsList = 0;
    var totalHours = 0, totalMinutes = 0, totalSeconds = 0, totalDays = 0;
    //    var timesList = document.getElementsByTagName('li');
    var timesList = $('li');

    // CHANGING THE SELECTED <INPUT> DEPENDING ON THE FOCUS OF THE ELEMENT
    $('#hours').focusin(function() {
        $(this).prop('placeholder', '');
    });
    $('#hours').focusout(function() {
        $(this).prop('placeholder', 'hours');
    });
    $('#minutes').focusin(function() {
        $(this).prop('placeholder', '');
    });
    $('#minutes').focusout(function() {
        $(this).prop('placeholder', 'minutes');
    });
    $('#seconds').focusin(function() {
        $(this).prop('placeholder', '');
    });
    $('#seconds').focusout(function() {
        $(this).prop('placeholder', 'seconds');
    });
    $('#remove_index').focusin(function() {
        $(this).prop('placeholder', '');
    });
    $('#remove_index').focusout(function() {
        $(this).prop('placeholder', '# 1-60');
    });

    // ADDING THE CONTENTS OF THE HOURS, MINUTES, SECONDS INPUT FIELDS
    // TO THE RESPECTIVE NAMED ARRAY TO BE CALCULATED LATER
    $('#add').click(function() {

        // DECLARE THE VARIABLES FOR THE INPUT TIMES
        hr = $('#hours').val();
        min = $('#minutes').val();
        sec = $('#seconds').val();

        // CHECK IF THE USER HAS INPUT ANYTHING
        // IF THEY HAVE, ADD THE TIMES TO THE LIST
        // IF NOT, ALERT THE USER THEY MUST INPUT A VALUE TO BE ADDED
        if(hr == '' && min == '' && sec == '') {
//            alert('Please input times to be calculated');
        } else {

            // IF ONLY ONE DIGIT IS ADDED TO THE INPUTS,
            // ADD A '0' BEFORE THE ENTERED DIGIT FOR SHOWN TEXT PURPOSES ONLY
            if(hr.length === 1) {
                hr = 0 + hr;
            };
            if(min.length === 1) {
                min = 0 + min;
            };
            if(sec.length === 1) {
                sec = 0 + sec;
            };

            // IF THE INPUTS ARE LEFT EMPTY, MAKE THEM EQUAL '00'
            // FOR SHOWN TEXT PURPOSES ONLY
            if(hr == '') {
                hr = '00';
            };
            if(min == '') {
                min = '00';
            };
            if(sec == '') {
                sec = '00';
            };

            // CHANGE THE LIST ELEMENTS TEXT CONTENT
            $(timesList[x]).text(hr + 'h:' + min + 'm:' + sec + 's');
            x++;

            // CHECK IF USER HAS ENTERED THE MAXIMUM AMOUNT OF TIMES TO BE CALCULATED
            // MAXIMUM ALLOWABLE TIMES = 60
            // IF IT IS AT MAX CAP. THEN ALERT USER TO CLEAR LIST
            if(hours.length < 60 || minutes.length < 60 || seconds.length < 60) {
                hours.push(hr);
                minutes.push(min);
                seconds.push(sec);
            } else {
                alert('I\'m sorry, the list is full. Please clear the list to add more times');
            };
        };

        // CLEAR THE INPUT VALUES
        $('input').val('');
    });

    // CALCULATE THE TIMES THAT HAVE BEEN INPUT
    $('#calculate').click(function() {

        // RESET EACH ARRAY THAT HAS ALREADY ADDED EACH INPUT TIME,
        // SO THAT IF THE USER HAS ALREADY CALCULATED THE TIMES,
        // AND THEY WOULD LIKE TO ADD MORE TO THE CURRENT LIST WITHOUT RESETING,
        // THEY DON'T HAVE TO CLEAR THE LIST OR START OVER ALLTOGETHER
        hoursList = 0, minutesList = 0, secondsList = 0;

        // ADD TOGETHER THE TIMES IN EACH ARRAY
        for(i=0; i < hours.length; i++) {
            hoursList += parseInt(hours[i]);
        }
        for(i=0; i < minutes.length; i++) {
            minutesList += parseInt(minutes[i]);
        }
        for(i=0; i < seconds.length; i++) {
            secondsList += parseInt(seconds[i]);
        }

        // FINAL MATH STEP TO CALCULATE ALL TIMES GIVEN BY USER
        totalSeconds = secondsList % 60;
        totalMinutes = ((Math.floor(secondsList/60)) + (minutesList % 60)) % 60;
        totalHours = ((hoursList % 24) + (Math.floor(minutesList/60)) + (Math.floor(secondsList/60/60))) % 24;
        totalDays = ((Math.floor(hoursList/24)) + (Math.floor(minutesList/24/60)) + (Math.floor(secondsList/24/60/60))) % 60;

        // PRINT OUT THE TOTAL TIMES TO THE USER
        $('p').text('Total time = ' + totalDays + ' day/s, ' + totalHours + ' hour/s, ' + totalMinutes + ' minute/s, ' + totalSeconds + ' second/s' ).show();
    });

    // CLEAR THE ENTIRE LIST OF INPUT TIMES BY RESETING ALL VARIABLES
    $('#clear_time').click(function() {
        hours = [], minutes = [], seconds = [];
        totalHours = 0, totalMinutes = 0, totalSeconds = 0;
        hoursList = 0, minutesList = 0, secondsList = 0;
        x = 0;

        // RESET THE VALUES OF ALL INPUTS AND ALL LIST TEXT CONTENT
        // THEN RESET AND HIDE THE CALCULATED TIMES
        $('input').val('');
        $('li').text('00h:00m:00s');
        $('p').text('').hide();
    });

    // CLEAR JUST THE CHOSEN LIST ITEM OF INPUT TIME
    // THEN SHIFT EACH LIST VALUE, AFTER THE DELETED VALUE, UP 1
    $('#remove').click(function() {
        var listItem = parseInt($('#remove_index').val());
        var removeNum = $(timesList[listItem-1]).text();

        x -= 1;
        if(removeNum[0] != '0' || removeNum[1] != '0'){
            totalHours -= hours[listItem-1];
            hours.splice(listItem-1, 1);
        };
        if(removeNum[4] != '0' || removeNum[5] != '0'){
            totalMinutes -= minutes[listItem-1];
            minutes.splice(listItem-1, 1);
        };
        if(removeNum[8] != '0' || removeNum[9] != '0'){
            totalSeconds -= seconds[listItem-1];
            seconds.splice(listItem-1, 1);
        };

        $('p').text('Total time = ' + totalDays + ' day/s, ' + totalHours + ' hour/s, ' + totalMinutes + ' minute/s, ' + totalSeconds + ' second/s' );

        for(i=listItem; i<60; i++) {
            $(timesList[i-1]).text($(timesList[i]).text());
        };
    });
});
