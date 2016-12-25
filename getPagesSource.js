function getP(document_root) {
   var t = [];
   var p = document.getElementsByTagName("p");
   for(var i = 0; i < p.length; i++)
      t.push(p[i].innerHTML);
   return JSON.stringify(t);
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: getP(document)
});