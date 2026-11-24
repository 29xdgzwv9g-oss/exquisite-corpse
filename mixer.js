// Each row keeps its own position in its list of drawings.
const rows = [];

for (const [part, drawings] of Object.entries(artwork)) {
  let index = 0;
  const row = document.createElement("section");
  row.setAttribute("aria-label", part);
  row.innerHTML = `
    <button><span aria-hidden="true">←</span><small></small></button>
    <img alt="">
    <button><span aria-hidden="true">→</span><small></small></button>
  `;
  const image = row.querySelector("img");
  const [previous, next] = row.querySelectorAll("button");
  previous.querySelector("small").textContent = part;
  previous.setAttribute("aria-label", "Previous " + part);
  next.setAttribute("aria-label", "Next " + part);

  function show(position) {
    index = (position + drawings.length) % drawings.length;
    const [file, description] = drawings[index];
    image.src = "art/" + file;
    image.alt = description;
    next.querySelector("small").textContent = (index + 1) + "/" + drawings.length;
  }

  function step(amount) {
    show(index + amount);
    document.querySelector("#announcement").textContent = image.alt;
  }

  previous.onclick = () => step(-1);
  next.onclick = () => step(1);
  rows.push(() => show(Math.floor(Math.random() * drawings.length)));
  document.querySelector("#figure").append(row);
  show(0);
}

document.querySelector("#shuffle").onclick = () => {
  rows.forEach(randomize => randomize());
  const images = document.querySelectorAll("#figure img");
  document.querySelector("#announcement").textContent = Array.from(images, image => image.alt).join(", ");
};
