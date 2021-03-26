function rot13(str) {

    function decipher(char) {
        // Translates character ASCII codes and assigns its new value.
        let newCharCode = char.charCodeAt(0) + 13;
        if (newCharCode > 90) {
            newCharCode = newCharCode - 26;
        }
        return String.fromCharCode(newCharCode);
    }

    let translated_code = str.split("")
        .map(x => {
            if (/\w/.test(x)) {
                return decipher(x)
            }
            else return x;
        })
        .join("");

    return translated_code;
}