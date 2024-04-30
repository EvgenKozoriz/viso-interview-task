import React from "react";
import { Card } from "react-bootstrap";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="mb-3" style={{ minHeight: "250px" }}>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Price: ${product.price}</Card.Text>
        <Card.Text>Rating: {product.rating}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;