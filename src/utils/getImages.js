export const getImage = image => {
    switch(image){
        case "logo":return require("../assets/images/logo.png")
        case "booking":return require("../assets/images/booking.png")
        case "user":return require("../assets/images/user.png")
    }
}