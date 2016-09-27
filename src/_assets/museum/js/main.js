// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import 'lazyload';
import 'TweenMax';

import PrimaryNav from '../../../_modules/primary-nav/primary-nav';

import { debounce } from './_helper';
import { speak } from './_audio';

// Variable declaration
var $window = $(window),
    $body = $('body'),
    $header = $('.header'),
    isMobileDevice = $window.width() < 768 ? true : false,
    lastScrollTop = 0;

$(() => {
    new PrimaryNav();   // Activate Primary NAv modules logic

    ////////////////////////////
    // Set framerate to 60fps //
    ////////////////////////////
    TweenMax.ticker.fps(60);



    ///////////////////////
    // Init Lazy Loading //
    ///////////////////////
    $('.lazy').lazyload({
        effect : 'fadeIn'
    });



    /////////////////////////////
    // Placeholder Alternative //
    /////////////////////////////
    (function () {
        var $inputText = $('input[type="text"]');

        if ($('.no-placeholder').length) {
            $inputText
                .each(function () {
                    var $this = $(this);
                    $this.addClass('blur').attr('value', $this.attr('placeholder'));
                })
                .on('focus', function () {
                    var $this = $(this);

                    if ($this.val() == $this.attr('placeholder')) {
                        $this.val('').removeClass('blur');
                    }
                })
                .on('blur', function () {
                    var $this = $(this);
                    if ($this.val() == '') {
                        $this.val($this.attr('placeholder')).addClass('blur');
                    }
                });
        }
    })();



    ////////////////////////////////////
    //Background-size: cover Fallback //
    ////////////////////////////////////
    (function () {
        if ($('.no-bgsizecover').length) {
            $('.backstretch').each(function () {
                var $this = $(this),
                    $dataOriginal = $this.data('original');

                $this.backstretch($dataOriginal);
            });
        }
    })();



    ////////////////////////////
    // Magical Table wrapping //
    ////////////////////////////
    (function () {
        $.fn.isTableWide = function () {
            return $(this).parent().width() < this.width();
        };

        $('table').each(function () {
            var $this = $(this);

            if ($this.length && !$this.parent().hasClass('table-wrapper') && $this.isTableWide()) {
                $this
                    .after('<button class="btn-print-table js-print-table">View Table</button>')
                    .wrap('<div class="table-wrapper"></div>');
            }
        });

        var $tablePreview = $('.table-preview');
        if ($tablePreview.length) {
            $('meta[name="viewport"]').attr('content', 'user-scalable=yes');
            $tablePreview.append(localStorage.tablePreview);

            $(window).bind('beforeunload', function () {
                localStorage.tablePreview = null;
            });
        }

        $('body').on('click', '.js-print-table', function () {
            var $table = $(this).prev();

            localStorage.tablePreview = $table[0].innerHTML;
            window.open('/table-preview/', '_blank').focus();
        });
    })();



    /////////////////////
    // Header Toggling //
    /////////////////////
    (function () {
        $window.on('resize scroll', debounce(toggleHeader, 250));

        function toggleHeader() {
            var st = $(this).scrollTop(),
                $headerHeight = $header.height();

            isMobileDevice = $window.width() < 1024 ? 1 : 0;

            if (!isMobileDevice) {
                if (st > lastScrollTop) {
                    // scroll down
                    if (st > $headerHeight) {
                        $header.addClass('hide').removeClass('compact');
                    }
                } else {
                    // scroll up
                    if (st <= $headerHeight) {
                        $header.removeClass('compact hide');
                    } else {
                        $header.addClass('compact');
                    }
                }
            }

            lastScrollTop = st;
        };
    })();


    console.log("I'm a firestarter!");


    $('.js-speak').on('click', function (e) {
        e.preventDefault();

        speak('en-UK', 'Google UK English Female', 'The Scream (Norwegian: Skrik) is the popular name given to each of four versions of a composition, created as both paintings and pastels, by the Expressionist artist Edvard Munch between 1893 and 1910.')

        speak('en-UK', 'Google UK English Female', 'Now, wouldn\'t that be cool if your app can speak to you while walking around the museum.  It could be just like any other audio tour, only this time, no need for someone to record the assets and upload.  Just update the copy in the website, and let me do the talking.');

        speak('en-UK', 'Google UK English Female', 'In addition to this...AHEM');

        speak('zh-TW', 'Google 國語（臺灣）', '我也会说华语.');

        speak('hi-IN', 'Google हिन्दी', 'எனக்கு தமிழ் பேச தெரியும்.');

        speak('id-ID', 'Google Bahasa Indonesia', 'Saya juga bisa bahasa indonesia.');

        speak('en-UK', 'Google UK English Female', 'As you can hear, I am multilingual.  Thank you.');
    });
});
