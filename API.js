const form = document.getElementById("form");
const text = document.getElementById("text");
const ul = document.getElementById("ul");

const API_KEY =
  "test_efb42ba6f037a09fa65e28125f10993901f1b04a6a72fa38874476df6649b33021322271e4aa69d519c1f1c287a7bf59";

function request(path) {
  return fetch(`https://open.api.nexon.com/fconline/v1${path}`, {
    headers: {
      "x-nxopen-api-key": API_KEY,
    },
  });
}

// 계정 식별자(ouid) 조회
function getUserOuid(characterName) {
  return request(`/id?nickname=` + characterName)
    .then(response => response.json())
    .then(data => data.ouid)
    .then(ouid => {
      // 기본 정보 조회
      return request("/user/basic?ouid=" + ouid);
    })
    .then(response => response.json())
    .catch(console.error);
}

function userList() {
  getUserOuid(text.value).then(({ level, nickname }) => {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";

    li.innerText = `레벨: ${level} 닉네임: ${nickname}`;
    ul.appendChild(li);
    li.append(deleteButton);

    deleteButton.addEventListener("click", () => {
      ul.removeChild(li);
    });
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!text.value) {
    alert("다시 입력하세요.");
    return;
  }

  userList(text.value);
  text.value = "";
});