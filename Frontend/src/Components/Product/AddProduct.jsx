import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import constants from "../../constants/constants";

const uploadImage = async ({ image, productID }) => {
  const data = new FormData();
  data.append("image", image);
  // data.append("productDetails", productDetails);
  data.append("productID", productID);

  const upload = await axios.post(
    `${constants.API_BASE_URL}/product/upload`,
    data,
    {
      headers: {
        // Authorization: Cookies.get(constants.authorization_token),
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return upload.data;
};

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState();
  const navigate = useNavigate();
  const TextFieldStyle = {
    width: "280px",
    margin: "10px auto",
    padding: "5px",
  };
  const categories = ["Dairy", "Meat", "Bakery", "Frozen Food", "Other"];
  let productID;
  // const handleImageFile = useRef();
  const handleImageFile = (e) => {
    const imageFile = e.target.files[0];

    setImageFile(imageFile);
  };
  const handleChange = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(productDetails);

    await axios
      .post(`${constants.API_BASE_URL}/product/add`, productDetails, {
        headers: {
          // Authorization: Cookies.get(constants.authorization_token),
        },
      })
      .then((response) => {
        console.log("Response received: ", response);
        if (response.data.success) {
          console.log("response.data.success", response.data.success);
          productID = response.data.product_id;
          alert(`Product with ID: ${productID} is added successfully`);
          navigate("/products");
        } else if (!response.data.success) {
          // navigate("/login");
          // navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });

    const uploadedImageURL = await uploadImage({
      image: imageFile,
      // productDetails,
      productID: productID,
    });
    console.log(uploadedImageURL);
  };

  return (
    <div>
      <h2>Add Product Form</h2>
      <form
        style={{
          border: "1px solid gray",
          borderRadius: "8px",
          width: "480px",
          textAlign: "center",
          margin: "20px auto",
          padding: "10px",
        }}
        onSubmit={handleOnSubmit}
      >
        {/* I referred the TextField element from: */}
        {/* https://mui.com/components/text-fields/ */}
        <div>
          <TextField
            style={TextFieldStyle}
            id="outlined-basic"
            label="Name"
            type="text"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
            helperText="Enter the Product Name"
            required
          />
        </div>
        <div>
          <TextField
            style={TextFieldStyle}
            id="outlined-basic"
            label="Description"
            type="text"
            name="description"
            value={productDetails.description}
            onChange={handleChange}
            helperText="Enter Description of the Product"
            multiline
            maxRows={3}
            required
          />
        </div>
        {/* I referred how to create a dropdown field from: */}
        {/* https://mui.com/components/text-fields/#select */}
        <div>
          <TextField
            style={TextFieldStyle}
            id="outlined-basic"
            select
            label="Category"
            SelectProps={{
              native: true,
            }}
            name="category"
            value={productDetails.category}
            onChange={handleChange}
            helperText="Select the Product Category"
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            style={TextFieldStyle}
            id="outlined-basic"
            label="Price"
            type="number"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
            helperText="Enter the Product Price"
            required
          />
        </div>
        <div>
          <TextField
            style={TextFieldStyle}
            id="outlined-basic"
            type="file"
            label="Product Image"
            name="image"
            inputProps={{ accept: "image/*" }}
            // inputRef={handleImageFile}
            // value={productDetails.image}
            onChange={handleImageFile}
            helperText="Upload an Image of the Product"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{
              width: "150px",
              textAlign: "center",
              margin: "8px",
              padding: "8px",
            }}
          >
            Add Product
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              navigate("/products");
            }}
            style={{
              width: "150px",
              textAlign: "center",
              margin: "8px",
              padding: "8px",
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
