function clearChosenSubject() {
  let subjects = document.getElementsByClassName('subject');
  for (let subject of subjects) {
    subject.classList.remove('chosen');
  }
}

function switchGenre(genre) {
  genre.classList.add('chosen');
}

const imgUrls = ['http://puui.qpic.cn/media_img/0/vnewpictag_4_81_1546932831904820_14323_1680_580/0', 'http://puui.qpic.cn/media_img/0/vnewpictag_6_353_1547193470360262_32385_1680_580/0', 'http://puui.qpic.cn/media_img/0/vnewpictag_8_1292_1547193478591265_30717_1680_580/0'];

function showPosters() {
  const poster = document.getElementById('big_poster');
  for (let i = 0; i < imgUrls.length; i++) {
    setTimeout(() => {
      poster.setAttribute('src', imgUrls[i]);
    }, 5000 * i);
  }
}
setInterval('showPosters()', 15000);