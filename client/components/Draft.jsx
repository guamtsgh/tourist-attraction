import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Draft.css";
// import TagList from "./TagList";

function Draft() {
  const [serverData, setServerData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [delayTime, setDelayTime] = useState(null);

  useEffect(() => {
    // searchData(inputText);
    if (delayTime) {
      clearTimeout(delayTime);
    }

    setDelayTime(setTimeout(() => searchData(inputText), 500));
  }, [inputText]);

  async function searchData(keyword, event) {
    try {
      const response = await axios.get(
        `https://tourist-atrraction-be.onrender.com/trips?keywords=${keyword}`
      );
      // console.log(keyword);
      // console.log(response.data.data);
      setServerData(response.data.data);
    } catch (error) {
      alert(error);
    }
  }

  function handleOnClick(tag) {
    setInputText(tag);
  }

  return (
    <div className="container">
      <p className="title">เที่ยวไหนดี</p>
      <div className="search">
        <input
          type="text"
          onChange={(event) => {
            setInputText(event.target.value);
          }}
          value={inputText}
          placeholder="ค้นหาที่เที่ยว"
        />
        <p className="l center gray">หาที่เที่ยวแล้วไปกัน ...</p>
        <hr />
      </div>

      <div className="resultContainer">
        {serverData.map((item) => {
          return (
            <div key={item.eid} className="resultList">
              <div className="image">
                <img src={item.photos[0]} alt="" />
              </div>
              <div className="data">
                <p className="xxl bold">{item.title}</p>
                <p className="fontDetail">
                  {item.description.substring(0, 100) + "... "}
                  <a href={item.url} target="_blank">
                    อ่านต่อ
                  </a>
                </p>
                <p className="fontDetail">
                  <span>หมวด </span>
                  <span className="tag">
                    {item.tags.map((tag, index) => {
                      if (index === item.tags.length - 1) {
                        return (
                          <span key={index}>
                            <span> และ </span>
                            <a
                              href="#"
                              className="l gray tag"
                              onClick={() => {
                                handleOnClick(tag);
                              }}
                            >
                              {tag}
                            </a>
                          </span>
                        );
                      }
                      return (
                        <a
                          href="#"
                          className="l gray tag"
                          key={index}
                          onClick={() => {
                            handleOnClick(tag);
                          }}
                        >
                          {tag}
                        </a>
                      );
                    })}
                  </span>
                </p>
                <div className="imgAndLink">
                  <div className="picList">
                    <img src={item.photos[1]} alt="" />
                    <img src={item.photos[2]} alt="" />
                    <img src={item.photos[3]} alt="" />
                  </div>
                  {/* <a href={item.url}>
                    <button>
                      <img src="" alt="" />
                    </button>
                  </a> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Draft;
