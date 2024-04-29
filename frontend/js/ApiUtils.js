import { resetForm, toggleConfirmPasswordModal } from "./DashboardUtils.js";
import { showAlert } from "./Utils.js";
import { injectUserData } from "./User.js";

async function get_csrf_token() {
	return fetch("https://127.0.0.1:8000/api/users/get_csrf_token/", {
		method: "GET",
		credentials: "include",
	})
		.then((response) => response.json())
		.then((data) => data.csrfToken)
		.catch((error) => {
			console.error("get csrf token fail", error);
		});
}

async function runEndPoint(endpoint, fetchBody) {
	return fetch("https://127.0.0.1:8000/api/" + endpoint, {
		method: "POST",
		headers: {
			"X-CSRFToken": await get_csrf_token(),
			Accept: "application/json",
		},
		credentials: "include",
		body: fetchBody,
	})
		.then((response) => {
			return response.json().then((data) => {
				return { statusCode: response.status, data };
			});
		})
		.catch((error) => {
			console.error("Authentification failed", error);
			return error;
		});
}

async function updateInfo(endpoint, fetchBody, modalToDismiss) {
	var response = await runEndPoint(endpoint, fetchBody);
	var data = response.data;

	if (response.statusCode === 200) {
		showAlert(data.status, "success");
		toggleConfirmPasswordModal(modalToDismiss);
		resetForm();
		injectUserData();
	} else if (data.error && data.error.length > 0) showAlert(data.error);
	else showAlert("Profile update Error");
	return response;
}

export { get_csrf_token, runEndPoint, updateInfo }