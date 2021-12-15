
const form = document.getElementById('main-form');

form.addEventListener('submit', function (e){
    e.preventDefault();
    let el = document.querySelectorAll('[data-reqired]');
    let erroreArrayElements = [];
    for (let i = 0; i < el.length; i++) {
        if (el[i].tagName === 'TEXTAREA') {
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