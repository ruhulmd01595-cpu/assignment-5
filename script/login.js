console.log('comming')
  

document.getElementById('btn-login').addEventListener('click', function(){
    const userInput = document.getElementById('user-input');
    const contactuser = userInput.value;
    console.log(contactuser)

    const pininput = document.getElementById('pin-input');
    const pin = pininput.value;
    console.log(pin)

    if(contactuser=='admin' & pin=='admin123'){
        alert('login succes')
         
        window.location.assign('/home.html')
    }
    else{
        alert('login faled')
        return;
    }
})