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

    const ul = document.createElement("ul");
    ul.className = "list-group list-group-flush"
    section.appendChild(ul);

    if (status === "open") {
        const addOperationDiv = document.createElement("div");
        addOperationDiv.className = "card-body";
        section.appendChild(addOperationDiv);

        const form = document.createElement("form");
        addOperationDiv.appendChild(form);

        const inputDiv = document.createElement("div");
        inputDiv.className = "input-group";
        form.appendChild(inputDiv);

        const inputDescription = document.createElement("input");
        inputDescription.setAttribute("type", "text");
        inputDescription.setAttribute("placeholder", "Operation description");
        inputDescription.setAttribute("minlength", "5");
        inputDescription.className = "form-control";
        inputDiv.appendChild(inputDescription);

        const inputGroupAppend = document.createElement("div");
        inputGroupAppend.className = "input-group-append";
        inputDiv.appendChild(inputGroupAppend);

        const addOperationButton = document.createElement("button");
        addOperationButton.className = "btn btn-info";
        addOperationButton.innerText = "Add";
        inputGroupAppend.appendChild(addOperationButton);

        addOperationButton.addEventListener("submit", ev => {
            ev.preventDefault();

        //    TODO
        //      - add event for this button

        });
    }
}

function renderOperation(operationsList, status, operationId, operationDescription, timeSpent) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    operationsList.appendChild(li);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.innerText = operationDescription;
    li.appendChild(descriptionDiv);

    const time = document.createElement("span");
    time.className = "badge badge-success badge-pill ml-2";
    time.innerText = timeSpent + "m";
    descriptionDiv.appendChild(time);
}

document.addEventListener("DOMContentLoaded", function() {
    apiListTasks()
        .then(resp => {
                resp.data.forEach(task => {
                        renderTask(task.id, task.title, task.description, task.status);
                    }
                );
            }
        );
});

