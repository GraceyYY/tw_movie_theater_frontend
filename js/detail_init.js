var commentsStart = 0;
var reviewsStart = 0;
var id = window.location.href.match(/[0-9]{7,8}/);
var subject = new Request(id[0], subjectInit, 'subject');
subject.getData(0);
var comments = new Request(id[0], load5Comments, 'comments');
comments.getData(commentsStart);
var reviews = new Request(id[0], load3Reviews, 'reviews');
reviews.getData(reviewsStart);