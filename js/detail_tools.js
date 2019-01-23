function setTitle(subject) {
  let title = subject.title;
  let originalTitle = subject.original_title;
  let year = subject.year;
  document.getElementById('title').innerHTML = `${title}(${originalTitle})
            <span class="year">
              ${year}
            </span>`;
  document.getElementById('commentsHeader').innerHTML = `${title}·豆瓣短评`;
  document.getElementById('reviewsHeader').innerHTML = `${title}·豆瓣影评`;
  document.getElementsByTagName('title')[0].innerText = `思沃影院·${title}`;
}

function setDetailLink(data, id) {
  let aTags = data.map(cur => {
    return `<a href="${cur.alt}" target="_blank">
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
  document.getElementById('cover').innerHTML = `<a href="${subject.alt}" target="_blank">
            <img src="${subject.images.large}" onerror="this.src='../images/default.png'"/>
          </a>`
}

function createOneComment(comment) {
  let commentator = comment.author.name;
  let rating = comment.rating.value;
  let time = comment.created_at;
  let content = comment.content;
  let html = `<div class="comment_item">
          <div class="avatar">
            <a href="${comment.author.alt}" target="_blank">
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

function loadMoreComments() {
  comments.getData(commentsStart);
}

function load5Comments(comments) {
  comments.forEach(cur => createOneComment(cur));
  commentsStart += 5;
}

function subjectInit(subject) {
  setTitle(subject);
  setCover(subject);
  setDetailLink(subject.directors, 'directors');
  setDetailLink(subject.casts, 'casts');
  setDetail(subject.genres, 'genres');
  setDetail(subject.pubdates, 'pubdates');
  setDetail(subject.durations, 'durations');
  setRating(subject.rating.average);
}

function load3Reviews(reviews) {
  let html = reviews.reduce((acc, cur) => {
    let p = cur.content.split('\n');
    let reviewContent = p.reduce((acc, cur) => {
      return acc += `<div>${cur}</div>`
    }, '');
    return acc += `<div class="comment_item">
            <div class="avatar">
              <a href="${cur.author.alt}" target="_blank">
                <img src="${cur.author.avatar}"/>
              </a>
            </div>
            <div class="comment_main">
              <div class="comment_head">
                ${cur.author.name}
                <span class="comment_rating">
                  评分：${cur.rating.value}
                </span>
                <span class="comment_time">
                  发表于${cur.created_at}
                </span>
              </div>
              <div class="review_title">${cur.title}</div>
              <div class="comment_text">
                <div class="review_summary" id="reviewSummary">${cur.summary}</div>
                <div class="review_content review_hide" id="reviewContent">${reviewContent}</div>
                <div class="extend_btn" onclick="extendHideReview(event)">展开影评</div>
              </div>
            </div>
          </div>`
  }, '');
  reviewsStart += 3;
  document.getElementById('reviews').innerHTML += html;
}

function loadMoreReviews() {
  reviews.getData(reviewsStart);
}

function extendHideReview(event) {
  let reviewSummary = event.target.parentElement.children[0];
  let reviewContent = event.target.parentElement.children[1];
  if (reviewSummary.classList.contains('review_hide')) {
    reviewSummary.classList.remove('review_hide');
    reviewContent.classList.add('review_hide');
    event.target.innerText = '展开影评';
  } else {
    reviewSummary.classList.add('review_hide');
    reviewContent.classList.remove('review_hide');
    event.target.innerText = '收起';
  }
}