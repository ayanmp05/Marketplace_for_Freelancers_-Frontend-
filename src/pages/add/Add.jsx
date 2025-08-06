import React, { useReducer, useState } from "react";
import { gigReducer, INITIAL_STATE } from "../reducers/gigReducer.js";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/mygigs")
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
  };

  return (
    <div className="add bg-gray-50 py-10">
  <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Gig</h1>
    <div className="sections grid grid-cols-1 lg:grid-cols-5 gap-12">
      {/* Left Section */}
      <div className="info lg:col-span-3 flex flex-col gap-6">
        <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="e.g. I will do something I'm really good at"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <label htmlFor="cat" className="block text-lg font-semibold text-gray-700">Category</label>
        <select name="cat" id="cat" onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition">
          <option value="design">Design</option>
          <option value="web">Web Development</option>
          <option value="animation">Animation</option>
          <option value="music">Music</option>
        </select>
        <div className="images border border-gray-200 rounded-lg p-4">
          <div className="imagesInputs flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-1 flex flex-col gap-2 w-full">
              <label htmlFor="coverImage" className="block text-md font-semibold text-gray-600">Cover Image</label>
              <input
                id="coverImage"
                type="file"
                onChange={(e) => setSingleFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100"
              />
              <label htmlFor="uploadImages" className="block text-md font-semibold text-gray-600 mt-2">Upload Images (Optional)</label>
              <input
                id="uploadImages"
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100"
              />
            </div>
            <button onClick={handleUpload} className="w-full sm:w-auto mt-4 sm:mt-8 px-6 py-2 border border-green-500 text-green-600 font-bold rounded-md hover:bg-green-50 transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
        <label htmlFor="desc" className="block text-lg font-semibold text-gray-700">Description</label>
        <textarea
          id="desc"
          name="desc"
          placeholder="Brief descriptions to introduce your service to customers"
          cols="0"
          rows="10"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        ></textarea>
        <button onClick={handleSubmit} className="w-full py-3 bg-green-600 text-white text-lg font-bold rounded-md hover:bg-green-700 cursor-pointer transition">Create</button>
      </div>

      {/* Right Section */}
      <div className="details lg:col-span-2 flex flex-col gap-6">
        <label htmlFor="shortTitle" className="block text-lg font-semibold text-gray-700">Service Title</label>
        <input
          id="shortTitle"
          type="text"
          name="shortTitle"
          placeholder="e.g. One-page web design"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <label htmlFor="shortDesc" className="block text-lg font-semibold text-gray-700">Short Description</label>
        <textarea
          id="shortDesc"
          name="shortDesc"
          onChange={handleChange}
          placeholder="Short description of your service"
          cols="30"
          rows="5"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        ></textarea>
        <label htmlFor="deliveryTime" className="block text-lg font-semibold text-gray-700">Delivery Time (e.g. 3 days)</label>
        <input id="deliveryTime" type="number" name="deliveryTime" onChange={handleChange} min="1" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
        <label htmlFor="revisionNumber" className="block text-lg font-semibold text-gray-700">Revision Number</label>
        <input
          id="revisionNumber"
          type="number"
          name="revisionNumber"
          onChange={handleChange}
          min="0"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <label htmlFor="features" className="block text-lg font-semibold text-gray-700">Add Features</label>
        <form action="" className="add flex gap-2" onSubmit={handleFeature}>
          <input id="features" type="text" placeholder="e.g. page design" className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"/>
          <button type="submit" className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 transition cursor-pointer">Add</button>
        </form>
        <div className="addedFeatures flex flex-wrap gap-2">
          {state?.features?.map((f) => (
            <div className="item" key={f}>
              <button
                className="flex items-center gap-2 bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm font-medium hover:bg-gray-300 transition"
                onClick={() =>
                  dispatch({ type: "REMOVE_FEATURE", payload: f })
                }
              >
                {f}
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center cursor-pointer">X</span>
              </button>
            </div>
          ))}
        </div>
        <label htmlFor="price" className="block text-lg font-semibold text-gray-700">Price</label>
        <input id="price" type="number" onChange={handleChange} name="price" min="5" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
      </div>
    </div>
  </div>
</div>
  );
};

export default Add;