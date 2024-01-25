var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");

var bookmarkList = [];
if (localStorage.getItem("bookMark") != null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookMark"));
  displayBookmarkData();
}

function main() {
  getData();
  displayBookmarkData();
  clearInputsData();
}
function getData() {
  var data = {
    name: bookmarkNameInput.value,
    url: bookmarkURLInput.value,
  };
  if (
    validateBookmarkName(bookmarkNameInput.value) &&
    validateBookmarkUrl(bookmarkURLInput.value)
  ) {
    bookmarkList.push(data);
    localStorage.setItem("bookMark", JSON.stringify(bookmarkList));
    //document.getElementById("alert").style.display = "none";
  } else {
    alert("invalid input");
    // document.getElementById("alert").style.display = "block";
  }
}
function displayBookmarkData() {
  var display = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    display += `
    <tr>
    <td>${i}</td>
    <td>${bookmarkList[i].name}</td>
    <td><button   class="btn btn-warning"><a href="https://${bookmarkList[i].url}" target="_blank">VISIT</a></a></button></td>
    <td><button  onclick=" deleteBookmark(${i})" class="btn btn-danger">DELETE</button></td>
</tr>    
        `;
  }
  document.getElementById("tbody").innerHTML = display;
}
function clearInputsData() {
  //set value
  bookmarkNameInput.value = "";
  bookmarkURLInput.value = "";
}
function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookMark", JSON.stringify(bookmarkList));
  displayBookmarkData();
}

function validateBookmarkName(bookmarkName) {
  var bookmarkNameRegEx = /^[A-Z][a-z]{2,40}$/;
  return bookmarkNameRegEx.test(bookmarkName);
}
function validateBookmarkUrl(bookmarkUrl) {
  var bookmarkUrlRegEx = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/?[a-zA-Z0-9_./-]*$/;
  return bookmarkUrlRegEx.test(bookmarkUrl);
}
// const regex = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/?[a-zA-Z0-9_./-]*$/;
// const isValid = regex.test("https://google.com");
// console.log(isValid);
