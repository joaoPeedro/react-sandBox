import React, { useState, useEffect, useRef, useCallback } from "react";
import useDataFetching from "../hook/useDataFetching";

import SubCategories from "./SubCategories";
import { memo } from "react";

  //DUMMY COMPONENT
  const Slider = (props) => {
    return (
      <div
        style={{
          backgroundColor: "green",
          minHeight: 400 + "px",
          margin: 10 + "px",
        }}
      >
        Slider da cat {props.cat}
      </div>
    );
  };
  //DUMMY DATA
  const imgList = [
    {
      img: "https://picsum.photos/575/220?random=1",
      url: "cate1",
    },
    {
      img: "https://picsum.photos/575/220?random=2",
      url: "cate1",
    },
    {
      img: "https://picsum.photos/575/220?random=3",
      url: "cate1",
    },
  ];

const CatalogVodsContainer = () => {
  // map of component to render
  // 1 = slider , 2 = slider, 3 = SubCategories
  const [componentType, setComponentType] = useState(1); 
  
  const [subCategories, setSubCategories] = useDataFetching("https://jsonplaceholder.typicode.com/posts");
  const [totalSubCategories, setTotalSubCategories] = useState(0);
  const [hasMoreCategories, setHasMoreCategories] = useState(true);
  // render (vod || subCategories) position 
  const [position, setPosition] = useState(0);

  const [componentsToReturn, setComponentsToRender] = useState([]);

  
  // vod || subCategories
  const [items, setItems] = useDataFetching();
  // Case a rental slider
  const [rentals, setRentals] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (subCategories.data && subCategories.dataState === "FULFILLED") {
      console.log("subCategories", subCategories)
      // setLoading(false)
      setTotalSubCategories(subCategories.data.length - 1);
      setHasMoreCategories(true);
      itemToRender();
    }
  }, [subCategories]);

  useEffect(() => {
    totalSubCategories <= position
      ? setHasMoreCategories(false)
      : setHasMoreCategories(true);
  }, [position]);

  useEffect(() => {
    if (items.data && items.dataState === "FULFILLED") {
      
      setComponentsToRender((componentsToReturn) => [
        ...componentsToReturn,
        <Slider cat={`${items.data.title} - ${items.data.id}`} />,
      ]);

      // if a rental
      // get second slider with related rentals
      if (rentals) {
        setRentals(false);
        setItems(`https://jsonplaceholder.typicode.com/posts/${position + 1}`);
        setComponentType(3);
      } else {
        setLoading(false);
      }
    }

  }, [items.data]);

  const itemToRender = () => {

    if (position === 5 && componentType === 1) {
      if (true) { // case Rentals
        setRentals(true);
        setLoading(true);
        setItems(`https://jsonplaceholder.typicode.com/posts/${position + 1}`);
        return;
      }
    }

    switch (componentType) {
      case 1: // mount slider
        setLoading(true);
        setItems(`https://jsonplaceholder.typicode.com/posts/${position + 1}`);
        setComponentType(2);
        setPosition((currentState) => currentState + 1);
        break;
      case 2: // mount slider
        setLoading(true);
        setItems(`https://jsonplaceholder.typicode.com/posts/${position + 1}`);
        setComponentType(3);
        setPosition((currentState) => currentState + 1);
        break;
      case 3: // mount SubCategories if SubCategories to show >= 3
        setLoading(true);
        // caso exista menos de 3 categorias a mostrar
        if (totalSubCategories - position < 3) {
          setLoading(true);
          setItems(
            `https://jsonplaceholder.typicode.com/posts/${position + 1}`
          );
          setComponentType(1);
          setPosition((currentState) => currentState + 1);
        } else {
          setComponentsToRender((componentsToReturn) => [
            ...componentsToReturn,
            <SubCategories items={imgList} lazyLoad={true} />,
          ]);
          setComponentType(1);
          setPosition((currentState) => currentState + 3);
          setLoading(false);
        }
        break;

      default:
        break;
    }
  };

  /**
   * Observer
   */

  let options = {
    root: null,
    threshold: 0,
    rootMargin: "0px 0px 100px 0px",
  };
  const observer = useRef();
  const lastComponentRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreCategories) {
          if (loading) return;

          itemToRender();
          observer.current.unobserve(entries[0].target);
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    [loading, position, componentType, hasMoreCategories, totalSubCategories]
  );

  return (
    <React.Fragment>
      {componentsToReturn &&
        componentsToReturn.map((component, idx) => {
          if (componentsToReturn.length === idx + 1) {
            return (
              <div
                key={`catalog-vod-${idx}`}
                ref={lastComponentRef}
              >
                {component}
              </div>
            );
          } else {
            return <div key={`catalog-vod-${idx}`}>{component}</div>;
          }
        })}
      {/* <SubCategories items={imgList} /> */}
      {/* Como as categorias já estão carregadas só vai fazer o loading do slider */}
      {loading ? `LOADING.... slider` : ""}
    </React.Fragment>
  );
};

export default CatalogVodsContainer;
