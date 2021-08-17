import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [place, setPlace] = useState("");
  const [categories,setCategories] = useState("yearly")
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      quantity,
      price,
      place,
      categories
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="write Something...."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div>
            <input
              type="text"
              placeholder="what is quentity"
              className="writeInput"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="what is price"
              className="writeInput"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="what is place"
              className="writeInput"
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div>
            <label>
              What is your Type:
              <select value={categories} onChange={(e) => setCategories(e.target.value)}>
                <option value="yearly">Yearly</option>
                <option value="sesonal">sesonal</option>
              </select>
            </label>
          </div>
        </div>

        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
