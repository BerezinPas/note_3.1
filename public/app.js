document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const noteItem = event.target.closest(".list-group-item");
    const noteForm = noteItem.querySelector("[data-update-form]");
    const noteViewItem = noteItem.querySelector("[data-view-item]");

    noteForm.classList.remove("d-none");
    noteViewItem.classList.add("d-none");
  }

  if (event.target.dataset.type === "save") {
    const id = event.target.dataset.id;
    const noteItem = event.target.closest(".list-group-item");
    const newTitle = noteItem.querySelector('input[name="update_title"]').value;
    console.log(newTitle);

    if (newTitle === null) {
      return;
    }
    update({ id, title: newTitle }).then(() => {
      event.target.closest("li").querySelector("span").innerText = newTitle;
      closeForm(noteItem);
    });
  }

  if (event.target.dataset.type === "cancel") {
    const noteItem = event.target.closest(".list-group-item");
    closeForm(noteItem);
  }
});

function closeForm(noteItem) {
  const noteForm = noteItem.querySelector("[data-update-form]");
  const noteViewItem = noteItem.querySelector("[data-view-item]");

  noteForm.classList.add("d-none");
  noteViewItem.classList.remove("d-none");
}

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function update(note) {
  await fetch(`/${note.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      title: note.title,
    }),
  });
}
