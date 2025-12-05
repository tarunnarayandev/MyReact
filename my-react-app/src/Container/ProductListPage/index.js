import React, { useState, useCallback, useEffect } from "react";
import { productData } from "./data";
import "./style.css";
import { MyDebounce } from "../../utility/commonUtils";
import { FilterProducts } from "../../components/FilterProducts";
export const ProductListPage = () => {
  const [productList, setProductList] = useState(productData);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = MyDebounce(searchText, 1000);
  const performSearch = useCallback(
    (text, products = productList) => {
      let searchedProducts = products.filter((obj) => {
        return Object.values(obj).some(
          (val) => val !== null && String(val).toLowerCase().includes(text)
        );
      });
      setProductList(searchedProducts);
    },
    [productList]
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value?.trim());
  };

  useEffect(() => {
    if (debouncedSearchText) performSearch(debouncedSearchText);
    else setProductList(productData);
  }, [debouncedSearchText]);

  const onFilterChange = (filterValue) => {
    performSearch(filterValue, productData);
  };

  return (
    <>
      <div>
        <div>
          <input
            id="search"
            placeHolder="search items here"
            onChange={handleSearch}
          />
        </div>
        <div>
          <FilterProducts
            onFilterChange={onFilterChange}
            productList={productData}
          />
        </div>
        <div className="cards-container">
          {productList?.map((item, index) => {
            return (
              <div className="flexColumn marginTop16 cards" key={index}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="product-image"
                />
                <div className="card-item">{item.name}</div>
                <div className="card-item">{item.type}</div>
                <div className="card-item">{item.cost}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
