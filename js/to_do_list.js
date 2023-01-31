
let btn_add_task = document.querySelector(".btn_add_task");
let input = document.querySelector(".input_task");
let memo = document.querySelector(".add_memo_task");
let type_task = document.querySelector(".list_type_task");
let prioritet_task = document.querySelector(".list_prioritet_task");

let div_backlog = document.querySelector(".task_list_backlog");
let div_inWork = document.querySelector(".task_list_work");
let div_testing = document.querySelector(".task_list_test");
let div_done = document.querySelector(".task_list_done");

let arrayGroup = ['Черга','В роботі','Тестування','Виконано'];
let arrayGroupObjects = [];
//-------------class CreateGroup ----------------------
class Group {
   TaskList = [];
   Name_group;
   id_group;
   constructor (id){
    this.id_group = id;
   }
   createGroup (Name_group){
    this.Name_group = Name_group;
   this.div_group = document.createElement("div");
   this.div_group_h3 = document.createElement("h3");
   this.div_group_list_task = document.createElement("div");
   this.div = document.createElement("div");
   this.div_group_p = document.createElement("p");
   this.div_group_btn_add = document.createElement("input");
   this.div_group_btn_add.setAttribute("type","button") ;
   this.div_group_btn_add.setAttribute("value","Додати задачу") ;
   this.div_group_btn_add.classList.add("btn_add_task") ;

   
   this.div_group.classList.add("groupTask");
   this.div_group_h3.textContent = Name_group;
   this.div_group_p.textContent = "Не має задач";
   this.div_group_list_task.classList.add("task_list");
   this.div_group_list_task.append(this.div_group_p);
   this.div_group_list_task.append(this.div_group_btn_add);

   this.div_group.append(this.div_group_h3) ;  
   this.div_group.append(this.div_group_list_task) 
   this.div.append(this.div_group); 
   this.div.Myname =  Name_group;
   this.div.setAttribute("id",this.id_group);
   return this.div;
   }
   //---------addTask------------------
   addTask(input_value, memo_value, type_task, prioritet_task)
    {
      this.div_task = document.createElement("div");
      this.div_task_header = document.createElement("header");
      this.div_task_rigth = document.createElement("div");
      this.div_task_left = document.createElement("div");
      this.div_task_memo = document.createElement("div");
      //prioritet
     // console.log(prioritet_task);
      this.div_task_prioritet = document.createElement("div");
       switch (prioritet_task){
         case "Hight": {this.div_task_prioritet.classList.add("div_Hight_prioritet"); break;}
         case "Medium": {this.div_task_prioritet.classList.add("div_Medium_prioritet"); break;}
         case "Low": {this.div_task_prioritet.classList.add("div_Low_prioritet"); break;}
       }
       this.div_task_prioritet.textContent = prioritet_task;

      this.p_task = document.createElement("span");
      this.btn_del_task = document.createElement("button");
      this.btn_del_task.textContent = 'X';

      this.btn_del_task.classList.add("btn_del_task");
      this.div_task.classList.add("div_task");
      this.div_task_header.classList.add("header_task");
      this.div_task_memo.classList.add("memo_task")
      this.div_task_memo.textContent = memo_value;
      this.p_task.textContent = input_value;
      // btn_del click
      this.btn_del_task.addEventListener("click", function (e) {
         this.parentElement.parentElement.parentElement.remove();
        
           })
      //---------------------------------
      this.p_task.append(this.btn_del_task);
      this.div_task_left.append(this.p_task)
      this.div_task_rigth.append(this.btn_del_task);
      
      this.div_task_header.append(this.div_task_left);
      this.div_task_header.append(this.div_task_rigth);
      this.div_task.append(this.div_task_header);
      this.div_task.append(this.div_task_memo);
      this.div_task.append(this.div_task_prioritet);
      this.TaskList.push(this.div_task);
     
      return this.div_task;
     }    

    //-------проверяем на количество задач списке - если ноль то показывем  <p>Не має задач</p>
   cntTask(){
     return  this.TaskList.length;
     
   }
}
//----------создаем группы задач на странице---------------
for (let index = 0; index < arrayGroup.length; index++) {
   const element = arrayGroup[index];   
   let newGroup = new Group(index);
  
   let main_screen = document.querySelector(".main_screeen");  
    main_screen.insertAdjacentElement("beforeend", newGroup.createGroup(element)); 
    // создаем массив классов с групами тасков
    arrayGroupObjects.push(newGroup); // заполняем массив созданными классами
}
//----------------btnADDTASK------------------------------

