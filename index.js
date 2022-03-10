const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
console.log(formSteps)

let currentStep = formSteps.findIndex( step => {
    /* Dentre as etapas do formulário, esse trecho irá buscar aquele que estiver "ativa"
    ,ou seja, aquele que está sendo exibido. Após isso, o resultado é guardado na variável
    "currentStep"*/
    return step.classList.contains("active")
})

if (currentStep < 0){
    currentStep = 0
    showCurrentStep()
}

multiStepForm.addEventListener('click', e => {
    const next = e.target.matches("[data-next]");
    const previous = e.target.matches("[data-previous]");
    let incrementor
    if(next){
        incrementor = 1
    }else if(previous){
        incrementor = -1
    }
    else{
        return
    }
    // if (incrementor == null) return


    const inputs = [...formSteps[currentStep].querySelectorAll("input")];

    /*Método "reportValidity()" exibe "reclamações" quando o usuário não preenche os campos 
    e clica no botão next*/
    const allValid = inputs.every(input => input.reportValidity());
    console.log("All inputs: " + inputs)
    console.log("All valid input fields: " + allValid)

    if (allValid){
        currentStep += incrementor
        showCurrentStep()
    }
        
   
})

formSteps.forEach(step =>{
    step.addEventListener("animationend", e =>{
        formSteps[currentStep].classList.remove("hide")
        e.target.classList.toggle("hide", !e.target.classList.contains("active"))
    })
})

function showCurrentStep(){
    formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep)
    })
}
