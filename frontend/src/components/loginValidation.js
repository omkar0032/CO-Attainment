function Validation(values) {
    alert("")
    let error = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (values.email === "") {
        error.email = "Name should not be empty"
    }
    else if (!emailPattern.test(values.email)) {
        error.email = "email didint match"
    }
    else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = "password should not be empty"
    }
    else if (!passwordPattern.test(values.password)) {
        error.password = "password didint match"
    }
    else {
        error.password = "";
    }
    return error;
}

export default Validation;
