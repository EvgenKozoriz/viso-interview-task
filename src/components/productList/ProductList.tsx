import React, { useState, useEffect } from "react";
import { debounce } from "../../utils/debounce";
import { Product } from "../../types";
import {
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap";
import ProductCard from "../productCard/ProductCard";
import { fetchProducts } from "../../API/fetchProducts";
import ErrorAlert from "../errorAlert/ErrorAlert";

const ProductList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage: number = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const applyFiltersAndPaginate = () => {
      let filteredProducts = products;
      if (category !== "All") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }

      if (searchTerm !== "") {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

      const paginatedProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );

      return paginatedProducts;
    };

    setFilteredProducts(applyFiltersAndPaginate());
  }, [category, searchTerm, currentPage, products]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const debouncedSearch = debounce((term: string) => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, 500);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <h2 className="mt-5">Product List</h2>
      {error && <ErrorAlert errorMessage={error} />}
      <Row className="mb-3">
        <Col sm={6}>
          <Form.Label>Filter by Category:</Form.Label>
          <Form.Select value={category} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
          </Form.Select>
        </Col>
        <Col sm={6}>
          <Form.Label>Search:</Form.Label>
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>
      {loading && (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      )}
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} sm={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <Pagination className="d-flex justify-content-center align-items-center">
        {Array.from({
          length: Math.ceil(products.length / productsPerPage),
        }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default ProductList;
