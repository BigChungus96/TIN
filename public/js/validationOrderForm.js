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

    const reqMessage=document.getElementById('errorMessage-required').innerText;
    const checkDateMessage=document.getElementById('errorMessage-checkDate').innerText;
    const checkDateIfAfterMessage=document.getElementById('errorMessage-checkDateIfAfter').innerText;
    const checkNumberMessage=document.getElementById('errorMessage-checkNumber').innerText;
    const numberRangeMessage=document.getElementById('errorMessage-numberRange').innerText;
    const sumMessage=document.getElementById('errorMessage-sumMessage').innerText;
    const dateDate=document.getElementById('errorMessage-dateDate').innerText;




    resetErrors([customerInput,carInput,dateFromInput,dateToInput,priceInput],
        [errorCustomer,errorCar,errorDateFrom,errorDateTo,errorPrice],errorsSummary);

    let valid=true;
//customer
    if(!checkRequired(customerInput.value)){
        valid=false;
        customerInput.classList.add("error-input");
        errorCustomer.innerText=reqMessage;
    }
//car
    if(!checkRequired(carInput.value)){
        valid=false;
        carInput.classList.add("error-input");
        errorCar.innerText=reqMessage;
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
        errorDateFrom.innerText=reqMessage;
    }else if(!checkDate(dateFromInput.value)){
        valid=false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText=checkDateMessage;
    }else if(checkDateIfAfter(dateFromInput.value,nowString)){
        valid=false;
        dateFromInput.classList.add("error-input");
        errorDateFrom.innerText=checkDateIfAfterMessage;
    }
//dateTo
    if(!checkRequired(dateToInput.value)){
        valid=false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText=reqMessage;
    }else if(!checkDate(dateToInput.value)){
        valid=false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText=checkDateMessage;
    }else if(checkRequired(dateToInput.value)&&checkDate(dateToInput.value)
                &&!checkDateIfAfter(dateToInput.value,dateFromInput.value)){
        valid=false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText=dateDate;
}
//price
    if(!checkRequired(priceInput.value)){
        valid=false;
        priceInput.classList.add("error-input");
        errorPrice.innerText=reqMessage;
    }else if(!checkNumber(priceInput.value)){
        valid=false;
        priceInput.classList.add("error-input");
        errorPrice.innerText=checkNumberMessage;
    }else if(!checkNumberRange(priceInput.value,0,999_999)){
        valid=false;
        priceInput.classList.add("error-input");
        errorPrice.innerText=numberRangeMessage;
    }

    if(!valid){
        errorsSummary.innerText=sumMessage;
    }
    return valid;
}