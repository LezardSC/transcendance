import { get_csrf_token } from "./ApiCalls.js";
import { isLoggedIn } from "./Utils.js";

//fill pages with user infos
async function injectUserData() {
	if (isLoggedIn())
	{
		var userInfos = await getUserData();
		
		Object.keys(userInfos).forEach((info) => {
			var usernameDivs = document.querySelectorAll("." + info + "Dynamic");
			usernameDivs.forEach((div) => {
				if (div.tagName === "INPUT") div.value = userInfos[info];
				else if (div.tagName === "IMG") div.setAttribute("src", "data:image/png;base64," + userInfos[info]);
				else div.innerHTML = userInfos[info];
			});
		});
	}
}

async function getUserData(dataElement) {
  return fetch("https://127.0.0.1:8000/api/users/get_user_data/", {
    method: "POST",
    headers: {
      "X-CSRFToken": await get_csrf_token(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
  })
    .then((response) =>
      response.json().then((data) => ({ statusCode: response.status, data }))
    )
    .then(({ statusCode, data }) => {
      if (statusCode === 200) {
        if (dataElement) return data.user[dataElement];
        else return data.user;
      } else console.log("User not Logged in:", data.error);
    })
    .catch((error) => {});
}

export { getUserData, injectUserData };