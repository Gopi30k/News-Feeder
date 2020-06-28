export class TagsController {
  constructor(tagsContainer) {
    this.tagsContainer = tagsContainer;
  }

  //add selected topics as tags
  tagsSection(eventProp) {
    const topicSelected = eventProp.srcElement.innerText;
    let btn = document.createElement("button");
    if (
      !Array.from(this.tagsContainer.innerText.split("\n")).includes(
        topicSelected
      )
    ) {
      btn.innerHTML = `${topicSelected}<i class = "fas fa-times del" id = "${topicSelected}"></i>`;
      this.tagsContainer.appendChild(btn);
    }
  }

  //Delete Selected topics from tag List
  deleteTagsSelected(eventProp) {
    const btnParent = eventProp.target.parentElement;
    if (btnParent.matches("button")) {
      btnParent.remove();
    }
  }
}

export class NewsController {
  constructor() {
    this.api_key = "0dd872561e1e4f3cb976ac5569b58981";
  }

  async apiGet(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  newsFetcher(categoryArray) {
    let newsDataPrmsArr = [];
    categoryArray.forEach(async (category) => {
      const urlString = `https://newsapi.org/v2/top-headlines?language=en&country=in&category=${category}&apiKey=${this.api_key}`;

      newsDataPrmsArr.push(this.apiGet(urlString));
    });
    Promise.all(newsDataPrmsArr).then((rslvddata) => {
      let newsDataobj = Object.fromEntries(
        categoryArray.map((_, i) => [categoryArray[i], rslvddata[i].articles])
      );
      sessionStorage.setItem("newsCtgryData", JSON.stringify(newsDataobj));
      window.location.href = "/newsPage.html";
    });
  }

  newsFeedLoad(newsData) {}
}
