import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('form.feedback-form');

const getValueFromStorage = () => {
  let value;
  try {
    value = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  } catch (e) {
    console.log('Error while parsing value', e.message);
    value = {};
  }

  return value;
};

const handleInput = event => {
  const { name, value } = event.target;
  const currentFormValue = getValueFromStorage();

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      ...currentFormValue,
      [name]: value,
    })
  );
};

(() => {
  const formValue = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (formValue) {
    const values = JSON.parse(formValue);
    form['email'].value = values.email || '';
    form['message'].value = values.message || '';
  }
})();

form.addEventListener('input', throttle(handleInput, 500));

form.addEventListener('submit', event => {
  event.preventDefault();
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({}));
  form.reset();
});
