var commentPage = 0;
var reviewStart = 0;
var id = window.location.href.match(/[0-9]{7,8}/);
window.onload = function() {
  let comment = new Comments(id[0], commentPage, pageInit);
  comment.setRequest();
  comment.getComments();
  let review = new Reviews(id[0], reviewStart, load3Reviews);
  review.setRequest();
  review.getComments();
}