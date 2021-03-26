function convertToRoman(num) {
    const roman_numerals = {
        "M": 1000,
        "CM": 900,
        "D": 500,
        "CD": 400,
        "C": 100,
        "XC": 90,
        "L": 50,
        "XL": 40,
        "X": 10,
        "IX": 9,
        "V": 5,
        "IV": 4,
        "I": 1
    }

    let roman_num = "";

    for (let unit in roman_numerals) {
        while (roman_numerals[unit] <= num) {
            roman_num += unit;
            num -= roman_numerals[unit];
        }
    }

    return roman_num;
}