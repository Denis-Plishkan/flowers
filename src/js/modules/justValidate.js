
import JustValidate from 'just-validate'; 
 
function justValidateRecomendation() { 
  const validateForm = document.querySelector('#recomendationForm'); 
 
  if (validateForm) { 
    const validate = new JustValidate('#recomendationForm'); 
 
    validate 
      .addField('#recomendationName', [ 
        { 
          rule: 'minLength', 
          value: 3, 
        }, 
        { 
          rule: 'maxLength', 
          value: 30, 
        }, 
      ]) 
      .addField('#recomendationText', [ 
        { 
          rule: 'minLength', 
          value: 3, 
        }, 
        { 
          rule: 'maxLength', 
          value: 100, 
        }, 
      ]); 
  } 
} 
 
justValidateRecomendation(); 
 
function justValidateContacts() { 
  const validateForm = document.querySelector('#contactsForm'); 
 
  if (validateForm) { 
    const validate = new JustValidate('#contactsForm'); 
 
    validate 
      .addField('#contactsName', [ 
        { 
          rule: 'minLength', 
          value: 3, 
        }, 
        { 
          rule: 'maxLength', 
          value: 30, 
        }, 
      ]) 
      .addField('#contactsMail', [ 
        { 
          rule: 'required', 
          errorMessage: 'Email is required', 
        }, 
        { 
          rule: 'customRegexp', 
          value: /^[a-zA-Z0-9.-]+@[^\s@]+\.[\p{L}]{2,}$/u, 
        }, 
      ]) 
      .addField('#contactsText', [ 
        { 
          rule: 'minLength', 
          value: 3, 
        }, 
        { 
          rule: 'maxLength', 
          value: 100, 
        }, 
      ]); 
  } 
} 
 
justValidateContacts();