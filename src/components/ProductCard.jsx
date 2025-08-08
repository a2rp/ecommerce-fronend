const ProductCard = ({ product }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:1198";

    return (
        <div style={{ border: "1px solid #ccc", padding: 10, borderRadius: 10 }}>
            <img
                src={`${backendUrl}${product.image}`} // ✅ Full image path
                alt={product.name}
                style={{ width: "100%", height: 200, objectFit: "cover" }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><b>₹{product.price}</b> | {product.category}</p>
        </div>
    );
};

export default ProductCard;

