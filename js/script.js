const form = document.getElementById("contactForm");
const successToast = document.getElementById("successToast");

const fields = {
  fullName: document.getElementById("fullName"),
  email: document.getElementById("email"),
  subject: document.getElementById("subject"),
  message: document.getElementById("message")
};

const errors = {
  fullName: document.getElementById("nameError"),
  email: document.getElementById("emailError"),
  subject: document.getElementById("subjectError"),
  message: document.getElementById("messageError")
};

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(email);
}

function validateField(field) {
  const value = field.value.trim();
  const name = field.name;
  let valid = true;
  let errorMessage = "";

  if (!value) {
    errorMessage = "This field is required.";
    valid = false;
  } else if (name === "email" && !isValidEmail(value)) {
    errorMessage = "Please enter a valid email address.";
    valid = false;
  }

  if (!valid) {
    field.setAttribute("aria-invalid", "true");
    errors[name].textContent = errorMessage;
  } else {
    field.removeAttribute("aria-invalid");
    errors[name].textContent = "";
  }

  return valid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formValid = true;

  Object.values(fields).forEach((input) => {
    const valid = validateField(input);
    if (!valid && formValid) input.focus();
    formValid = formValid && valid;
  });

  if (formValid) {
    showSuccessToast();
    form.reset();
  }
});

Object.values(fields).forEach((input) => {
  input.addEventListener("input", () => validateField(input));
});

function showSuccessToast() {
  successToast.classList.add("show");
  setTimeout(() => successToast.classList.remove("show"), 3000);
}
