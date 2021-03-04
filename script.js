const apihost = 'https://todo-api.coderslab.pl';

function apiCreateTask(title, description) {
    return fetch(
        apihost + '/api/tasks',
        {
            headers: {'Authorization': apikey, 'Content-Type': 'application/json'},
            body: JSON.stringify({title: title, description: description, status: "open"}),
            method: "POST"
        }
    ).then(getRespJson);
}

function apiListTasks() {
    return fetch(
        apihost + '/api/tasks',
        {headers: {'Authorization': apikey}}
    ).then(getRespJson);
}

function apiListOperationsForTask(taskId) {
    return fetch(
        apihost + '/api/tasks/' + taskId + '/operations',
        {headers: {'Authorization': apikey}}
    ).then(getRespJson);
}

function apiDeleteTask(taskId) {
    return fetch(
        apihost + '/api/tasks/' + taskId,
        {
            headers: {'Authorization': apikey},
            method: "DELETE"
        }
    ).then(getRespJson);
}

function apiCreateOperationForTask(taskId, description) {
    return fetch(
        apihost + '/api/tasks/' + taskId + '/operations',
        {
            headers: {'Authorization': apikey, 'Content-Type': 'application/json'},
            body: JSON.stringify({description: description, timeSpent: 0}),
            method: 'POST'
        }
    ).then(getRespJson);
}

function apiUpdateOperation(operationId, description, timeSpent) {
    return fetch(
        apihost + '/api/operations/' + operationId,
        {
            headers: {'Authorization': apikey, 'Content-Type': 'application/json'},
            body: JSON.stringify({description: description, timeSpent: timeSpent}),
            method: 'PUT'
        }
    ).then(getRespJson);
}

function apiDeleteOperation(operationId) {
    return fetch(
        apihost + '/api/operations/' + operationId,
        {
            headers: {'Authorization': apikey},
            method: 'DELETE'
        }
    ).then(getRespJson);
}

function apiUpdateTask(taskId, title, description) {
    return fetch(
        apihost + '/api/tasks/' + taskId,
        {
            headers: {'Authorization': apikey, 'Content-Type': 'application/json'},
            body: JSON.stringify({title: title, description: description, status: "closed"}),
            method: "PUT"
        }
    ).then(getRespJson);
}

function getRespJson(resp) {
    if (!resp.ok) {
        alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
    }
    return resp.json();
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

        finishButton.addEventListener("click", () => {
            apiUpdateTask(taskId, title, description)
                .then(() => {
                    section.querySelectorAll('.js-task-open-only')
                        .forEach(element => {
                            element.parentElement.removeChild(element);
                        });
                });
        });
    }

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-outline-danger btn-sm ml-2";
    deleteButton.innerText = "Delete";
    headerRightDiv.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        apiDeleteTask(taskId)
            .then(() => {
                section.remove();
            });
    });

    const ul = document.createElement("ul");
    ul.className = "list-group list-group-flush"
    section.appendChild(ul);

    apiListOperationsForTask(taskId)
        .then(resp => {
            resp.data.forEach(operation => {
                renderOperation(ul, status, operation.id, operation.description, operation.timeSpent)
            });
        });

    if (status === "open") {
        const addOperationDiv = document.createElement("div");
        addOperationDiv.className = "card-body js-task-open-only";
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

        form.addEventListener("submit", () => {
            apiCreateOperationForTask(taskId, inputDescription.value)
                .then(resp => {
                    renderOperation(
                        ul,
                        status,
                        resp.data.id,
                        resp.data.description,
                        resp.data.timeSpent
                    )
                });
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
    time.innerText = formatTime(timeSpent);
    descriptionDiv.appendChild(time);

    if (status === "open") {
        const controlDiv = document.createElement("div");
        controlDiv.className = "js-task-open-only";
        li.appendChild(controlDiv);

        const add15minButton = document.createElement("button");
        add15minButton.className = "btn btn-outline-success btn-sm mr-2";
        add15minButton.innerText = "+15min";
        controlDiv.appendChild(add15minButton);

        add15minButton.addEventListener("click", () => {
            apiUpdateOperation(operationId, operationDescription, timeSpent + 15)
                .then(resp => {
                    time.innerText = formatTime(resp.data.timeSpent);
                    timeSpent = resp.data.timeSpent;
                });
        });

        const add1hButton = document.createElement("div");
        add1hButton.className = "btn btn-outline-success btn-sm mr-2";
        add1hButton.innerText = "+1h";
        controlDiv.appendChild(add1hButton);

        add1hButton.addEventListener("click", () => {
            apiUpdateOperation(operationId, operationDescription, timeSpent + 60)
                .then(resp => {
                    time.innerText = formatTime(resp.data.timeSpent);
                    timeSpent = resp.data.timeSpent;
                });
        });

        const deleteOperationButton = document.createElement("button");
        deleteOperationButton.className = "btn btn-outline-danger btn-sm";
        deleteOperationButton.innerText = "Delete";
        controlDiv.appendChild(deleteOperationButton);

        deleteOperationButton.addEventListener("click", () => {
            apiDeleteOperation(operationId)
                .then(() => {
                    li.remove();
                });
        });
    }
}

function formatTime(timeMin) {
    const hours = Math.floor(timeMin / 60);
    const minutes = timeMin % 60;
    if (hours > 0) {
        return hours + "h " + minutes + "min";
    } else {
        return minutes + "min";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    apiListTasks()
        .then(resp => {
                resp.data.forEach(task => {
                        renderTask(task.id, task.title, task.description, task.status);
                    }
                );
            }
        );
});

const addTaskButton = document.querySelector(".js-task-adding-form");
addTaskButton.addEventListener("submit", ev => {
    ev.preventDefault();
    apiCreateTask(ev.target.elements.title.value, ev.target.elements.description.value)
        .then(resp => {
            renderTask(
                resp.data.id,
                resp.data.title,
                resp.data.description,
                resp.data.status
            )
        });
});

