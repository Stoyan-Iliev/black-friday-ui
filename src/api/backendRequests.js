import axios from "axios";

const BASE_URL = "http://localhost:8080/blackFriday/api";

const backendRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json",
  },
});

const backendFormDataRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "content-type": "multipart/form-data",
    Authorization: "Bearer",
  },
});

function buildFormDataWithUpload(product, images) {
  const formData = new FormData();
  formData.append(
    "product",
    new Blob([JSON.stringify(product)], {
      type: "application/json",
    })
  );
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }
  return formData;
}

function buildFormData(item) {
  const formData = new FormData();
  formData.append("item", item);
  return formData;
}

export function signIn(credentials) {
  return backendRequest.post("/auth/signin", credentials);
}

export function signUp(user) {
  return backendRequest.post("/auth/signup", user);
}

export function upgradeUser(upgradeRequestJson, token) {
  return axios
    .create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .post("/user/upgrade", upgradeRequestJson);
}

export function createCampaign(campaign, token) {
  return axios
    .create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .post("/createCampaign", campaign);
}

export function createProduct(product, images, token) {
  return axios
    .create({
      baseURL: BASE_URL,
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .post("/product", buildFormDataWithUpload(product, images));
}

export function updateProduct(product, token) {
  return axios
    .create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .put(`/product/${product.id}`, product);
}

export function makePurchase(products, token) {
  return axios
    .create({
      baseURL: BASE_URL,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .post("/purchase", products);
}

export function getIncome(startDate, endDate, token) {
  return axios
    .create({
      baseURL: BASE_URL,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .get(`/purchase/income?startDate=${startDate}&endDate=${endDate}`);
}

export function addProductToCampaign(product, campaignName, token) {
  return axios
    .create({
      baseURL: BASE_URL,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .put(`/addProductsToCampaign?name=${campaignName}`, product);
}

export function getProductById(id) {
  return backendRequest.get("/product/" + id);
}

export function getAllProducts() {
  return backendRequest.get("/products");
}

export function getProductsByCategory(category) {
  return backendRequest.get(`/products/${category}`);
}

export function getAllCampaigns() {
  return backendRequest.get("/campaigns");
}

export function verifyEmail(code) {
  return backendRequest.get(`/user/verify?code=${code}`);
}
