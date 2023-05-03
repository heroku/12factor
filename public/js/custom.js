function openCitation(evt, citationName) {
  var i, x, citation_tab;
  x = document.getElementsByClassName("citation");
  for (i = 0; i < x.length; i++) {
    x[i].className = "citation";
  }
  citation_tab = document.getElementsByClassName("citation-tab");
  for (i = 0; i < x.length; i++) {

    citation_tab[i].className = "citation-tab hk-button--secondary";
  }
  document.getElementById(citationName).className = "citation citation-visible";
  evt.currentTarget.className = "citation-tab hk-button--primary";
}