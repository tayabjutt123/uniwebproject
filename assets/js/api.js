// Assignment 03: API integration using Axios and a public JSON endpoint.
const API_URLS = [
  "https://dummyjson.com/products",
  "https://fakestoreapi.com/products"
];
let allProducts = [];

const apiSearchInput = document.getElementById("a3-api-search");
const apiGrid = document.getElementById("a3-api-grid");
const apiLoading = document.getElementById("a3-api-loading");
const apiError = document.getElementById("a3-api-error");
const apiRetryButton = document.getElementById("a3-api-retry");

function showApiLoading(isLoading) {
  if (!apiLoading) return;
  apiLoading.classList.toggle("hidden", !isLoading);
  apiLoading.classList.toggle("flex", isLoading);
}

function showApiError(isVisible) {
  if (!apiError) return;
  apiError.classList.toggle("hidden", !isVisible);
}

function renderApiCards() {
  if (!apiGrid) return;

  const searchText = (apiSearchInput ? apiSearchInput.value : "").trim().toLowerCase();

  const filteredProducts = allProducts.filter((product) => {
    const searchableText = `${product.title || ""} ${product.category || ""} ${product.description || ""}`.toLowerCase();
    return searchableText.includes(searchText);
  });

  if (!filteredProducts.length) {
    apiGrid.innerHTML = `
      <div class="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
        <p class="text-lg font-semibold text-slate-700">No products found</p>
        <p class="mt-2 text-sm text-slate-500">Try a different keyword to refine your search.</p>
      </div>
    `;
    return;
  }

  // map() builds the responsive API cards.
  apiGrid.innerHTML = filteredProducts.map((product) => {
    const imageUrl = product.thumbnail || product.images?.[0] || "https://placehold.co/600x400/e2e8f0/334155?text=Product";
    const priceValue = product.price ?? "N/A";
    const categoryValue = product.category || "General";
    const titleValue = product.title || "Unnamed product";
    const descriptionValue = product.description || "No description available.";

    return `
      <article class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
        <img src="${imageUrl}" alt="${titleValue}" class="h-52 w-full object-cover" />
        <div class="p-5">
          <div class="flex items-center justify-between gap-3">
            <span class="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-700">${categoryValue}</span>
            <span class="text-lg font-black text-slate-900">$${priceValue}</span>
          </div>

          <h3 class="mt-4 text-xl font-bold text-slate-900">${titleValue}</h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">${descriptionValue}</p>

          <div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <span class="text-sm font-semibold text-slate-500">Rating: ${product.rating ?? "N/A"}</span>
            <span class="text-sm font-bold text-emerald-600">In stock</span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

async function fetchProductsWithFallback() {
  if (typeof axios === "undefined") {
    showApiError(true);
    apiGrid.innerHTML = "";
    return;
  }

  for (const url of API_URLS) {
    try {
      const response = await axios.get(url);
      const products = response.data?.products || response.data || [];
      allProducts = Array.isArray(products) ? products : [];
      renderApiCards();
      return;
    } catch (error) {
      console.warn(`API failed for ${url}:`, error.message);
    }
  }

  showApiError(true);
  apiGrid.innerHTML = "";
}

async function loadProducts() {
  if (!apiGrid || !apiLoading || !apiError) return;

  showApiLoading(true);
  showApiError(false);

  try {
    await fetchProductsWithFallback();
  } catch (error) {
    console.error("API request failed:", error);
    showApiError(true);
    if (apiGrid) apiGrid.innerHTML = "";
  } finally {
    showApiLoading(false);
  }
}

if (apiSearchInput) {
  apiSearchInput.addEventListener("input", renderApiCards);
}

if (apiRetryButton) {
  apiRetryButton.addEventListener("click", loadProducts);
}

document.addEventListener("DOMContentLoaded", loadProducts);
loadProducts();
