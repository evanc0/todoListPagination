let addButton = document.querySelector(".button");
let mainTasks = document.querySelector(".mainTasks");
let addName = document.querySelector(".name");
let addInfo = document.querySelector(".info");
let todo = document.querySelector(".mainTasks");
let closeButton = document.querySelector(".deleteButton");
let valueTasks = document.querySelector(".valueTasks");

let todoList = [];
valueTasks.innerHTML = JSON.parse(localStorage.getItem('todo'))?.length || 0; // счетчик кол-во задач
console.log(JSON.parse(localStorage.getItem("todo"))?.length);

let currentPage = 1;
let rows = 9;

displayPagination(9);

if (localStorage.getItem("todo")) {
    todoList = JSON.parse(localStorage.getItem("todo")); // возвращаем в туду лист массив из локалстореджа
    creatTask(9, 1);
    displayPagination(rows);
}

addButton.addEventListener("click", function() {
    if (addName.value.trim().length === 0) {
        return;
    }
    if (addInfo.value.trim().length === 0) {
        return;
    }

    let newTodo = {
        todo: addName.value,
        info: addInfo.value,
        checked: false,
        id: Date.now(),
    };

    todoList.push(newTodo);
    valueTasks.innerHTML = todoList.length;

    localStorage.setItem("todo", JSON.stringify(todoList));
    creatTask(9, 1);
    displayPagination(rows);

    addName.value = "";
    addInfo.value = "";
});

function creatTask(rows, currentPage) {
    currentPage--; // для правильных шагов, чтобы первая страница была 10 * 0 = 0 соответственно слайсить начнём с 0 на первой странице, до 0 + 9 = 9 (получается первых 9 элементов)

    const start = rows * currentPage;
    const end = start + rows;

    const paginatedData = JSON.parse(localStorage.getItem("todo")).slice(
        start,
        end
    ); // выводим на страницу только то количество задач, сколько у нас будет на странице

    let task = "";

    if (todoList.length === 0) {
        mainTasks.innerHTML = "";
    }

    paginatedData.forEach(function(item, index) {
        task += `
        <div class="task">
        <div class="task_up">
            <div>
                <label for='item_${index}'>${item.todo}</label>
            </div>
            <div>
                <input type="checkbox" id='${item.id}' ${
      item.checked ? "checked" : ""
    }>
                <button id='item_${index}' class="close" onclick="deleteTask(${
      item.id
    })">Удалить</button>
            </div>
        </div>

        <p>${item.info}</p>
    </div>
`;
    });
    mainTasks.innerHTML = task;
}

function displayPagination(rowPerPage) {

    const paginationEl = document.querySelector(".pagination");
    const pagesCount = Math.ceil(todoList.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add("pagination__list");
    paginationEl.innerHTML = "";

    for (i = 0; i < pagesCount; i++) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
}

function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add("pagination__item");
    liEl.innerText = page;

    liEl.addEventListener("click", function() {
        // мб стрелочная у него тут

        currentPage = page;

        creatTask(rows, currentPage);
    });

    return liEl;
}

todo.addEventListener("change", function(event) {
    let idInput = event.target.getAttribute("id");
    console.log(idInput);

    todoList.forEach(function(item) {
        if (item.id === Number(idInput)) {
            item.checked = !item.checked;
            localStorage.setItem("todo", JSON.stringify(todoList));
        }
    });
});

function deleteTask(id) {
    console.log(id);
    todoList = todoList.filter((todo) => todo.id !== id);
    localStorage.setItem("todo", JSON.stringify(todoList));
    creatTask(9, 1);
    displayPagination(rows);

    valueTasks.innerHTML = todoList.length;
}

closeButton.addEventListener("click", function() {
    todoList = todoList.filter((todo) => !todo.checked);
    localStorage.setItem("todo", JSON.stringify(todoList));
    creatTask(9, 1);
    displayPagination(rows);

    valueTasks.innerHTML = todoList.length;
});

//   function main() {
//     const postsData = JSON.parse(localStorage.getItem('todo'));;

//     function displayList(arrData, rowPerPage, page) {
//         const postsEl = document.querySelector('.mainTasks');

//     }
//     function displayPagination() {}
//     function displayPaginationBtn() {}

// }

// main();