function validateForm(){
    const customerInput=document.getElementById('customer_id');
    const carInput=document.getElementById('car_id');
    const dateFromInput=document.getElementById('dateFrom');
    const dateToInput=document.getElementById('dateTo');
    const priceInput=document.getElementById('price');

    const errorCustomer=document.getElementById('errorCustomer');
    const errorCar=document.getElementById('errorCar');
    const errorDateFrom=document.getElementById('errorDateFrom');
    const errorDateTo=document.getElementById('errorDateTo');
    const errorPrice=document.getElementById('errorPrice');
    const errorsSummary=document.getElementById('errorsSummary');

    resetErrors([customerInput,carInput,dateFromInput,dateToInput,priceInput],
        [errorCustomer,errorCar,errorDateFrom,errorDateTo,errorPrice],errorsSummary);

    let valid=true;
//customer
    if(!checkRequired(customerInput.value)){
        valid=false;
        customerInput.classList.add("error-input");
        errorCustomer.innerText="Pole jest wymagane";
    }
//car
    if(!checkRequired(carInput.value)){
        valid=false;
        carInput.classList.add("error-input");
        errorCar.innerText="Pole jest wymagane";
    }
//dateFrom
    let nowDate=new Date(),
        month=''+(nowDate.getMonth()+1),
        day=''+nowDate.getDate(),
        year=nowDate.getFullYear();
    if(month.length<2){
        month='0'+month;
    }
    if(day.length<2){
        day='0'+day
    }
    const nowString=[year,month,day].join('-');

    if(!checkRequired(dateFromInput.value)){
        valid=false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText="Pole jest wymagane";
    }else if(!checkDate(dateFromInput.value)){
        valid=false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText="Pole powinno zawierać datę w formacie yyyy-MM-dd"
    }else if(checkDateIfAfter(dateFromInput.value,nowString)){
        valid=false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText="Data nie może być z przyszłości";
    }
//dateTo
    if(!checkRequired(dateToInput.value)){
        valid=false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText="Pole jest wymagane";
    }else if(!checkDate(dateToInput.value)){
        valid=false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText="Pole powinno zawierać datę w formacie yyyy-MM-dd"
    }else if(checkRequired(dateToInput.value)&&checkDate(dateToInput.value)
                &&!checkDateIfAfter(dateToInput.value,dateFromInput.value)){
        valid=false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText="Data do powinna być poźniejsza niż data od";
}
//price
    if(!checkRequired(priceInput.value)){
        valid=false;
        priceInput.classList.add("error-input");
        errorPrice.innerText="Pole jest wymagane";
    }else if(!checkNumber(priceInput.value)){
        valid=false;
        priceInput.classList.add("error-input");
        errorPrice.innerText="Pole powinno być liczbą";
    }else if(!checkNumberRange(priceInput.value,0,999_999)){
        valid=false;
        priceInput.classList.add("error-input");
        errorPrice.innerText="Pole powinno być liczbą w zakresie od 0 do 999.999"
    }

    if(!valid){
        errorsSummary.innerText="Formularz zawiera błędy";
    }
    return valid;
}