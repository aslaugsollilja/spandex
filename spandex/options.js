var restore_options = function () {
    chrome.storage.sync.get('dict', function (res) {
        var dict = res["dict"];
        $("#display_keywords tbody").empty();

        for (key in dict) {
            if (dict.hasOwnProperty(key)) {
                var checkbox = $("<input/>").attr("type", "checkbox").change(function (key) {
                    return function () {
                        dict[key].active = !dict[key].active; /* checkbox.is(":checked"); */
                        chrome.storage.sync.set({'dict': dict}, restore_options);
                    };
                } (key));

                if (dict[key].active) checkbox.attr("checked", "checked");

                var remove = $("<button/>").append($("<i/>").addClass("icon-remove icon-white")).click(function (key) {
                    return function () {
                        delete dict[key];
                        chrome.storage.sync.set({'dict': dict}, restore_options);
                    };
                } (key)).addClass("btn btn-danger");

                $("<tr/>")
                    .append($("<td/>").addClass("dk_keyword").text(key))
                    .append($("<td/>").addClass("dk_expansion").text(dict[key].expansion))
                    .append($("<td/>").addClass("dk_active").append(checkbox))
                    .append($("<td/>").addClass("dk_remove").append(remove))
                    .appendTo($("#display_keywords tbody"));
            }
        }
    });
};

$(document).ready(function () {
    restore_options();

    $("#new_add").click(function () {

        chrome.storage.sync.get('dict', function (res) {
            var dict = res.hasOwnProperty("dict") ? res["dict"] : {};

            dict[$("#new_keyword").val()] = {
                expansion: $("#new_expansion").val(),
                active: true
            };

            $("#new_keyword").val("");
            $("#new_expansion").val("");
            chrome.storage.sync.set({'dict': dict}, restore_options);
        });

        return false;
    });
});
