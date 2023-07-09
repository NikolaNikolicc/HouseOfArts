$(document).ready(function () {
  var allTextValues = [];
  var translatedValues = [];
  // poziv fje za prolaz tagova

  $("#eng-lang").click(function(){
    $("#srb-lang").removeClass("active-lang");
    $("#srb-lang").addClass("unactive-lang");
    $("#eng-lang").removeClass("unactive-lang");
    $("#eng-lang").addClass("active-lang");
    iterateTags();
    // alert(allTextValues);
    iterateThroughArray()
      .then(function (translations) {
        // alert(translations);
        for (let i = 0; i < translations.length; i++) {
          console.log(allTextValues[i] + " translated to " + translations[i]);
          translatedValues.push(translations[i]);
        }
        assignTranslatedValues();
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  /**
   * funkcija kojom se ponovo prolazi citava stranica i upisuju se prevedene reci u nju
   */
  function assignTranslatedValues() {
    let counter = 0;
    $('*').each(function () {
      // Check if the text value is empty and if the element has no children
      if ($(this).text().trim() !== '' && $(this).children().length === 0) {
        // Perform actions for elements with empty text and no children
        $(this).text(translatedValues[counter++]);
      }
    });
  }

  /**
   * prolazi sve tagove i krajnje elemente upisuje u globalnu listu allTextValues
   */
  function iterateTags() {
    $('*').each(function () {
      // Check if the text value is empty and if the element has no children
      if ($(this).text().trim() !== '' && $(this).children().length === 0) {
        // Perform actions for elements with empty text and no children
        allTextValues.push($(this).text());
      }
    });
  }

  /**
   * prolazi kroz niz i u slucaju da polje sadrzi cirilicne karaktere prevodi ga i upisuje nazad
   */
  function iterateThroughArray() {
    var translationPromises = [];
    for (let i = 0; i < allTextValues.length; i++) {
      let translationPromise = translate(allTextValues[i], "sr", "en");
      translationPromises.push(translationPromise);
    }
    return Promise.all(translationPromises);
  }

  /**
   * deli prosledjeni tekst na manje delove kako bi Google API mogao da ga prevede
   * @param {String} text 
   * @returns 
   */
  function splitTextIntoParts(text) {
    var words = text.trim().split(/\s+/); // Split text into words
    // alert(words);
    var parts = [];
    var currentPart = "";
  
    for (var i = 0; i < words.length; i++) {
      currentPart += words[i] + " ";
  
      if (((i + 1) % 8 == 0) || (i == words.length - 1)) {
        parts.push(currentPart.trim());
        currentPart = "";
      }
    }
    // alert(parts);
    return parts;
  }

  /**
   * prevoi sourceText sa jezika souceLang na jezik targetlang
   * @param {String} sourceText 
   * @param {String} sourceLang 
   * @param {String} targetLang 
   * @returns 
   */
  function translate(sourceText, sourceLang, targetLang) {
    return new Promise(function (resolve, reject) {
      const parts = splitTextIntoParts(sourceText);
      const promises = [];

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(part);

        promises.push(
          new Promise(function (resolvePart, rejectPart) {
            $.getJSON(url, function (data) {
              const translation = data[0][0][0];
              resolvePart(translation);
            }).fail(function (error) {
              rejectPart(error);
            });
          })
        );
      }

      Promise.all(promises)
        .then(function (translations) {
          const mergedTranslation = translations.join(' ');
          resolve(mergedTranslation);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

});
