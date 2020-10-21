import React from "react";
import { useRef, useCallback } from "react";

/**
 * 
 * @param {
    * lazyLoading // true || false
    * lazyOptions // {} - options for observer
    * lazyCallback // function - callback for observer
    * styles // "" - class to img
    * src // "" - class to img
    * alt // "" - img alt
    * onLoad // function - run onload
    * } props 
    */

const ImageLoader = (props) => {
  const {
    lazyLoading = true,
    lazyOptions = {
      root: null,
      threshold: 0,
      rootMargin: "0px 0px 100px 0px",
    },
    lazyCallback = (imgRef, observer) => {
      if (imgRef.isIntersecting) {
        console.log("lazyCallback", imgRef);
        imgRef.target.src = src;
        imgRef.target.classList.remove("lazy-loading");
        observer.current.unobserve(imgRef.target);
        observer.current.disconnect();
      } else {
      }
    },
    styles = "",
    src,
    onLoad,
    alt,
  } = props;

  const observer = useRef();

  const imgElementRef = useCallback((node) => {
    observer.current = new IntersectionObserver((entries) => {
      lazyCallback(entries[0], observer);
    }, lazyOptions);
    if (node) observer.current.observe(node);
  }, [observer]);

  return (
    <img
      ref={lazyLoading && imgElementRef || observer}
      className={(lazyLoading ? "lazy-loading " : "") + styles}
      // loading="lazy"
      //data-lazy-src={lazyLoading ? src : null}
      onLoad={onLoad || null}
      src={"IntersectionObserver" in window && lazyLoading ? null : src}
      alt={alt || null}
    />
  );
};

export default ImageLoader;
