import React, { useState, useCallback, useEffect } from "react";
import { productData } from "./data";
import "./style.css";
import { MyDebounce } from "../../utility/commonUtils";
export const ProductListPage = () => {
  const [productList, setProductList] = useState(productData);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = MyDebounce(searchText, 1000);

  const performSearch = useCallback(
    (text) => {
      let searchedProducts = productList.filter((obj) => {
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
    if (debouncedSearchText) {
      performSearch(debouncedSearchText);
    } else {
      setProductList(productData);
    }
  }, [debouncedSearchText]);

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
