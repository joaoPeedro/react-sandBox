import React, {useMemo} from "react";
import ImageLoader from "../ui-components/media/ImageLoader";

const SubCategories = (props) => {
  const { items, lazyLoad } = props;
  // console.log(items, props);

  
  return (
    <section className="display-list sub-categories space-top space-bot">
      {useMemo(() => items && items.length > 0
        ? items.map((item, idx) => {
            return (
              <div className="img-holder" key={idx}>
                <a href={item.url} className="loading-img">
                  <ImageLoader
                    styles={""}
                    lazyLoading={lazyLoad}
                    src={item.img}
                    onLoad={(e) => e.target.parentElement.classList.remove("loading-img")}
                  />
                </a>
              </div>
            );
          })
        : "no images")}
    </section>
  );
};

export default SubCategories;
