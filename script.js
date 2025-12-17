const form = document.getElementById("intakeForm");
const serviceSelect = document.getElementById("serviceType");
const dynamicQuestionsDiv = document.getElementById("dynamicQuestions");
const statusDiv = document.getElementById("status");

// 🔒 LOCKED Apps Script Web App URL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwEhCHRyKY_ltuZ5O9GxvodjCvdQl7KpUUVPFyc-NTs2H_Smci0HZx2Keykb_lN0uF6/exec";

// ⭐ Service-specific questions (LOCKED)
const QUESTIONS = {
  "Cash Offer": [
    "How soon are you looking to sell?",
    "Is the property currently occupied?",
    "Do you have a mortgage balance?",
    "What is the general condition of the property?"
  ],
  "Creative Finance": [
    "Are you open to seller financing?",
    "Do you have a current mortgage?",
    "What monthly payment would you accept?",
    "Are you open to a hybrid offer?"
  ],
  "Surplus Funds": [
    "Are you the former owner?",
    "Was anyone else on the title?",
    "Have you received letters about surplus funds?",
    "Have you already filed a claim?",
    "Are you working with an attorney?"
  ],
  "Probate": [
    "Has probate been opened?",
    "Do you have the death certificate?",
    "Are you the personal representative?",
    "Is there a will?",
    "Are there other heirs?"
  ],
  "Mortgage Takeover": [
    "Are you behind on payments?",
    "How many months behind?",
    "What is your current mortgage payment?",
    "Are you open to someone taking over payments?",
    "Are you in bankruptcy?"
  ]
};

// Show/hide and build dynamic questions
serviceSelect.addEventListener("change", () => {
  const selectedService = serviceSelect.value;
  dynamicQuestionsDiv.innerHTML = "";

  if (!QUESTIONS[selectedService]) {
    return;
  }

  QUESTIONS[selectedService].forEach((question, index) => {
    const label = document.createElement("label");
    label.textContent = question;

    const input = document.createElement("input");
    input.type = "text";
    input.name = `q${index + 1}`;

    dynamicQuestionsDiv.appendChild(label);
    dynamicQuestionsDiv.appendChild(input);
  });
});

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  statusDiv.textContent = "Submitting...";

  fetch(WEB_APP_URL, {
  method: "POST",
  mode: "no-cors",
  body: new FormData(form)
});

statusDiv.textContent = "✅ Case submitted successfully.";
form.reset();
dynamicQuestionsDiv.innerHTML = "";
});

