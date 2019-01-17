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

function createOneComment(comment) {
  let commentator = comment.author.name;
  let rating = comment.rating.value;
  let time = comment.created_at;
  let content = comment.content;
  let html = `<div class="comment_item">
          <div class="avatar">
            <a href="${comment.author.alt}">
              <img src="${comment.author.avatar}"/>
            </a>
          </div>
          <div class="comment_main">
            <div class="comment_head">
              ${comment.author.name}
              <span class="comment_rating">
                评分：${comment.rating.value}
              </span>
              <span class="comment_time">
                发表于${comment.created_at}
              </span>
            </div>
            <p class="comment_text">
              ${comment.content}
            </p>
          </div>
        </div>`;
  let comments = document.getElementById('comments');
  comments.innerHTML += html;
}

function loadmore() {
  let comment = new Comments(id[0], commentPage, loadMoreComments);
  comment.setRequest();
  comment.getComments();
}

function loadMoreComments(comment) {
  comment.comments.forEach(cur => createOneComment(cur));
  commentPage += 5;
}

function pageInit(comment) {
  setTitle(comment.subject);
  setCover(comment.subject);
  setDetailLink(comment.subject.directors, 'directors');
  setDetailLink(comment.subject.casts, 'casts');
  setDetail(comment.subject.genres, 'genres');
  setDetail(comment.subject.pubdates, 'pubdates');
  setDetail(comment.subject.durations, 'durations');
  setRating(comment.subject.rating.average);
  loadMoreComments(comment);
}