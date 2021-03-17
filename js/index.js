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
    var $status = document.querySelector("#status");
    if ($nameMemberInput && $nameMemberInput.value.trim()) {
        var nameMember = $nameMemberInput.value.trim();
        $nameMemberInput.value = "";
        var membersList = document.querySelectorAll(".member-item");
        // checking by name if new member already exist
        if (membersList) {
            for (var _i = 0, membersList_1 = membersList; _i < membersList_1.length; _i++) {
                var member = membersList_1[_i];
                var name_1 = member.innerHTML.split('. ')[1].trim();
                if (name_1 && name_1 == nameMember) {
                    if ($status) {
                        $status.style.color = "#A10702";
                        $status.innerHTML = "Cet argonaute existe déjà !";
                        return;
                    }
                }
            }
            ;
        }
        // desable the button
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
                if ($status) {
                    $status.style.color = "#447604";
                    $status.innerHTML = "Nouvel argonaute bien ajouté !";
                }
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
            // members' list
            var members = this.response;
            var $listContainer = document.querySelector(".member-list");
            var html = "";
            for (var i = 0; i < members.length; i++) {
                var name_2 = members[i].argo_name;
                html += "<div class=\"member-item\">" + ((i + 1).toString() + '. ' + name_2) + "</div>";
            }
            // display the list
            if ($listContainer) {
                $listContainer.innerHTML = html;
            }
        }
    };
    xhr.open("GET", "./php/getAllMembers.php", true);
    xhr.send();
}
getAllMembers();
