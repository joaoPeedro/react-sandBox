import React from "react";
import useDataFetching from "./hook/useDataFetching";
import ImageLoader from "./ui-components/media/ImageLoader";

const DataFetching = () => {
  const [posts, setPosts] = useDataFetching(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const [{ data, dataState }, setAlbums] = useDataFetching(
    "https://jsonplaceholder.typicode.com/albums"
  );

  console.log(posts);

  /*   setTimeout(() => {
    ;
  }, 2000); */

  const imgList = [
    "https://picsum.photos/1600/500?random=1",
    "https://picsum.photos/1600/500?random=2",
    "https://picsum.photos/1600/500?random=3",
    "https://picsum.photos/1600/500?random=4",
    "https://picsum.photos/1600/500?random=5",
    "https://picsum.photos/1600/500?random=6",
    "https://picsum.photos/1600/500?random=7",
    "https://picsum.photos/1600/500?random=8",
    "https://picsum.photos/1600/500?random=9",
    "https://picsum.photos/1600/500?random=10",
    "https://picsum.photos/1600/500?random=11",
    "https://picsum.photos/1600/500?random=12",
    "https://picsum.photos/1600/500?random=13",
    "https://picsum.photos/1600/500?random=14",
    "https://picsum.photos/1600/500?random=15",
    "https://picsum.photos/1600/500?random=17",
    "https://picsum.photos/1600/500?random=18",
    "https://picsum.photos/1600/500?random=19",
    "https://picsum.photos/1600/500?random=20",
    "https://picsum.photos/1600/500?random=21",
    "https://picsum.photos/1600/500?random=22",
    "https://picsum.photos/1600/500?random=23",
    "https://picsum.photos/1600/500?random=24",
    "https://picsum.photos/1600/500?random=25",
    "https://picsum.photos/1600/500?random=26",
    "https://picsum.photos/1600/500?random=27",
    "https://picsum.photos/1600/500?random=28",
    "https://picsum.photos/1600/500?random=29",
    "https://picsum.photos/1600/500?random=30",
    "https://picsum.photos/1600/500?random=31",
    "https://picsum.photos/1600/500?random=32",
    "https://picsum.photos/1600/500?random=33",
    "https://picsum.photos/1600/500?random=34",
    "https://picsum.photos/1600/500?random=35",
    "https://picsum.photos/1600/500?random=37",
    "https://picsum.photos/1600/500?random=38",
    "https://picsum.photos/1600/500?random=39",
    "https://picsum.photos/1600/500?random=40",
    "https://picsum.photos/1600/500?random=41",
    "https://picsum.photos/1600/500?random=42",
    "https://picsum.photos/1600/500?random=43",
    "https://picsum.photos/1600/500?random=44",
    "https://picsum.photos/1600/500?random=45",
    "https://picsum.photos/1600/500?random=47",
    "https://picsum.photos/1600/500?random=48",
    "https://picsum.photos/1600/500?random=49",
    "https://picsum.photos/1600/500?random=50",
    "https://picsum.photos/1600/500?random=51",
    "https://picsum.photos/1600/500?random=52",
    "https://picsum.photos/1600/500?random=53",
    "https://picsum.photos/1600/500?random=54",
    "https://picsum.photos/1600/500?random=55",
    "https://picsum.photos/1600/500?random=57",
    "https://picsum.photos/1600/500?random=58",
    "https://picsum.photos/1600/500?random=59",
  ];

  return (
    <>
      {imgList.map((item, idx) => {
        return (
          <div key={`img-${idx}`} style={{minHeight: '504px'}}>
            <ImageLoader src={item} lazyLoading={true} onLoad={(e)=> console.log("load bitch", e.target)} />
          </div>
        );
      })}

      <div>
        {posts.dataState === "PENDING" ? (
          <h4>Loading Posts</h4>
        ) : posts.dataState === "REJECTED" ? (
          <h4>ERROR</h4>
        ) : (
          <ul>
            <div onClick={() => setPosts()}>
              <h3>new bitch call</h3>
            </div>
            {posts.data &&
              posts.data.map((post) => {
                return <li key={post.id}>{post.title}</li>;
              })}
          </ul>
        )}

        <hr />

        {dataState === "PENDING" ? (
          <h4>Loading albums</h4>
        ) : dataState === "REJECTED" ? (
          <h4>ERROR</h4>
        ) : (
          <ul>
            {data &&
              data.map((album) => {
                return <li key={album.id}>{album.title}</li>;
              })}
          </ul>
        )}
      </div>
    </>
  );
};

// https://jsonplaceholder.typicode.com/posts
//https://jsonplaceholder.typicode.com/albums

export default DataFetching;
