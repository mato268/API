const form = document.getElementById("form");
const text = document.getElementById("text");
const ul = document.getElementById("ul");

const API_KEY =
  "test_efb42ba6f037a09fa65e28125f10993901f1b04a6a72fa38874476df6649b33021322271e4aa69d519c1f1c287a7bf59";
const characterName = "토끼헌터"
const nicknameUrl =
  "https://open.api.nexon.com/fconline/v1/id?nickname=" + characterName;

// 계정 식별자(ouid) 조회
const getUserOuid = fetch(nicknameUrl, {
  headers: {
    "x-nxopen-api-key": API_KEY,
  },
})
  .then(response => response.json())
  .then(myJson => {
    const userOuid = myJson.ouid.toString();
    console.log(userOuid);
    console.log(myJson);
  })
  .catch(error => console.error(error));

/*const searchParams = new URLSearchParams(nicknameUrl);
searchParams.toString();
for (const [key, value] of searchParams) {
  console.log(`${key}=${value}`);
}*/

/*const url = new URL(nicknameUrl);
url.search = new URLSearchParams(characterName)
url.toString();
console.log(url)*/

const ouidUrl = "https://open.api.nexon.com/fconline/v1/user/basic?ouid=" + "2766f6264e2181be64cb394f4eb4c374";

// 기본 정보 조회
const getUserNameAndLevel = fetch(ouidUrl, {
  headers: {
    "x-nxopen-api-key": API_KEY,
  },
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if(!text.value){
    alert('다시 입력하세요.')
    return;
  }
  console.log(text.value);

  userList(text.value);
  text.value = "";
})

function userList() {
  const li = document.createElement('li');
  const deleteButton = document.createElement(('button'));
  deleteButton.textContent = "삭제";

  li.innerText = text.value;
  ul.appendChild(li);
  li.append(deleteButton);

  deleteButton.addEventListener("click", () => {
    ul.removeChild(li);
  })
}