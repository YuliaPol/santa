
jQuery(function ($) {
    $(document).ready(function () {
        //function for autoresize textarea
        $.fn.autoResize = function(){
            let r = e => {
                e.style.height = '';
                e.style.height = e.scrollHeight + 'px'
            };
            return this.each((i,e) => {
                e.style.overflow = 'hidden';
                r(e);
                $(e).bind('input', e => {
                    r(e.target);
                })
            })
        };
        // Restricts input for the set of matched elements to the given inputFilter function.
        $.fn.inputFilter = function(inputFilter) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = "";
                }
            });
        };
        const form = document.getElementById('main-form');

        form.addEventListener('submit', function (e){
            e.preventDefault();
            let el = document.querySelectorAll('[data-reqired]');
            let erroreArrayElements = [];
            for (let i = 0; i < el.length; i++) {
                if (el[i].tagName === 'TEXTAREA' || el[i].tagName === 'INPUT') {
                    if (el[i].value === '' || el[i].value === ' ' || el[i].value === '-') {
                        erroreArrayElements.push(el[i]);
                        $(el[i]).on('click', function () {
                            $(this).parents('.form-group').find('.error').fadeOut(300);
                            $(el[i]).parents('.form-group').removeClass('has-error');
                        });
                        $(el[i]).parents('.form-group').find('.error').fadeIn(300);
                        $(el[i]).parents('.form-group').addClass('has-error');
                    }
                }
            }
            if (erroreArrayElements.length == 0) {
                form.submit();
            } else {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(erroreArrayElements[0]).parents('.form-group').offset().top
                }, 1000);
            }
        });

        //auto height for textarea
        $('.page-wrap textarea').autoResize();

        //only number for phone
        $('.phone').inputFilter(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 99999999999);
        });
    });
});