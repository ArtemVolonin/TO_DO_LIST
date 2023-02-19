
let btn_add_task = document.querySelector(".btn_add_task");
let input = document.querySelector(".input_task");
let memo = document.querySelector(".add_memo_task");
let type_task = document.querySelector(".list_type_task");
let prioritet_task = document.querySelector(".list_prioritet_task");
let input_data_task = document.querySelector(".input_data");



function update_task(id_task){
//let div_task = document.querySelector(`[id=${id_task}]`);
 let memo_value = document.querySelector(`[text_id_task="${id_task}"]`);
 let input_value = document.querySelector(`[input_task_id="${id_task}"]`);
 let data_task = document.querySelector(`[data_id_task="${id_task}"]`);
 let obj ={};  // arrayTasks[ arrayTasks.indexOf(`id_task=${id_task}`)];
   arrayTasks.forEach(o =>{ // находим объект таски в масссиве
    if (o.id_task == id_task) { obj = o}; })

        obj.input_value = input_value.value;
        obj.memo_value = memo_value.value;
       /// obj.type_task = type_task;
       // obj.prioritet_task = prioritet_task;
        obj.data_task = data_task.value;
    //arrayTasks[id_task] = obj;
    localStorage.setItem("arrayTasks", JSON.stringify(arrayTasks));
    //console.log(arrayTasks);
}

let btn_save = document.querySelector(".btn_save");

let StartGroups = ['Черга','В роботі','Тестування','Виконано'];
let arrayGroup = [];
let arrayGroupObjects = [];
let arrayTasks = [];
let id = 0;
input_data_task.valueAsDate = new Date();

//-------------class CreateGroup ----------------------
class Group {
    TaskList = [];
    Name_group;
    id_group;

    constructor(id) {
        this.id_group = id;
    }

    createGroup(Name_group) {
        this.Name_group = Name_group;
        this.div_group = document.createElement("div");
        this.div_group_h3 = document.createElement("h3");
        this.div_group_list_task = document.createElement("div");
        this.div = document.createElement("div");
        this.div_group_p = document.createElement("p");


        this.div_group.classList.add("groupTask");
        this.div_group_h3.textContent = Name_group;
        this.div_group_p.textContent = "Не має задач";
        this.div_group_list_task.classList.add("task_list");
        this.div_group_list_task.setAttribute("task_list_id", this.id_group);
        this.div_group_list_task.append(this.div_group_p);


        this.div_group.append(this.div_group_h3);
        this.div_group.append(this.div_group_list_task);
        this.div.append(this.div_group);
        this.div.Myname = Name_group;

        arrayGroupObjects.push(this); // заполняем массив созданными классами
        arrayGroup.push(Name_group);
        localStorage.setItem("arrayGroup", JSON.stringify(arrayGroup));
        return this.div;
    }

