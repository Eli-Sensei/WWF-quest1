"use strict";
var $argoform = document.querySelector("form");
var $submitBtn = document.querySelector("#sub");
if ($argoform) {
    $argoform.addEventListener("submit", function (e) {
        e.preventDefault();
        insertMember();
    });
}
document.addEventListener("DOMContentLoaded", getAllMembers);
// FUNCTION
function insertMember() {
    var $nameMemberInput = document.querySelector("[name=name]");
    if ($nameMemberInput && $nameMemberInput.value.trim()) {
        var nameMember = $nameMemberInput.value.trim();
        if ($submitBtn) {
            $submitBtn.disabled = true;
            $submitBtn.innerHTML = "Patientez...";
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "./php/insertMember.php", true);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if ($submitBtn) {
                    $submitBtn.disabled = false;
                    $submitBtn.innerHTML = "Envoyer";
                }
                getAllMembers();
            }
        };
        var formData = new FormData();
        formData.append("name", nameMember);
        xhr.send(formData);
    }
}
function getAllMembers() {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var members = this.response;
            console.log(members, typeof (members));
            var $listContainer = document.querySelector(".member-list");
            var html = "";
            for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
                var element = members_1[_i];
                var name_1 = element.argo_name;
                var position = element.argo_id;
                html += "<div class=\"member-item\">" + (position + '. ' + name_1) + "</div>";
            }
            if ($listContainer)
                $listContainer.innerHTML = html;
        }
    };
    xhr.open("GET", "./php/getAllMembers.php", true);
    xhr.send();
}
