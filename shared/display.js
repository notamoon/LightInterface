const pushUpdate = require("../routes/api.js").pushUpdate
let display = {
    inputType: "simple",
    displayWidth: 30,
    displayHeight: 20,
    simple: {
        message: "Hello World!",
        textColor: 16777215,
        textHexColor: "#ffffff",
        borderColor: 16777215,
        borderHexColor: "#ffffff",
        scroll: true,
        speed: 3,
        brightness: 255,
    },
    twoline: {
        topMessage: "Hello World!",
        topTextColor: 16777215,
        topTextHexColor: "#ffffff",
        topScroll: true,
        topSpeed: 3,

        bottomMessage: "Hello World!",
        bottomTextColor: 16777215,
        bottomTextHexColor: "#ffffff",
        bottomScroll: true,
        bottomSpeed: 3,

        borderColor: 16777215,
        borderHexColor: "#ffffff",
        brightness: 255,
    },
    image: {
        brightness: 255,
    }
};

function getDisplay() {
    return display;
}

function updateDisplay(_display, inputType) {
    if (inputType === "simple") {
        _display.textColor = hexToRGB(_display.textHexColor)
        _display.borderColor = hexToRGB(_display.borderHexColor)
    } else if (inputType === "twoline") {
        _display.topTextColor = hexToRGB(_display.topTextHexColor)
        _display.bottomTextColor = hexToRGB(_display.bottomTextHexColor)
        _display.borderColor = hexToRGB(_display.borderHexColor)
    } else if (inputType === "image") {
        for (let col = 0; col < getDisplay().displayWidth; col++) {
            for (let row = 0; row < getDisplay().displayHeight; row++) {
                _display.image[col][row] = hexToRGB(_display.image[col][row].toString().substring(0, 6))
            }
        }
    }

    display.inputType = inputType;
    display[inputType] = _display;
    pushUpdate()
}

function hexToRGB(hex) {
    hex = hex.replace("#", "")

    let rgb = parseInt(hex.substring(0, 2), 16)
    rgb = (rgb << 8) + parseInt(hex.substring(2, 4), 16)
    rgb = (rgb << 8) + parseInt(hex.substring(4, 6), 16)

    return rgb
}

module.exports.getDisplay = getDisplay;
module.exports.updateDisplay = updateDisplay;

module.exports.getType = () => display.inputType;
module.exports.getData = () => display[display.inputType];