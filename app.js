import { TagsController, NewsController } from "./script.js";

const selectDrpDwn = document.querySelector(".dropbtn");
const categories = document.querySelector(".categories-list");
const itemSelect = document.querySelector("#ctgList");
const tagsContainer = document.querySelector("#tags");
const submitBtn = document.querySelector("#submit");

const tags = new TagsController(tagsContainer);
const news = new NewsController();

selectDrpDwn.addEventListener("click", (e) => {
  categories.classList.toggle("show");
});

itemSelect.onclick = (event) => tags.tagsSection(event);

tagsContainer.addEventListener("click", (event) =>
  tags.deleteTagsSelected(event)
);

submitBtn.onclick = (event) => {
  // console.log(tagsContainer.innerText.split("\n"));
  news.newsFetcher(tagsContainer.innerText.split("\n"));
};

