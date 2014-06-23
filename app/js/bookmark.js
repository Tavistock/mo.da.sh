
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
      $(".bookmarks li.folder")
      .prepend("<span class='glyphicon folder-icon " + close + "'></span>");
      $('.folder-icon').on('click',function(){
         var parentList = $(this).closest("li").eq(0);
        if( $(this).hasClass(open) ){
          $(this).removeClass(open);
          $(this).addClass(close);
        }else{
          $(this).removeClass(close);
          $(this).addClass(open);
        }
        parentList.children("ul")
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
    title.attr("class","folder");
    ulist.attr("class","folder folder"+folder.id);
    title.append(ulist);
    selector.append(title);
  }
};

var makeBookmark = function(bookmark) {
  var list = $("<li>");
  var anchor = $("<a>");

  var selector = (".folder"+bookmark.parentId);
  anchor.text(bookmark.title);
  anchor.attr("href", bookmark.url);
  list.append(anchor);
  $book.find(selector).first("ul").append(list);
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
