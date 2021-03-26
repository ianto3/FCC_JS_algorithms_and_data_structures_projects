function palindrome(str) {
    const normal = str.toLowerCase().match(/[^\W_]/g).join("")
    const reversed = normal.split("").reverse().join("")
    return normal === reversed ? true : false;
}