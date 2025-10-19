export function filter(products) {
    const category = document.getElementById('category').value;
    const search = document.getElementById('search').value.toLowerCase();

    const filteredProducts = products.filter(product => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(search);
        return matchesCategory && matchesSearch;
    });

    return filteredProducts;
}