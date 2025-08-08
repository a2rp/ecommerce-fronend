const ProductCard = ({ product }) => {
    return (
        <div style={{ border: "1px solid #ccc", padding: 10, borderRadius: 10 }}>
            <img
                src={product.image} // ✅ directly use Cloudinary URL
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
