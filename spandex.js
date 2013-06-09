var dict = {};
var longestKeyword = 0;

var updateDict = function () {
    chrome.storage.sync.get('dict', function (res) {
        dict = res.hasOwnProperty('dict') ? res['dict'] : {};
        longestKeyword = 0;
        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                longestKeyword = Math.max(longestKeyword, key.length);
            }
        }
    });
};

chrome.storage.onChanged.addListener(function (changes, namespace) {
    updateDict();
});

updateDict();

var updateText = function (ele, start, end, replace) {
    ele.value = ele.value.substring(0, start) + replace + ele.value.substring(end);
    ele.selectionStart = ele.selectionEnd = start + replace.length;
};

document.addEventListener('keydown', function (e) {

    var handled = false;

    // if Ctrl+Enter
    if (e.ctrlKey && e.keyCode == 13) {
        var input = document.activeElement,
            tagName = input.tagName.toLowerCase();

        // if is text element
        if ((tagName == 'input' && input.type.toLowerCase() == 'text') || tagName == 'textarea') {

            // if no text is selected
            if (input.selectionStart == input.selectionEnd) {

                for (var i = input.selectionEnd - 1, len = 1; i >= 0 && len <= longestKeyword; i--, len++) {
                    var cur = input.value.substring(i, input.selectionEnd);
                    if (dict.hasOwnProperty(cur) && dict[cur].active) {
                        updateText(input, i, input.selectionEnd, dict[cur].expansion);
                        handled = true;
                        break;
                    }
                }

            } else /* if some text is selected */ {

                var cur = input.value.substring(input.selectionStart, input.selectionEnd);
                if (dict.hasOwnProperty(cur) && dict[cur].active) {
                    updateText(input, input.selectionStart, input.selectionEnd, dict[cur].expansion);
                    handled = true;
                }
            }
        }
    }

    if (handled) {
        e.preventDefault();
        e.stopPropagation();
    }

}, true);
