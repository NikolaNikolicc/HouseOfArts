// $(document).ready(function () {
//     var allTextValues = [];
//     var wholeDoc = $("html");
//     // poziv fje za prolaz tagova
//     iterateTags(wholeDoc);
//     alert(allTextValues);
//     iterateThroughArray()
//         .then(function (translations) {
//             for (let i = 0; i < translations.length; i++) {
//                 console.log(allTextValues[i] + " translated to " + translations[i]);
//                 //   allTextValues[i] = translations[i];
//             }
//             let cntTranslations = 0;
//             for (let i = 0; i < allTextValues.length; i++) {
//                 if (containsCyrillicLetters(allTextValues[i])) {
//                     allTextValues[i] = translations[cntTranslations++];
//                 }
//             }
//             alert(allTextValues);
//             // nakon ovog poziva u nizu allTextValues ce se nalaziti sve vrednosti prevedenog teksta
//             iterateAndRewriteDocument(wholeDoc);
//         })
//         .catch(function (error) {
//             console.error(error);
//         });



//     let cnt = 0;
//     function iterateAndRewriteDocument(element) {
//         element.contents().each(function () {
//             if (this.nodeType === Node.TEXT_NODE) {
//                 if(containsCyrillicLetters($(this).text())){
//                     alert("Pronadjeni cirillicni tekst: " + $(this).text() + ", zamenjen sa engleskim prevodom: " + allTextValues[cnt]);
//                     $(this).text(allTextValues[cnt]);
//                 }
//                 cnt++;
//             } else if (this.nodeType === Node.ELEMENT_NODE) {
//                 iterateAndRewriteDocument($(this));
//             }
//         });
//     }
    

//     /**
//      * proverava da li prosledjeni string sadrzi cirilicna slova
//      * @param {String} text 
//      */
//     function containsCyrillicLetters(text) {
//         return /[а-шђјљњћџА-ШЂЈЉЊЋЏ]/.test(text);
//     }

//     /**
//      * prolazi ceo html kroz inner vrednosti tagova
//      * @param {html tag} element 
//      */
//     function iterateTags(element) {
//         element.contents().each(function () {
//             if (this.nodeType === Node.TEXT_NODE) {
//                 allTextValues.push($(this).text());
//             } else if (this.nodeType === Node.ELEMENT_NODE) {
//                 iterateTags($(this));
//             }
//         });
//     }

//     /**
//      * prolazi kroz niz i u slucaju da polje sadrzi cirilicne karaktere prevodi ga i upisuje nazad
//      */
//     function iterateThroughArray() {
//         var translationPromises = [];
//         for (let i = 0; i < allTextValues.length; i++) {
//             if (containsCyrillicLetters(allTextValues[i])) {
//                 let translationPromise = translate(allTextValues[i], "sr", "en");
//                 translationPromises.push(translationPromise);
//             }
//         }
//         return Promise.all(translationPromises);
//     }


//     /**
//      * prosledjeni tekst prevodi sa jezika sourceLand na jezik targetlang
//      * @param {String} sourceText 
//      * @param {String} sourceLang 
//      * @param {String} targetLang 
//      */
//     function translate(sourceText, sourceLang, targetLang) {
//         return new Promise(function (resolve, reject) {
//             var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

//             $.getJSON(url, function (data) {
//                 var translation = data[0][0][0];
//                 resolve(translation);
//             }).fail(function (error) {
//                 reject(error);
//             });
//         });

//     }
// });
