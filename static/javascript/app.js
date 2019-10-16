const frm = document.querySelector('#contactForm');
let messagePara =document.querySelector('#resp');
function formHandler(e){
    e.preventDefault();

    let data = {
        name: document.querySelector('input[name=name]').value,
        email:document.querySelector('input[name=email]').value,
        mobile:document.querySelector('input[name=mobile]').value,
        description:document.querySelector('#desc').value
    }
     console.log(data)
    fetch('/contact',{
        method:'POST',
        headers:{
            'content-Type':'application/json'
        },
        body:JSON.stringify(data)
        }).then(resp => resp.json())
            .then(dt =>{
                console.log(dt.message)
                messagePara.innerText = dt.message;
                messagePara.style.color='white';
                messagePara.style.backgroundColor ='green';
               
            }).catch(err =>{

                messagePara.innerText = err.message;
                messagePara.style.backgroundColor ='red';
                // console.log('ERROR',err);
            })

    // console.log(data);
    // console.log("form working");
}



frm.addEventListener('submit', formHandler);