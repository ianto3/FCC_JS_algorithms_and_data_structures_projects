function telephoneCheck(str) {
    let regex = /^1?\s?((?:\(\d{3}\))|(?:\w{3}))[-\s]?(?:\w{3})[-\s]?(?:\w{4})$/;
    return regex.test(str);
}