// const apikey = '';
const apihost = 'https://todo-api.coderslab.pl';

function apiListAllTasks() {
    return fetch(
        apihost + '/api/tasks',
        {headers: {'Authorization': apikey}}
    )
        .then(resp => {
                if (!resp.ok) {
                    alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
                }
                return resp.json();
            }
        );
}

apiListAllTasks()
    .then(response => {
        console.log("Odpowiedx" + response);
    });

function apiCreateTask(title, description) {
    return fetch(
        apihost + '/api/tasks',
        {
            headers: {
                'Authorization': apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, description: description})
        }
    ).then(resp => {
        if(!resp.ok) {
            alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
        }
        return resp.json();
    });
}

apiCreateTask("test tytuł", "test opis")
    .then(resp => {
        console.log("Odpowiedź serwera: " + resp);
    });



//
// const form = document.querySelector("form");
// const addTaskButton = form.querySelector("button");
// form.querySelector("input").name
//
// console.log(addTaskButton);
//
// addTaskButton.addEventListener("click", evt => {
//     evt.preventDefault();
//
//     const title = form.elements["title"].value
//     const description = form.elements["description"].value
//
//     const section = document.createElement("section");
//     section.className = "card mt-5 shadow-sm";
//     document.querySelector("main").appendChild(section);
//
//     const headerDiv = document.createElement("div");
//     headerDiv.className = "card-header d-flex justify-content-between align-items-center";
//     section.appendChild(headerDiv);
//
//     const headerLeftDiv = document.createElement('div');
//     headerDiv.appendChild(headerLeftDiv);
//
//     const h5 = document.createElement('h5');
//     h5.innerText = title;
//     headerLeftDiv.appendChild(h5);
//
//     const h6 = document.createElement('h6');
//     h6.className = 'card-subtitle text-muted';
//     h6.innerText = description;
//     headerLeftDiv.appendChild(h6);
//
//     const headerRightDiv = document.createElement('div');
//     headerDiv.appendChild(headerRightDiv);
// });
//
//
//
//
// document.addEventListener('DOMContentLoaded', function() {
//
// });
