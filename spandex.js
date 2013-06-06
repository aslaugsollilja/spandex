var dict = {
    'lol': 'laughing out loud',
    'asap': 'as soon as possible'
};

// TODO: remember <textarea>
$("input[type=text]").keypress(function (e) {
    // if Ctrl+Enter
    if (e.ctrlKey && e.charCode == 10) {
        var txt = $(this).val();
        for (var i = txt.length-1; i >= 0; i--) {
            var keyword = txt.substr(i);
            if (dict.hasOwnProperty(keyword)) {
                var exspandexed = dict[keyword];
                $(this).val(txt.substr(0, txt.length - keyword.length) + exspandexed);
                break;
            }
        }

        // console.log($(this).val());
    }

    // console.log(e);
});