    //---------addTask------------------
    addTask(id_group, input_value, memo_value, type_task, prioritet_task, data_task, id, flag) {
        let obj_task = {
            id_group: id_group,
            id_task: id,
            input_value: input_value,
            memo_value: memo_value,
            type_task: type_task,
            prior_task: prioritet_task,
            data_task: data_task,
            dd: 1
        }
        arrayTasks.push(obj_task);
        if (flag == 1)
            localStorage.setItem("arrayTasks", JSON.stringify(arrayTasks));
        this.id = id;
        this.id_group = id_group;
        this.div_group_p.hidden = true;
        this.div_task = document.createElement("div");
        this.div_task_header = document.createElement("header");
        this.div_task_rigth = document.createElement("div");
        this.div_task_left = document.createElement("div");
        this.div_task_memo = document.createElement("div");
        this.div_footer_task = document.createElement("div");

        this.p_data_task = document.createElement("p");
        this.p_data_task.innerHTML = `<b>Строк виконання: </b>`;
        this.p_data_task.classList.add("p_data_task");

        this.input_data_task = document.createElement("input");
        this.input_data_task.setAttribute("data_id_task", this.id);
        this.input_data_task.setAttribute("type", "date");
        this.input_data_task.setAttribute("value", `${data_task}`);

        this.btn_save = document.createElement("button");
        this.btn_save.addEventListener("click", function(e){
            update_task(e.target.parentElement.parentElement.id);
        })
        this.btn_save.classList.add("btn_save");
        this.btn_save.classList.add("btn_save_off");
        this.btn_save.innerText = "Save";
        this.btn_save.setAttribute("save_id_task", this.id);

//<input type = "date" id_task = "${this.id}" class="input_data_task" value="${data_task}">`;
        this.input_data_task.classList.add("input_data_task");
        this.input_data_task.addEventListener("change",function (e){
            //update_task(e.target.parentElement.parentElement.id);
            console.log(e.target.parentElement.parentElement.id)
           let btn_save = document.querySelector(`[save_id_task=${e.target.parentElement.parentElement.id}]`) ;
           btn_save.classList.remove("btn_save_off");
        });



        this.div_footer_task.classList.add("div_footer_task");

//prioritet
        this.div_task_prioritet = document.createElement("div");
        switch (prioritet_task) {
            case "Hight": {
                this.div_task_prioritet.classList.add("div_Hight_prioritet");
                break;
            }
            case "Medium": {
                this.div_task_prioritet.classList.add("div_Medium_prioritet");
                break;
            }
            case "Low": {
                this.div_task_prioritet.classList.add("div_Low_prioritet");
                break;
            }
        }
        this.div_task_prioritet.textContent = prioritet_task;

        this.p_task = document.createElement("span");

        this.btn_del_task = document.createElement("button");
        this.btn_del_task.textContent = 'X';
        this.btn_del_task.classList.add("btn_del_task");
        this.btn_del_task.setAttribute("id_task", this.id);

        this.div_task.classList.add("div_task");
        this.div_task_header.classList.add("header_task");
        this.div_task_memo.classList.add("memo_task");
        //this.div_task_memo.innerHTML = `<input type="text" value="${input_value}" class="input_task_memo_b" input_task_id="${this.id}" >`;
        this.input_task_memo_b = document.createElement("input");
        this.input_task_memo_b.setAttribute("input_task_id", this.id);
        this.input_task_memo_b.setAttribute("type", "text");
        this.input_task_memo_b.setAttribute("value", `${input_value}`);

//<input type = "date" id_task = "${this.id}" class="input_data_task" value="${data_task}">`;
        this.input_task_memo_b.classList.add("input_task_memo_b");
        this.input_task_memo_b.addEventListener("change",function (e){
           // update_task(e.target.parentElement.parentElement.id);
            let btn_save = document.querySelector(`[save_id_task=${e.target.parentElement.parentElement.id}]`) ;
            btn_save.classList.remove("btn_save_off");
        });
        this.textarea = document.createElement("textarea");
        this.textarea.setAttribute("text_id_task", this.id);
        this.textarea.addEventListener("change",function (e){
            // console.log(e.target);
            // update_task(e.target.parentElement.parentElement.id);
            let btn_save = document.querySelector(`[save_id_task=${e.target.parentElement.parentElement.id}]`) ;
            btn_save.classList.remove("btn_save_off");
        });

        this.textarea.classList.add("input_task_area");
        this.textarea.value = memo_value;

        this.p_task.textContent = 'Задача #' + (this.id);
        // btn_del click
        this.btn_del_task.addEventListener("click", function (e) {
            arrayGroupObjects.forEach(obj=>{
              if (obj.id_group == id_group) { obj.DEL_TASK(e.target.getAttribute("id_task"));}
            })
           //[arrayGroupObjects.indexOf(`id_group="${id_group}"`)].DEL_TASK(e.target.getAttribute("id_task"));
            arrayTasks.forEach(a=>{
                if (a.id_group == id_group) {arrayTasks.splice(a.index, 1);}
            })
            arrayTasks.splice(id_group, 1);
        })
        //-------------------------------


        //---------------------------------
        this.p_data_task.append(this.input_data_task);
        this.div_task_memo.append(this.input_task_memo_b);
        this.div_task_memo.append(this.textarea);
        this.p_task.append(this.btn_del_task);
        this.div_task_left.append(this.p_task)
        this.div_task_rigth.append(this.btn_del_task);

        this.div_task_header.append(this.div_task_left);
        this.div_task_header.append(this.div_task_rigth);


        this.div_task.append(this.div_task_header);
        this.div_task.append(this.div_task_memo);
        this.div_task.append(this.p_data_task);
        this.div_footer_task.append(this.div_task_prioritet);
        this.div_footer_task.append(this.btn_save);
        // this.div_footer_task.append(this.div_btn_edit);
        this.div_task.append(this.div_footer_task);
        this.div_task.setAttribute("id", id);

        return this.div_task;
    }

