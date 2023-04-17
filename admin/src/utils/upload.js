import axios from "axios";

const upload = async (files) => {
  const data = new FormData();

  data.append("upload_preset", "upload");
  const urls = [];

  for (const file of files) {
    data.append("file", file);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/congbvfx17330/image/upload",
        data
      );
      const { url } = res.data;
      urls.push(url);
    } catch (err) {
      console.log(err);
    }
  }
  return urls;
};

export default upload;
