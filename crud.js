//get total
//create product
//save in the local storage
//clear inputs 
//read
//count
//delete
//update
//search
//clean data 
//1 enadi lel inputs 
let title=document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let disc = document.getElementById('discount')
let total = document.getElementById("totale")
let count=document.getElementById('count')
let category = document.getElementById('category');
let mood="create";
let j ;
// Get total
function gettotal() {
   if (price.value!== '') {
     let result = +price.value + +taxes.value + +ads.value - +discount.value;
     total.innerHTML = result;
     total.style.background = '#004000';
   } else {
     total.innerHTML = '';
     total.style.background = '#a00d02';
     document.getElementById('price').nextSibling.textContent = 'Please fill the price';
   }
 }
 
 // Create product
 let datapro;
 if (localStorage.product) {
   datapro = JSON.parse(localStorage.product);
 } else {
   datapro = [];
 }
 
 
 document.getElementById('button').onclick = function() {
   let newpro = {
     title: title.value,
     price: price.value,
     taxes: taxes.value,
     ads: ads.value,
     discount: disc.value,
     total: total.innerHTML,
     count: count.value,
     category: category.value,
   };
   if(mood==="create"){
    if (count.value > 0) {
     for (let j = 0; j < count.value; j++) {
       datapro.push(newpro);
     }
    }
   }
  else{ 
    datapro [j]=newpro ; 
    mood='create';
    document.getElementById('button').innerHTML='create'
    count.style.display='none'



  } 
   
   localStorage.setItem('product', JSON.stringify(datapro));
   cleardata();
   showdata();
 };
 
 // Clear inputs
 function cleardata() {
   title.value = '';
   price.value = '';
   taxes.value = '';
   ads.value = '';
   discount.value = '';
   total.innerHTML = '';
   count.value = '';
   category.value = '';
 }
 
 // Read
 let table = '';
 function showdata() {
   table = '';
   for (let i = 0; i < datapro.length; i++) {
     table += `
       <tr>
         <td>${i}</td>
         <td>${datapro[i].title}</td>
         <td>${datapro[i].price}</td>
         <td>${datapro[i].taxes}</td>
         <td>${datapro[i].ads}</td>
         <td>${datapro[i].discount}</td>
         <td>${datapro[i].total}</td>
         <td>${datapro[i].category}</td>
         <td><button onclick="update(${i})" id="update">update</button></td>
         <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
       </tr>
     `;
   }
   let deleteall = document.getElementById('deleteall');
   document.getElementById('tbody').innerHTML = table;
   if (datapro.length > 0) {
     deleteall.innerHTML = `<button onclick="deleteall()">DELETE ALL (${datapro.length})</button>`;
   } else {
     deleteall.innerHTML = '';
   }
 }
 
 // Delete function
 function deletedata(i) {
   datapro.splice(i, 1);
   localStorage.setItem('product', JSON.stringify(datapro));
   showdata();
 }
 
 function deleteall() {
   localStorage.clear();
   datapro.length = 0;
   showdata();
 }
 
 showdata();
//update 
function update(i){
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  gettotal();
  count.style.display = 'none';
  
  document.getElementById('button').innerHTML="update";
  mood="update";
  j=i ; 
  scroll({
    top:0,
    behavior:'smooth'
  })
   

  


}
//function search 
let searchmood = 'title';

function searchff(id) {
  let search = document.getElementById('search')
  
  if (id === 'searchtitle') {
    searchmood = 'title';
    document.getElementById('search').placeholder='search by title'
  } else {
    searchmood = 'category';
    document.getElementById('search').placeholder='search by category '
  }
  search.focus()
}
function searchdata(value){
  let table='';
  value = value.toLowerCase(); // convert search value to lowercase
  if(searchmood=='title'){
    for(let i=0;i<datapro.length;i++){
      if(datapro[i].title.toLowerCase().includes(value)){ // convert title to lowercase for case-insensitive search
        table += `
          <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="update(${i})" id="update">update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
          </tr>
        `;
      }
    }
  } else{
    for(let i=0;i<datapro.length;i++){
      if(datapro[i].category.toLowerCase().includes(value)){ // convert category to lowercase for case-insensitive search
        table += `
          <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="update(${i})" id="update">update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
          </tr>
        `;
      }
    }
  }
  document.getElementById('tbody').innerHTML = table;
}