const nameInput = document.querySelector(".Name input");
const phoneInput = document.querySelector(".Phone-Number input");
const emailInput = document.querySelector(".Ema input");
const subjectInput = document.querySelector(".subject input");
const messageInput = document.getElementById("Massage");

const sendBtn = document.getElementById("send");
const cancelBtn = document.getElementById("cencel");

function showError(inputElement, message) {
    let oldError = inputElement.parentElement.querySelector(".error");


    if (oldError) oldError.remove();

    if (message !== "") {
        let error = document.createElement("div");
        error.className = "error";
        error.style.color = "red";
        error.style.fontSize = "14px";
        error.style.marginTop = "5px";
        error.textContent = message;
        inputElement.parentElement.appendChild(error);
    }
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

sendBtn.addEventListener("click", function () {
    let valid = true;

    // Name
    if (nameInput.value.trim() === "") {
        showError(nameInput, "Please enter your name.");
        valid = false;
    } else showError(nameInput, "");

    // Phone
    if (phoneInput.value.trim() === "") {
        showError(phoneInput, "Phone number is required.");
        valid = false;
    } else showError(phoneInput, "");

    // Email
    if (emailInput.value.trim() === "") {
        showError(emailInput, "Email is required.");
        valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, "Invalid email format.");
        valid = false;
    } else showError(emailInput, "");

    // Subject
    if (subjectInput.value.trim() === "") {
        showError(subjectInput, "Please enter a subject.");
        valid = false;
    } else showError(subjectInput, "");

    // Message
    if (messageInput.value.trim() === "") {
        showError(messageInput, "Please write a message.");
        valid = false;
    } else showError(messageInput, "");

    if (valid) {
        alert("Your message has been sent successfully! ✔");


        console.log({
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        });

    
        nameInput.value = "";
        phoneInput.value = "";
        emailInput.value = "";
        subjectInput.value = "";
        messageInput.value = "";
    }
});

// ====== Cancel Button ======
cancelBtn.addEventListener("click", function () {
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    subjectInput.value = "";
    messageInput.value = "";

    document.querySelectorAll(".error").forEach(err => err.remove());
});