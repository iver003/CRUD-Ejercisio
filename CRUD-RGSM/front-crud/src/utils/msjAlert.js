export const msgOk = (msg) => {
	Swal.fire({
		title: "Exito!",
		text: msg,
		icon: "success",
		confirmButtonText: "Ok",
	});
};

export const msgError = (msg) => {
	Swal.fire({
		title: "Error!",
		text: msg,
		icon: "error",
		confirmButtonText: "Ok",
	});
};
