var commentPage = 0;
var reviewStart = 0;
var id = window.location.href.match(/[0-9]{7,8}/);
window.onload = function() {
  let comment = new Comments(id[0], commentPage, pageInit);
  comment.setRequest();
  comment.getComments();
  // let subject = new Subject(id[0]);
  // subject.setRequest();
  // subject.getComments();
  let review = new Reviews(id[0], reviewStart, load3Reviews);
  review.setRequest();
  review.getComments();
  // setTitle(comment.subject);
  // setCover(comment.subject);
  // setDetailLink(comment.subject.directors, 'directors');
  // setDetailLink(comment.subject.casts, 'casts');
  // setDetail(comment.subject.genres, 'genres');
  // setDetail(comment.subject.pubdates, 'pubdates');
  // setDetail(comment.subject.durations, 'durations');
  // setRating(comment.subject.rating.average);
  // commentPage = loadMoreComments(comment.comments, commentPage);
}