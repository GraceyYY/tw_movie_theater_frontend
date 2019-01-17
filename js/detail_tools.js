function setTitle(subject) {
  let title = subject.title;
  let originalTitle = subject.original_title;
  let year = subject.year;
  document.getElementById('title').innerHTML = `${title}(${originalTitle})
            <span class="year">
              ${year}
            </span>`;
  document.getElementById('commentsHeader').innerHTML = `${title}豆瓣短评`;
}

function setDetailLink(data, id) {
  let aTags = data.map(cur => {
    return `<a href="${cur.alt}">
                ${cur.name}
              </a>`
  });
  document.getElementById(id).innerHTML = aTags.join(' / ');
}

function setDetail(data, id) {
  document.getElementById(id).innerHTML = data.join(' / ');
}

function setRating(rating) {
  let yPos = (Math.ceil(rating) + 1) * 30;
  document.getElementById('rating').innerHTML = `<div class="rating_text">
            豆瓣评分：
            <span class="rating_num">
              ${rating}
            </span>
          </div>
          <div id="ratingStar" class="rating_star">
          </div>`;
  document.getElementById('ratingStar').setAttribute('style', `background-position: 0px ${yPos}px;`)
}

function setCover(subject) {
  document.getElementById('cover').innerHTML = `<a href="${subject.alt}">
            <img src="${subject.images.large}"/>
          </a>`
}