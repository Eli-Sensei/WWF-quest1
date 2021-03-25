"use strict";
const $argoform = document.querySelector("form");
const $submitBtn = document.querySelector("#sub");
if ($argoform) {
    $argoform.addEventListener("submit", (e) => {
        e.preventDefault();
        insertMember();
    });
}
document.addEventListener("DOMContentLoaded", getAllMembers);
// FUNCTION
function insertMember() {
    const $nameMemberInput = document.querySelector("[name=name]");
    const $status = document.querySelector("#status");
    if ($nameMemberInput && $nameMemberInput.value.trim()) {
        const nameMember = $nameMemberInput.value.trim();
        $nameMemberInput.value = "";
        let membersList = document.querySelectorAll(".member-item");
        // checking by name if new member already exist
        if (membersList) {
            for (const member of membersList) {
                let name = member.innerHTML.split('. ')[1].trim();
                if (name && name == nameMember) {
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
        let xhr = new XMLHttpRequest();
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
        const formData = new FormData();
        formData.append("name", nameMember);
        xhr.send(formData);
    }
}
function getAllMembers() {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // members' list
            let members = this.response;
            const $listContainer = document.querySelector(".member-list");
            let html = "";
            for (let i = 0; i < members.length; i++) {
                let name = members[i].argo_name;
                html += `<div class="member-item">${(i + 1).toString() + '. ' + name}</div>`;
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
