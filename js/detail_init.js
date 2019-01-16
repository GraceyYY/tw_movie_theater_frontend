window.onload = function() {
  let id = window.location.href.match(/[0-9]{7,8}/);
  let comment = new Comments(id[0]);
  comment.setRequest();
  comment.getComments();
}