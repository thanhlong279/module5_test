import axios from "axios";
const URL_PRODUCT = "http://localhost:8080/products?"
const URL_CATEGORY = "http://localhost:8080/categories"
export const getAllProducts = async (name, categoryId) => {
    try {
        let query = URL_PRODUCT;
        if (name) query += `name_like=${name}&`;
        if (categoryId) query += `categoryId=${categoryId}&`;
        query = query.slice(0, -1);
        let res = await axios.get(query);
        return res.data;
    } catch (e) {
        console.error("Error fetching data:", e);
        return { products: [], categories: [] };

    }
};
export const getAllGenres = async () => {
    try {
        let res = await axios.get(URL_CATEGORY);
        return res.data;
    } catch (e) {
        return [];
    }
}

export const saveProduct = async(product) => {
    try {
        await axios.post(URL_PRODUCT, product);
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}
