chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var t = JSON.parse(request.source);
    //t[0] = '<ul> allo </ul> putain de merde';
    t[0] = t[0].replace(/<.*?>/g, "");
    //t[0] = "Visit Microsoft!";
    //t[0] = t[0].replace("Microsoft", "W3Schools");
    message.innerText = t[0];
    //alert(score(txt).score); //t[0];
  }
});

function score(text){
  return {
  score: 206.835 - (1.015 * avgWordsSentance(text)) - (84.6 * avgSyllablesWord(text)),
  gradingLevel: gradingLevel(text)
  };
}
 
 
function gradingLevel(text){
  return ((.39 * avgWordsSentance(text)) + (11.8 * avgSyllablesWord(text)) - 15.59);
}
 
 
function avgWordsSentance(text){
  var sentences = text.split(/[.!?][ |\n]/g).length;
  var words = text.split(/ /g).length;
  return words / sentences;
}
 
 
function avgSyllablesWord(text){
  var words = text.split(/ /g);
  var syllables = 0;
  for (var i = 0; i < words.length; i++){
  syllables = syllables + countSyllables(words[i]);
  }
  return syllables / words.length;
}
 
 
function countSyllables(word){
  word = word.toLowerCase();                                 
  if(word.length <= 3) { return 1; }                            
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); 
  word = word.replace(/^y/, '');  
  word = word.replace(/-/g, '');
  if (word.match(/[aeiouy]{1,2}/g))                    
  return word.match(/[aeiouy]{1,2}/g).length; 
  return 1;
}
 
var txt = 'The foregoing warranties by each party are in lieu of all other warranties, express or implied, with respect to this agreement, including but not limited to implied warranties of merchantability and fitness for a particular purpose. Neither party shall have any liability whatsoever for any cover or setoff nor for any indirect, consequential, exemplary, incidental or punitive damages, including lost profits, even if such party has been advised of the possibility of such damages.';


function onWindowLoad() {

  var message = document.querySelector('#message');

  /*message.innerText = document.getElementsByTagName("p")[0].innerHTML;
  //console.log(document.getElementsByTagName("p").length + "?");
  
  var bkg = chrome.extension.getBackgroundPage();
  if(bkg == null)
     alert('fuck');
  else
     alert('cool');
   bkg.console.log('foo');
   bkr.console.error('test1');
   
   console.log('lol');
   console.error('test2');*/
   
  message.innerText = 
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;