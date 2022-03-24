const MAIN_MENU_ITEMS = document.querySelectorAll(".main-menu__item");
const MAIN_MENU_LINKS = document.querySelectorAll(".main-menu__link");
const MAIN_MENU_UNDERLINE = document.querySelector(".main-menu__underline");
const CONTENT_SECTIONS = [...document.querySelectorAll(".content")];
const MAIN_MENU_LIST = document.querySelector(".main-menu__list");
const itemsWidth = [];
const itemsOffsetLeft = [];
let mouseOnMenu = 0;
let activeSection = 0;
let fromTop = 0;
let sections = CONTENT_SECTIONS.length;
let whenScrolling;
MAIN_MENU_LINKS.forEach((item) => {
	itemsWidth.push(item.offsetWidth);
	itemsOffsetLeft.push(item.offsetLeft);
});
const autoUnderline = () => {
	const sectionsMinusOne = sections - 1;
	if (mouseOnMenu === 1) return;
	for (let i = 0; i < sections; i++) {
		i === 0 ? (fromTop = -10) : (fromTop = 100);
		if (
			i < sectionsMinusOne &&
			CONTENT_SECTIONS[i].getBoundingClientRect().top <= fromTop &&
			CONTENT_SECTIONS[i + 1].getBoundingClientRect().top >= CONTENT_SECTIONS[i].offsetHeight / 2
		) {
			activeSection = i;
		} else if (i === sectionsMinusOne && CONTENT_SECTIONS[sectionsMinusOne].getBoundingClientRect().top <= 50) {
			activeSection = i;
		}
		console.log(activeSection);
	}
	updateUnderline();
	addActiveItem();
};
const addActiveItem = () => {
	MAIN_MENU_ITEMS.forEach((item, index) => {
		if (index == activeSection) return;
		item.classList.remove("active");
	});
	MAIN_MENU_ITEMS[activeSection].classList.add("active");
};
MAIN_MENU_LIST.addEventListener("mousemove", (e) => {
	mouseOnMenu = 1;
	for (let i = 0; i < sections; i++) {
		if (e.target === MAIN_MENU_LINKS[i]) {
			MAIN_MENU_UNDERLINE.style.width = `${itemsWidth[i]}px`;
			MAIN_MENU_UNDERLINE.style.left = `${itemsOffsetLeft[i]}px`;
		}
	}
});
const updateUnderline = () => {
	MAIN_MENU_UNDERLINE.style.width = `${itemsWidth[activeSection]}px`;
	MAIN_MENU_UNDERLINE.style.left = `${itemsOffsetLeft[activeSection]}px`;
};
window.addEventListener("scroll", autoUnderline);
CONTENT_SECTIONS.forEach((section) => {
	section.addEventListener("mousemove", () => {
		mouseOnMenu = 0;
		updateUnderline();
	});
});
