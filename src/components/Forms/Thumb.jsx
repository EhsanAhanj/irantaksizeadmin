import React, { useState, useEffect } from "react";
import Spiner from "../common/Spiner";

const Thumb = (props) => {
  const [loading, setloading] = useState(false);
  const [thumb, setthumb] = useState(undefined);
  const readFile = () => {
    let reader = new FileReader();

    reader.onloadend = () => {
      setloading(false);
      setthumb(reader.result);
    };
    reader.readAsDataURL(props.file);
  };
  useEffect(() => {
    if (!props.file) {
      return;
    }
    setloading(true);
    readFile();
  }, [props.file]);

  const { file, url, alt } = props;

  if (!file && url) {
    return (
      <img
        src={url}
        alt={alt}
        className="gallery-image brand-image-placeholder"
      />
    );
  }

  return (
    <div className="brand-image-placeholder">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "250px",
          }}
        >
          <Spiner />
        </div>
      ) : (
        <img src={thumb} alt={file.name} className="gallery-image" />
      )}
    </div>
  );
};
export default Thumb;
