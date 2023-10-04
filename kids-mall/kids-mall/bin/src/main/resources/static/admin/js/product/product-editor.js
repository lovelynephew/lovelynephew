let oEditors = [];

nhn.husky.EZCreator.createInIFrame({
 oAppRef: oEditors,
 elPlaceHolder: "ir1",
 sSkinURI: "/static/SmartEditor2Skin.html",
 fCreator: "createSEditor2",
 fOnAppLoad : () => {
    oEditors.getById["ir1"].exec("PASTE_HTML", ["유저가 작성한 n번글"]);
 }
});