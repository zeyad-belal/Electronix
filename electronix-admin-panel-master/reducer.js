const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_BRANDS":
      return { ...state, brands: action.payload };
    case "LOADING":
      return { ...state, loading: true };
    case "DISPLAY_DATA":
      return { ...state, loading: false };
    case "DELETE_ITEM":
      return {
        ...state,
        confirmDeletion: true,
        module: action.payload.module,
        toBeDeletedItem: action.payload.id,
      };
    case "CANCEL_DELETION":
      return {
        ...state,
        confirmDeletion: false,
        module: "",
        toBeDeletedItem: "",
      };
    case "DELETE_CATEGORY":
      const newCategories = state.categories.filter(
        (cat) => cat._id != action.payload
      );
      return {
        ...state,
        categories: newCategories,
        confirmDeletion: false,
        module: "",
        toBeDeletedItem: "",
      };
    case "DELETE_PRODUCT":
      const newProducts = state.products.filter(
        (prod) => prod._id != action.payload
      );
      return {
        ...state,
        products: newProducts,
        confirmDeletion: false,
        module: "",
        toBeDeletedItem: "",
      };
    case "DELETE_BRAND":
      const newBrs = state.brands.filter((br) => br._id != action.payload);
      return {
        ...state,
        brands: newBrs,
        confirmDeletion: false,
        module: "",
        toBeDeletedItem: "",
      };
    case "DELETE_USER":
      const newUsers = state.users.filter((user) => user._id != action.payload);
      return {
        ...state,
        users: newUsers,
        confirmDeletion: false,
        module: "",
        toBeDeletedItem: "",
      };
    case "UPDATE_CATEGORY":
      const newCats = state.categories.map((cat) => {
        if (cat._id == action.payload.id) {
          return action.payload;
        }
        return cat;
      });
      return { ...state, categories: newCats };
    case "CREATE_CATEGORY":
      const newCates = [...state.categories, action.payload];
      return { ...state, categories: newCates };
    case "UPDATE_USER":
      const users = state.users.map((user) => {
        if (user._id == action.payload.id) {
          return action.payload;
        }
        return user;
      });
      return { ...state, users: users };
    case "ADD_USER":
      const newUs = [...state.users, action.payload];
      return { ...state, users: newUs };
    case "LOGIN":
      return { ...state, loggedIn: true, loggedInUser: action.payload };
    case "PROFILE_POPUP":
      const toggle = state.profilePopup;
      return { ...state, profilePopup: !toggle };
    case "LOGOUT":
      return { ...state, loggedIn: false, profilePopup: false };
    case "ADD_PRODUCT":
      const newProds = [...state.products, action.payload];
      return { ...state, products: newProds };
    case "UPDATE_PRODUCT":
      const prods = state.products.map((prod) => {
        if (prod._id == action.payload.id) {
          return action.payload;
        }
        return prod;
      });
      return { ...state, products: prods };
    case "ADD_BRAND":
      const newBrands = [...state.brands, action.payload];
      return { ...state, brands: newBrands };
    case "UPDATE_BRAND":
      const brs = state.brands.map((brand) => {
        if (brand._id == action.payload.id) {
          return action.payload;
        }
        return brand;
      });
      return { ...state, brands: brs };
    case "LOAD_LOGGED_IN_USER":
      return { ...state, loggedInUser: action.payload };
    default:
      return state;
  }
};

export default reducer;
