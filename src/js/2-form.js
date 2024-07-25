import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = form.querySelector('input[name="email"]');
const message = form.querySelector('textarea[name="message"]');

const FEEDBACK_FORM_KEY = 'feedback-form-state';

let formData = {
  email: "",
  message: ""
};

const fillFormFields = () => {
  try {
    const savedData = localStorage.getItem(FEEDBACK_FORM_KEY);
    if (savedData) {
      formData = JSON.parse(savedData);
      email.value = formData.email || '';
      message.value = formData.message || '';
    }
  } catch (error) {
    console.error('Error loading form data:', error);
  }
};

const onFormInput = throttle(event => {
  const fieldName = event.target.name;
  const fieldValue = event.target.value.trim();

  formData[fieldName] = fieldValue;
  localStorage.setItem(FEEDBACK_FORM_KEY, JSON.stringify(formData));
}, 500);

const onSubmit = event => {
  event.preventDefault();
  
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();

  if (emailValue === '' || messageValue === '') {
    alert('Fill please all fields.');
    return;
  }

  console.log('Form Data:', {
    email: emailValue,
    message: messageValue
  });

  localStorage.removeItem(FEEDBACK_FORM_KEY);
  form.reset();
  formData = { email: "", message: "" };
};

fillFormFields();

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onSubmit);