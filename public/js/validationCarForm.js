function validateForm(){
    const carBrandInput=document.getElementById('carBrand');
    const carModelInput=document.getElementById('carModel');
    const yearInput=document.getElementById('year');

    const errorCarBrand=document.getElementById('errorCarBrand');
    const errorCarModel=document.getElementById('errorCarModel');
    const errorYear=document.getElementById('errorYear');
    const errorsSummary=document.getElementById('errorsSummary');

    resetErrors([carBrandInput, carModelInput, yearInput],[errorCarBrand,errorCarModel,errorYear],errorsSummary);

    let valid=true;
//brand
    if(!checkRequired(carBrandInput.value)){
        valid=false;
        carBrandInput.classList.add("error-input");
        errorCarBrand.innerText="Pole jest wymagane";
    }else if(!checkTextLengthRange(carBrandInput.value,2,60)){
        valid=false;
        carBrandInput.classList.add("error-input");
        errorCarBrand.innerText="Pole powinno zawierać od 2 do 60 znaków";
    }
//model
    if(!checkRequired(carModelInput.value)){
        valid=false;
        carModelInput.classList.add("error-input");
        errorCarModel.innerText="Pole jest wymagane";
    }else if(!checkTextLengthRange(carModelInput.value,2,60)){
        valid=false;
        carModelInput.classList.add("error-input");
        errorCarModel.innerText="Pole powinno zawierać od 2 do 60 znaków";
    }
//year yearInput.value.length!==0
console.log(yearInput.value)

        if (!checkNumber(yearInput.value)) {
            valid = false;
            yearInput.classList.add("error-input");
            errorYear.innerText = "Pole powinno być liczbą";
        }
        else if (!checkTextLengthRange(yearInput.value, 4, 4)) {
            valid = false;
            yearInput.classList.add("error-input");
            errorYear.innerText = "Pole powinno byc 4-cyfrową liczbą";
        }
        if(yearInput.value<0){
            valid=false;
            yearInput.classList.add("error-input");
            errorYear.innerText = "Pole nie może być ujemne";
        }

    if(!valid){
        errorsSummary.innerText="Formularz zawiera błędy";
    }
    return valid;
}