    DEL_TASK(id_task) {
        // console.log(id_task)
        let div_task_array = document.querySelector(`[id="${id_task}"]`);
        div_task_array.remove();
        //  console.log(this.TaskList);
        //  console.log(arrayTasks);

        this.TaskList.splice(this.TaskList.indexOf(`id=${id_task}`), 1);
        //  console.log(arrayTasks);
        // console.log(arrayTasks.indexOf(`id_task =${id_task}`))
        arrayTasks.splice(arrayTasks.indexOf(`id_task = ${id_task}`), 1);
        if (this.TaskList.length == 0) {
            this.div_group_p.hidden = false;
        } else {
            this.div_group_p.hidden = true;
        }

        localStorage.setItem("arrayTasks", JSON.stringify(arrayTasks));

    }
}
//----------создаем группы задач на странице---------------
let arrayLoad =[];
let storage  = JSON.parse(localStorage.getItem("arrayGroup")) || [];
if (storage.length == 0) {arrayLoad = StartGroups } else{ arrayLoad = storage};

for (let index = 0; index < arrayLoad.length; index++) {
    const element = arrayLoad[index];
    let newGroup = new Group(element);
    arrayGroupObjects.push(newGroup); // заполняем массив созданными классами
    let main_screen = document.querySelector(".main_screeen");
    main_screen.insertAdjacentElement("beforeend", newGroup.createGroup(element));
    //----------
    let List_type = document.querySelector(".list_type_task");
    let opt = document.createElement("option");
    opt.textContent = element;
    List_type.append(opt);

    // создаем массив классов с групами тасков
//---грузим Таски из памяти
    arrayTasks = JSON.parse(localStorage.getItem("arrayTasks")) || [];
    if (arrayTasks) {
        arrayTasks.forEach(task => {

            if (task.id_group == element) {
                let div_task = newGroup.addTask(newGroup.id_group, task.input_value, task.memo_value, task.type_task, task.prior_task, task.data_task, task.id_task, 0);

                let task_list = document.querySelector(`[task_list_id="${task.id_group}"]`, ".task_list");
                task_list.insertAdjacentElement("beforeend", div_task);
            }
        })
    }
}

//----------------btnADDTASK------------------------------
id = JSON.parse(localStorage.getItem("id_task")) || [];
btn_add_task.addEventListener("click", function () {

  // console.log(arrayGroupObjects);
   let class_group;
   arrayGroupObjects.forEach( group =>{
      if (group.Name_group == type_task.value) {
         class_group =  group;  // нашли в какую группу добавлять
       //  console.log(class_group);
      }
   })

    if (!id) {id=0};
   id++;
   localStorage.setItem("id_task", JSON.stringify(id));
   let div_task = class_group.addTask(class_group.id_group, input.value, memo.value, type_task.value, prioritet_task.value,input_data_task.value, id,1);
   class_group.TaskList.push(div_task);
   input.value = '';
   memo.value = '';
   let task_list = document.querySelector(`[task_list_id="${class_group.id_group}"]`, ".task_list") ;
    task_list.insertAdjacentElement("beforeend", div_task);


})

let btn_add_group = document.querySelector(".btn_add_group");

btn_add_group.addEventListener("click", function(e){ 
   let input_group = document.querySelector(".input_group");   
   let newGroup = new Group(input_group.value);
   let main_screen = document.querySelector(".main_screeen");  
   main_screen.insertAdjacentElement("beforeend", newGroup.createGroup(input_group.value)); 
   arrayGroupObjects.push(newGroup); // заполняем массив созданными классами

   let List_type = document.querySelector(".list_type_task");
   let opt = document.createElement("option");
   opt.textContent = input_group.value;
   List_type.append(opt);
  //  arrayGroup.push(input_group.value);
   input_group.value = '';

})

