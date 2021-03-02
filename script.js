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
