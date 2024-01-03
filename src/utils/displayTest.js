import getDate from "./dateformat";

const products = [
  //   {
  //     title: "Plain T-Shirt",
  //     price: "$7.99",
  //     imageUrl: require("../assets/product-images/TSHIRT.png"),
  //     focusColor: "bg-display-pink",
  //     navigationUrl: "/tshirt",
  //     data: {
  //       type: "tshirt",
  //       username: "Brooke",
  //       tshirtColor: "#0f0",
  //       image: "./logo.png",
  //     },
  //   },
  {
    title: "Backpack",
    price: "$12.99",
    imageUrl: require("../assets/product-images/BACKPACK.png"),
    focusColor: "bg-display-green",
    navigationUrl: "/backpack",
    data: {
      type: "backpack",
      created: getDate(),
      username: "Brooke",
      text: "Brooke",
      textColor: "#0ff",
      bagColor: "#0f0",
    },
  },
  {
    title: "Backpack",
    price: "$12.99",
    imageUrl: require("../assets/product-images/BACKPACK.png"),
    focusColor: "bg-display-green",
    navigationUrl: "/backpack",
    data: {
      type: "backpack",
      created: getDate(),
      username: "Brooke",
      text: "Another monk",
      textColor: "#000",
      bagColor: "#00f",
    },
  },
  {
    title: "Plain T-Shirt",
    price: "$7.99",
    imageUrl: require("../assets/product-images/TSHIRT.png"),
    focusColor: "bg-display-pink",
    navigationUrl: "/tshirt",
    data: {
      type: "tshirt",
      created: getDate(),
      username: "Brooke",
      tshirtColor: "#E8782A",
      image: "./shreekrishna.jpg",
    },
  },
];

export default products;
