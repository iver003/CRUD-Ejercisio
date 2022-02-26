const API = import.meta.env.VITE_API_URL;

export function apiGetAllPerson() {
	return fetch(`${API}/persons`).then((res) => res.json());
}

export function apiGetPerson(id) {
	return fetch(`${API}/person/${id}`).then((res) => res.json());
}

export function apiSetPerson(person) {
	return fetch(`${API}/person`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(person),
	}).then((res) => res.json());
}

export function apiUpdatePerson(id, person) {
	return fetch(`${API}/person/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(person),
	}).then((res) => res.json());
}

export function apiDeletePerson(id) {
	return fetch(`${API}/person/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
	}).then((res) => res.json());
}
