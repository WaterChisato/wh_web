let items = [];
let visibleCount = 20;

async function loadMenu() {
  try {
    const res = await fetch("menu.json");
    items = await res.json();
    renderItems();
    window.addEventListener("scroll", handleScroll);
  } catch (err) {
    document.getElementById("loading").textContent = "菜单居然加载失败了...";
    console.error(err);
  }
}

function renderItems() {
  const container = document.getElementById("menu-container");
  const fragment = document.createDocumentFragment();
  items.slice(0, visibleCount).forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    const name = document.createElement("span");
    name.textContent = item.name;

    const btn = document.createElement("button");
    btn.textContent = "前往";
    btn.onclick = () => window.open(item.link, "_blank");

    card.appendChild(name);
    card.appendChild(btn);
    fragment.appendChild(card);
  });
  container.innerHTML = "";
  container.appendChild(fragment);

  document.getElementById("loading").style.display =
    visibleCount < items.length ? "block" : "none";
}

function handleScroll() {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 200
  ) {
    if (visibleCount < items.length) {
      visibleCount += 20;
      renderItems();
    }
  }
}

loadMenu();
