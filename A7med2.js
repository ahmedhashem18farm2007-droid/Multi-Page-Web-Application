
const API_URL = "https://691b38be2d8d7855757211de.mockapi.io/api/v1/anime";

const tbody = document.getElementById("tbody-data");
const animesTable = document.querySelector(".animes-table"); 
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const openAddBtn = document.getElementById("open-add");
const cancelBtn = document.getElementById("cancel-btn");
const form = document.getElementById("anime-form");
const saveBtn = document.getElementById("save-btn");

const nameInput = document.getElementById("name");
const idInput = document.getElementById("anime-id");
const evalInput = document.getElementById("evaluation");

let editId = null; 

function showModal(title = "Add Anime") {
  modalTitle.textContent = title;
  modal.setAttribute("aria-hidden", "false");

  modal.style.display = "flex"; 
}
function hideModal() {
  modal.setAttribute("aria-hidden", "true");

  modal.style.display = "none"; 
  form.reset();
  editId = null;
}

function setFormValues(data) {
  nameInput.value = data.name ?? "";
  evalInput.value = data.evaluation ?? "";
}

/* Fetch & render */
async function fetchAnimes() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Network response not ok");
    const animes = await res.json();
    renderTable(animes);

  } catch (err) {
    console.error(err);
    alert("Error to API. ");
  }
}

function renderTable(animes) {
  tbody.innerHTML = "";
  
  if (animesTable) {
    if (animes.length > 0) {
      animesTable.style.display = 'table';
    } else {
      animesTable.style.display = 'table'; 
    }
  }

  animes.forEach((item, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${escapeHtml(String(item.id ?? ""))}</td>
      <td>${escapeHtml(item.name)}</td>
      <td>${escapeHtml(String(item.evaluation ?? ""))}</td>
      <td>
        <button class="action-small action-edit" data-action="edit" data-id="${item.id}">Edit</button>
        <button class="action-small action-danger" data-action="delete" data-id="${item.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}


function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}


openAddBtn.addEventListener("click", () => {
  editId = null;
  setFormValues({ name: "", id: "", evaluation: "" });
  showModal("Add Anime");
});

cancelBtn.addEventListener("click", () => {
  hideModal();
});

window.addEventListener("click", (e) => {
  if (e.target === modal) hideModal();
});

 /*  لإضافة/تعديل وحفظ البيانات */
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  saveBtn.disabled = true;

  const name = nameInput.value.trim();
  const evaluation = evalInput.value.trim();

  // 1. التحقق من صحة البيانات (Validation)
  if (!name || !evaluation) {
    alert("Please fill all fields");
    saveBtn.disabled = false;
    return;
  }
  const evalNumber = Number(evaluation);
  if (Number.isNaN(evalNumber)) {
    alert("Evaluation must be numbers");
    saveBtn.disabled = false;
    return;
  }
  if (evalNumber < 1 || evalNumber > 10) {
    alert("Evaluation must be between 1.0 and 10.0");
    saveBtn.disabled = false;
    return;
  }

  const payload = {
    name,
    evaluation: evalNumber.toFixed(1)
  };

  try {
    if (editId) {
      // تعديل بيانات موجودة
      const res = await fetch(`${API_URL}/${encodeURIComponent(editId)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Update failed");
    } else {
      // إضافة بيانات جديدة
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Create failed");
    }
    
    // 3.model جلب البيانات الجديدة وتحديث الجدول وإخفاء
    await fetchAnimes();
    hideModal();
  } catch (err) {
    console.error(err);
    alert("An error occurred while saving.");
  } finally {
    saveBtn.disabled = false;
  }
});

/* Delegated clicks for edit/delete */
tbody.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const action = btn.dataset.action;
  const itemId = btn.dataset.id;
  if (action === "edit") {
    // load item from API then open modal with values
    try {
      const res = await fetch(`${API_URL}/${encodeURIComponent(itemId)}`);
      if (!res.ok) throw new Error("Failed to fetch item");
      const data = await res.json();
      editId = itemId;
      setFormValues(data);
      showModal("Edit Anime");
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    }
  } else if (action === "delete") {
    if (!confirm("Are you sure you want to delete this anime?")) return;
    try {
      const res = await fetch(`${API_URL}/${encodeURIComponent(itemId)}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchAnimes();
    } catch (err) {
      console.error(err);
      alert("error to delete");
    }
  }
});

fetchAnimes();