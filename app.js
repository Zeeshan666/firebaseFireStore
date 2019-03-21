const cafelist = document.querySelector("#cafe-list")
const form = document.querySelector("#add-cafe-form")
const searchform = document.querySelector("#add-cafe")



 searchform.addEventListener('submit',(e)=>{

        const txt = document.getElementById('ser').value;
        e.preventDefault();
         alert(txt)
        //  db.collection("cafes").where('city','==',txt).orderBy('name').get().then(mydata=>{
        //     mydata.docs.map(mydata=>{
        //         // console.log(mydata.data())
        //        render(mydata)
        //     })
        // })

        db.collection('cafes').where('city','==',txt).onSnapshot(snapshot=>{
            let changes =snapshot.docChanges();
            changes.map(mydata=>{
                render(mydata.doc)

            })

        })
        })

 
//create element and render data


function render(mydata){
    let li = document.createElement('li')
    let name =document.createElement('span')
    let city =document.createElement('span')
    let cross = document.createElement('div')
  
    var btn = document.createElement("div");
    btn.textContent='u';
    btn.style.marginTop='50px'
  
    
    cross.textContent="x"
     li.setAttribute("data-id",mydata.id)
     name.textContent =mydata.data().name
     console.log(name)
     city.textContent =mydata.data().city
     console.log(city)
//del
     cross.addEventListener("click",(e)=>{
         e.stopPropagation();
         let id = e.target.parentElement.getAttribute("data-id");
         db.collection('cafes').doc(id).delete();
     })
     //update
     btn.addEventListener('click',(e)=>{
        e.stopPropagation();
        const update= document.getElementById('update').value;
        let id = e.target.parentElement.getAttribute("data-id");
        db.collection('cafes').doc(id).update({
            name:update
        })
        alert('update click'+id)
     })
     li.appendChild(btn);
     li.appendChild(name);
     li.appendChild(city);
     li.appendChild(cross);
     cafelist.appendChild(li)
     
}


///show data
// db.collection("cafes").orderBy('name').get().then(mydata=>{
//     mydata.docs.map(mydata=>{
//         // console.log(mydata.data())
//         render(mydata)
//     })
// })
//show real time data

db.collection('cafes').orderBy('name').onSnapshot(  snapshot=>{
    let changes = snapshot.docChanges();
    changes.map(mydata=>{
        if(mydata.type==='added'){
            render(mydata.doc)

        }else if(mydata.type=='removed'){
            let li = document.querySelector('[data-id='+ mydata.doc.id+ ']')
            cafelist.removeChild(li)
            

        }

    })

})

//add data
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    db.collection("cafes").add({
        name:form.name.value,
        city:form.city.value
    })
    form.name.value="",
    form.city.value=""
})


