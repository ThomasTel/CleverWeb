chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var t = JSON.parse(request.source);
    var txt = "";
    for(var i = 0; i < t.length; i++)
       txt += t[i].replace(/<.*?>/g, "") + " ";
    
    message.innerText = scoreToIQ(score(txt).score); // + " " + txt; //display the text analyzed
  }
});

function scoreToIQ(val) {
   return 90+(60-val)/2;
}

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

function onWindowLoad() {

  var message = document.querySelector('#message');
   
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