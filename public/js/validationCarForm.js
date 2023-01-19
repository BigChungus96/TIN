function validateForm(){
    const carBrandInput=document.getElementById('carBrand');
    const carModelInput=document.getElementById('carModel');
    const yearInput=document.getElementById('year');

    const errorCarBrand=document.getElementById('errorCarBrand');
    const errorCarModel=document.getElementById('errorCarModel');
    const errorYear=document.getElementById('errorYear');
    const errorsSummary=document.getElementById('errorsSummary');

    const reqMessage=document.getElementById('errorMessage-required').innerText;
    const checkTextLengthRangeMessage=document.getElementById('errorMessage-checkTextLengthRange').innerText;
    const checkYearRangeMessage=document.getElementById('errorMessage-checkYearRange').innerText;
    const checkNumberMessage=document.getElementById('errorMessage-checkNumber').innerText;
    const negativeMessage=document.getElementById('errorMessage-checkNegative').innerText;
    const sumMessage=document.getElementById('errorMessage-sumMessage').innerText;


    resetErrors([carBrandInput, carModelInput, yearInput],[errorCarBrand,errorCarModel,errorYear],errorsSummary);

    let valid=true;
//brand
    if(!checkRequired(carBrandInput.value)){
        valid=false;
        carBrandInput.classList.add("error-input");
        errorCarBrand.innerText=reqMessage;
    }else if(!checkTextLengthRange(carBrandInput.value,2,60)){
        valid=false;
        carBrandInput.classList.add("error-input");
        errorCarBrand.innerText=checkTextLengthRangeMessage;
    }
//model
    if(!checkRequired(carModelInput.value)){
        valid=false;
        carModelInput.classList.add("error-input");
        errorCarModel.innerText=reqMessage;
    }else if(!checkTextLengthRange(carModelInput.value,2,60)){
        valid=false;
        carModelInput.classList.add("error-input");
        errorCarModel.innerText=checkTextLengthRangeMessage;
    }
//year yearInput.value.length!==0
console.log(yearInput.value)

        if (!checkNumber(yearInput.value)) {
            valid = false;
            yearInput.classList.add("error-input");
            errorYear.innerText = checkNumberMessage;
        }
        else if (!checkTextLengthRange(yearInput.value, 4, 4)) {
            valid = false;
            yearInput.classList.add("error-input");
            errorYear.innerText = checkYearRangeMessage;
        }
        if(yearInput.value<0){
            valid=false;
            yearInput.classList.add("error-input");
            errorYear.innerText = negativeMessage;
        }

    if(!valid){
        errorsSummary.innerText=sumMessage;
    }
    return valid;
}