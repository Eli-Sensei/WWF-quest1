const $argoform: HTMLFormElement | null = document.querySelector("form");
const $submitBtn: HTMLInputElement | null = document.querySelector("#sub");

if($argoform){
    $argoform.addEventListener("submit", (e: any)=>{
        e.preventDefault();
        insertMember();
    });
}

document.addEventListener("DOMContentLoaded", getAllMembers);




// FUNCTION

function insertMember() {

    const $nameMemberInput: HTMLInputElement | null = document.querySelector("[name=name]");
    if($nameMemberInput && $nameMemberInput.value.trim()){
        const nameMember: string = $nameMemberInput.value.trim();

        if($submitBtn){
            $submitBtn.disabled = true;
            $submitBtn.innerHTML = "Patientez...";
        }
        
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "./php/insertMember.php", true);

        xhr.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200) {
                
                if($submitBtn){
                    $submitBtn.disabled = false;
                    $submitBtn.innerHTML = "Envoyer";
                }
                getAllMembers();
            }
        }

        const formData: FormData = new FormData();
        formData.append("name", nameMember);
        xhr.send(formData);
    }

    

}

function getAllMembers() {
    
    let xhr = new XMLHttpRequest();

    xhr.responseType = "json";

    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {

            let members: any[] = this.response;

            console.log(members,typeof(members));

            const $listContainer: HTMLElement | null = document.querySelector(".member-list");
            let html: any = "";

            for (const element of members) {
                let name: string = element.argo_name;
                let position: number = element.argo_id;

                html += `<div class="member-item">${position + '. ' + name}</div>`;
            }
            
            if($listContainer) $listContainer.innerHTML = html;
        }
    }

    xhr.open("GET", "./php/getAllMembers.php", true);
    xhr.send();
    
}