const showBarOn = (menu) => menu.forEach((_) => _.classList.add("selected"));

const hideBarOn = (menu) => menu.forEach((_) => _.classList.remove("selected"));

const triggerBarOn = (target) => {
  const targetedMenu = document.querySelectorAll(
    `header a[href="#${target.id}"] .button`
  );
  showBarOn(targetedMenu);
  hideBarOn(
    document.querySelectorAll(`header a:not([href="#${target.id}"]) .button`)
  );
};

const visibility = {};
const current = "";
const observerSections = new IntersectionObserver(
  (entries) => {
    entries.forEach(
      (intersection) => (visibility[intersection.target.id] = intersection)
    );
    const topSection = Object.values(visibility).sort(
      (a, b) => b.intersectionRect.height - a.intersectionRect.height
    )[0].target;
    triggerBarOn(topSection);
  },
  {
    threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  }
);

const initSectionObservers = () =>
  document
    .querySelectorAll("section")
    .forEach((section) => observerSections.observe(section));

const initGalerie = () => {
  document
    .querySelectorAll(".grid .element")
    .forEach((_) =>
      _.addEventListener(
        "click",
        ({ currentTarget }) => currentTarget.classList.add("selected"),
        { capture: true }
      )
    );

  document
    .querySelectorAll(".opened .close")
    .forEach((_) =>
      _.addEventListener("click", ({ currentTarget }) =>
        currentTarget.parentElement.parentElement.classList.remove("selected")
      )
    );
};

addEventListener("DOMContentLoaded", () => {
  initSectionObservers();
  initGalerie();
});
