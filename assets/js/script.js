// Assignment 03: CRUD application using JavaScript, localStorage, and DOM APIs.
const STORAGE_KEY = "records";
let records = loadFromStorage();
let editingId = null;

const recordForm = document.getElementById("a3-record-form");
const titleInput = document.getElementById("a3-record-title");
const categoryInput = document.getElementById("a3-record-category");
const priceInput = document.getElementById("a3-record-price");
const statusInput = document.getElementById("a3-record-status");
const descriptionInput = document.getElementById("a3-record-description");
const formError = document.getElementById("a3-form-error");
const formTitle = document.getElementById("a3-form-title");
const submitButton = document.getElementById("a3-submit-button");
const cancelEditButton = document.getElementById("a3-cancel-edit");
const searchInput = document.getElementById("a3-search");
const categoryFilter = document.getElementById("a3-category-filter");
const clearFiltersButton = document.getElementById("a3-clear-filters");
const recordList = document.getElementById("a3-record-list");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function saveToStorage() {
  localStorage.setItem("records", JSON.stringify(records));
}

function loadFromStorage() {
  return JSON.parse(localStorage.getItem("records")) || [];
}

function resetForm() {
  recordForm.reset();
  editingId = null;
  formTitle.textContent = "Add New Resource";
  submitButton.textContent = "Save Record";
  cancelEditButton.classList.add("hidden");
  formError.classList.add("hidden");
  formError.textContent = "";
}

function renderRecords() {
  const filteredRecords = searchRecords();
  const resultsText = document.getElementById("a3-results-count");

  resultsText.textContent = `Showing ${filteredRecords.length} of ${records.length} records`;

  if (!filteredRecords.length) {
    recordList.innerHTML = `
      <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
        <p class="text-lg font-semibold text-slate-700">No records found</p>
        <p class="mt-2 text-sm text-slate-500">Try a different search or add a new resource.</p>
      </div>
    `;
    return;
  }

  // map() builds each card using the filtered list.
  recordList.innerHTML = filteredRecords.map((record) => `
    <article class="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">${escapeHtml(record.category)}</p>
          <h4 class="mt-2 text-xl font-bold text-slate-900">${escapeHtml(record.title)}</h4>
        </div>
        <span class="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">${escapeHtml(record.status)}</span>
      </div>

      <p class="mt-3 text-sm font-semibold text-slate-500">${escapeHtml(record.price)}</p>
      <p class="mt-3 text-sm leading-relaxed text-slate-600">${escapeHtml(record.description)}</p>

      <div class="mt-5 flex items-center gap-3">
        <button type="button" data-action="edit" data-id="${record.id}" class="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-all">
          Edit
        </button>
        <button type="button" data-action="delete" data-id="${record.id}" class="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 transition-all">
          Delete
        </button>
      </div>
    </article>
  `).join("");
}

function searchRecords() {
  const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
  const selectedCategory = (categoryFilter ? categoryFilter.value : "").trim();

  // filter() keeps the live search and category filtering in sync.
  return records.filter((record) => {
    const searchableText = `${record.title} ${record.category} ${record.description}`.toLowerCase();
    const matchesSearch = !query || searchableText.includes(query);
    const matchesCategory = !selectedCategory || record.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });
}

function addRecord() {
  const title = titleInput.value.trim();
  const category = categoryInput.value.trim();
  const description = descriptionInput.value.trim();
  const price = priceInput.value.trim();
  const status = statusInput.value.trim();

  const fields = [title, category, description, price, status];

  // every() confirms no required field is empty before creating a record.
  const isValid = fields.every((field) => field !== "");

  if (!isValid) {
    formError.textContent = "Please complete all fields before saving.";
    formError.classList.remove("hidden");
    return;
  }

  // some() prevents duplicate resource names or titles.
  const isDuplicate = records.some((record) => record.title.toLowerCase() === title.toLowerCase());

  if (isDuplicate) {
    formError.textContent = "A resource with this name already exists.";
    formError.classList.remove("hidden");
    return;
  }

  const newRecord = {
    id: Date.now(),
    title,
    category,
    description,
    price,
    status
  };

  records.push(newRecord);
  saveToStorage();
  resetForm();
  renderRecords();
}

function editRecord(id) {
  const selectedRecord = records.find((record) => Number(record.id) === Number(id));

  if (!selectedRecord) return;

  editingId = Number(id);
  titleInput.value = selectedRecord.title;
  categoryInput.value = selectedRecord.category;
  priceInput.value = selectedRecord.price;
  statusInput.value = selectedRecord.status;
  descriptionInput.value = selectedRecord.description;

  formTitle.textContent = "Edit Resource";
  submitButton.textContent = "Update Record";
  cancelEditButton.classList.remove("hidden");
  formError.classList.add("hidden");
  formError.textContent = "";
}

function updateRecord() {
  if (editingId === null) return;

  const title = titleInput.value.trim();
  const category = categoryInput.value.trim();
  const description = descriptionInput.value.trim();
  const price = priceInput.value.trim();
  const status = statusInput.value.trim();

  const fields = [title, category, description, price, status];

  // every() validates the edited values before updating the record.
  const isValid = fields.every((field) => field !== "");

  if (!isValid) {
    formError.textContent = "Please complete all fields before updating.";
    formError.classList.remove("hidden");
    return;
  }

  const selectedRecord = records.find((record) => Number(record.id) === Number(editingId));

  if (!selectedRecord) return;

  const duplicateTitle = records.some((record) =>
    Number(record.id) !== Number(editingId) && record.title.toLowerCase() === title.toLowerCase()
  );

  if (duplicateTitle) {
    formError.textContent = "Another record already uses this title.";
    formError.classList.remove("hidden");
    return;
  }

  selectedRecord.title = title;
  selectedRecord.category = category;
  selectedRecord.description = description;
  selectedRecord.price = price;
  selectedRecord.status = status;

  saveToStorage();
  resetForm();
  renderRecords();
}

function deleteRecord(id) {
  const confirmed = window.confirm("Are you sure you want to delete this record?");

  if (!confirmed) return;

  // filter() removes the selected record from the array.
  records = records.filter((record) => Number(record.id) !== Number(id));
  saveToStorage();

  if (Number(editingId) === Number(id)) {
    resetForm();
  }

  renderRecords();
}

recordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (editingId !== null) {
    updateRecord();
    return;
  }

  addRecord();
});

cancelEditButton.addEventListener("click", () => {
  resetForm();
  renderRecords();
});

searchInput.addEventListener("input", () => {
  renderRecords();
});

categoryFilter.addEventListener("change", () => {
  renderRecords();
});

clearFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "";
  renderRecords();
});

recordList.addEventListener("click", (event) => {
  const targetButton = event.target.closest("button");

  if (!targetButton) return;

  const id = targetButton.dataset.id;
  const action = targetButton.dataset.action;

  if (action === "edit") {
    editRecord(id);
  }

  if (action === "delete") {
    deleteRecord(id);
  }
});

renderRecords();
