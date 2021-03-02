const apihost = 'https://todo-api.coderslab.pl';
const apikey = "";

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

function apiCreateTask(title, description) {
    return fetch(
        apihost + '/api/tasks',
        {
            headers: {
                'Authorization': apikey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, description: description })
        }
    ).then(resp => {
        if(!resp.ok) { alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny'); }
        return resp.json();
    });
}

function apiListTasks() {
    return fetch(
        apihost + '/api/tasks',
        { headers: { 'Authorization': apikey }}
        ).then(resp => {
            if(!resp.ok) { alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny'); }
            return resp.json();
    });
}

function renderTask(taskId, title, description, status) {
    const section = document.createElement("section");
    section.className = "card mt-5 shadow-sm";
    document.querySelector("main").appendChild(section);

    const headerDiv = document.createElement("div");
    headerDiv.className = "card-header d-flex justify-content-between align-items-center";
    section.appendChild(headerDiv);

    const headerLeftDiv = document.createElement("div");
    headerDiv.appendChild(headerLeftDiv);

    const h5 = document.createElement("h5");
    h5.innerText = title;
    headerLeftDiv.appendChild(h5);

    const h6 = document.createElement("h6");
    h6.className = "card-subtitle text-muted";
    h6.innerText = description;
    headerLeftDiv.appendChild(h6);

    const headerRightDiv = document.createElement("div");
    headerDiv.appendChild(headerRightDiv);

    if (status === "open") {
        const finishButton = document.createElement("button");
        finishButton.className = "btn btn-dark btn-sm js-task-open-only";
        finishButton.innerText = "Finish";
        headerRightDiv.appendChild(finishButton);
    }

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-outline-danger btn-sm ml-2";
    deleteButton.innerText = "Delete";
    headerRightDiv.appendChild(deleteButton);
}

document.addEventListener("DOMContentLoaded", function() {
    apiListTasks()
        .then(resp => {
                resp.data.forEach( task => {
                    function (task) {
                        renderTask(task.id, task.title, task.description, task.status);
                    }
                );
            }
        );
});

