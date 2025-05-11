document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const newTitle = prompt("Введите новвое название");
    if (newTitle === null) {
      return;
    }
    const id = event.target.dataset.id;
    update({ id, title: newTitle }).then(() => {
      event.target.closest("li").querySelector("span").innerText = newTitle;
    });
  }
});

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
