jQuery(function($){
  console.log("dfcsd");
$("#a").click(function(e){
  console.log("inside");
  var frame = document.getElementById("theFrame");
          
  var doc = document.implementation.createHTMLDocument("New Document");
  var p = doc.createElement("p");
  p.innerHTML = "This is a new paragraph.";
  
  try {
    doc.body.appendChild(p);
  } catch(e) {
    console.log(e);
  }

  // Copy the new HTML document into the frame

  var destDocument = frame.contentDocument;
  var srcNode = doc.documentElement;
  var newNode = destDocument.importNode(srcNode, true);
  console.log(destDocument);
  console.log(srcNode);
  console.log(newNode);
  console.log($("#theFrame").attr('src'));
  
  destDocument.replaceChild(newNode, destDocument.documentElement);

      });
});