
function getBookmarks() {
  return new Promise(function(resolve) {
    chrome.bookmarks.getTree(resolve);
  });
}

var $book = $('.bookmarks');

function dumpBookmarks() {
  return getBookmarks()
    .then(nodeHandler)
    .then(function() {
      var open = 'glyphicon-folder-close';
      var close = 'glyphicon-folder-open';
      $(".bookmarks ul > li:nth-child(1)")
      .prepend("<span class='glyphicon folder-icon " + open + "'></span>");
      $(".folder-icon").closest("ul").eq(0).find("ul li, li").slice(1).hide();
      $('.folder-icon').on('click',function(){
         var parentList = $(this).closest("ul").eq(0);
        if( $(this).hasClass(open) ){
          $(this).removeClass(open);
          $(this).addClass(close);
        }else{
          $(this).removeClass(close);
          $(this).addClass(open);
        }
        parentList.children("ul").children("li:nth-child(1)")
        .slideToggle("fast"); // toggle folders

        parentList.children("li").slice(1)
        .slideToggle("fast"); // toggle bookmarks
      });
    });
}

var makeFolder = function(folder) {
  var parent = $book.find(".folder" + folder.parentId);
  var selector = folder.parentId > 0 ? parent : $book; //if parent folder exists, nest this one
  if (folder.title !== "") {
    var ulist = $("<ul>");
    var title = $("<li>");

    title.text(folder.title);
    ulist.attr("class","folder folder"+folder.id);
    ulist.append(title);
    selector.append(ulist);
  }
};

var makeBookmark = function(bookmark) {
  var list = $("<li>");
  var anchor = $("<a>");

  var selector = (".folder"+bookmark.parentId);
  anchor.text(bookmark.title);
  anchor.attr("href", bookmark.url);
  list.append(anchor);
  $book.find(selector).append(list);
};

function nodeHandler (obj, acc) {
  _(obj).map(function (node) {
    if (node.children) {
      makeFolder(node);
      return nodeHandler(node.children);
    } else {
      makeBookmark(node);
    }
  });
}