btn_add_task.addEventListener("click", function () {
   
  // console.log(arrayGroupObjects);
   let class_group;
   arrayGroupObjects.forEach( group =>{
      if (group.Name_group == type_task.value) {
         class_group =  group;  // нашли в какую группу добавлять 
       //  console.log(class_group);
      }
   })  

   let div_task = class_group.addTask(input.value, memo.value, type_task.value, prioritet_task.value);
   //let div_task = new NewDiv(input.value, memo.value, type_task.value, prioritet_task.value);
   input.value = '';
   memo.value = '';  

   //находим все Н3
   let arrayH3 = document.querySelectorAll("h3");
   //в цикле из массива Н3 находим все с нужным Название группы и добавляем таск
   arrayH3.forEach(h3 =>{
      if (h3.innerHTML == type_task.value){
         //находим TaskList
         h3.nextElementSibling.insertAdjacentElement("beforebegin", div_task);      
      }
   }) 
   //проверяем количество тасков и убираем/добавляем  <p>Не має задач</p>
   let cnt =  class_group.cntTask();
   console.log(cnt); 
   let div = document.querySelectorAll("[id]");//.dataset.value(class_group.id_group);
   div.forEach(e=> {
      if (e.Myname == type_task.value ){
         div = e;
      }
   })
   console.log( document.querySelector(div.Myname, "p"));
   if (cnt == 0) {

     // div_group_p.hidden = false;
   } else {/*  div_group_p.hidden = true; */ }
   /* div_task.cntTask(type_task.value); */
})
///-------------------------------------------------------------
class NewDiv {
   constructor(input_value, memo_value, type_task, prioritet_task) {
      this.div_task = document.createElement("div");
      this.div_task_header = document.createElement("header");
      this.div_task_rigth = document.createElement("div");
      this.div_task_left = document.createElement("div");
      this.div_task_memo = document.createElement("div");
      //prioritet
     // console.log(prioritet_task);
      this.div_task_prioritet = document.createElement("div");
       switch (prioritet_task){
         case "Hight": {this.div_task_prioritet.classList.add("div_Hight_prioritet"); break;}
         case "Medium": {this.div_task_prioritet.classList.add("div_Medium_prioritet"); break;}
         case "Low": {this.div_task_prioritet.classList.add("div_Low_prioritet"); break;}
       }
       this.div_task_prioritet.textContent = prioritet_task;

      this.p_task = document.createElement("span");
      this.btn_del_task = document.createElement("button");
      this.btn_del_task.textContent = 'X';
       


      this.btn_del_task.classList.add("btn_del_task");
      this.div_task.classList.add("div_task");
      this.div_task_header.classList.add("header_task");
      this.div_task_memo.classList.add("memo_task")
      this.div_task_memo.textContent = memo_value;
      this.p_task.textContent = input_value;
      // btn_del click
      this.btn_del_task.addEventListener("click", function (e) {
         this.parentElement.parentElement.parentElement.remove();
        
           })
      //---------------------------------
      this.p_task.append(this.btn_del_task);
      this.div_task_left.append(this.p_task)
      this.div_task_rigth.append(this.btn_del_task);
      
      this.div_task_header.append(this.div_task_left);
      this.div_task_header.append(this.div_task_rigth);
      this.div_task.append(this.div_task_header);
      this.div_task.append(this.div_task_memo);
      this.div_task.append(this.div_task_prioritet);
    //----- *************-перетягивание мышкой ***********
      this.div_task.addEventListener("mousedown", function (e){
         this.move = true;
         this.offsetY = e.offsetY;
         this.offsetX = e.offsetX;
            });
     
      this.div_task.addEventListener ("mousemove", function (e){
         if (this.move) {
            this.div_task.top = e.clientY - offsetY - 20 +"px"; 
            this.div_task.left = e.clientX - offsetX +"px"; 
              }
         })

         this.div_task.addEventListener ("mouseup", function (e){
             this.move = false;
         })
     } // end constructor     
   get getDiv() {
      return this.div_task;
   }

   //-------проверяем на количество задач списке - если ноль то показывем  <p>Не має задач</p>
   cntTask(type_task) {
      switch (type_task) {
         case "Черга": {
            this.cnt = document.querySelectorAll(".backlog .div_task").length;
            this.p_null = document.querySelector(".task_list_backlog p"); break;
         }
         case "В роботі": {
            this.cnt = document.querySelectorAll(".inWork .div_task").length;
            this.p_null = document.querySelector(".task_list_work p"); break;
         }
         case "Тестування": {
            this.cnt = document.querySelectorAll(".testing .div_task").length;
            this.p_null = document.querySelector(".task_list_test p"); break;
         }
         case "Виконано": {
            this.cnt = document.querySelectorAll(".done .div_task").length;
            this.p_null = document.querySelector(".task_list_done p"); break;
         }

      }
      if (this.cnt == 0) {
         this.p_null.hidden = false;
      } else { this.p_null.hidden = true; }
   }
}