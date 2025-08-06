import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
const Reviews = ({ gigId }) => {

  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["reviews"])
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-sans flex flex-col gap-8">
      <h2 className="text-3xl font-bold text-gray-800">Reviews</h2>
      
      {/* List of existing reviews */}
      <div className="flex flex-col gap-6">
        {isLoading
          ? "Loading reviews..."
          : error
          ? "Something went wrong!"
          : data.map((review) => <Review key={review._id} review={review} />)}
      </div>
      
      <hr className="my-4 border-gray-200" />

      {/* Form to add a new review */}
      <div className="add">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add a review</h3>
        <form className="addForm flex flex-col gap-4" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Write your opinion" 
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <div className="flex items-center gap-4">
            <select className="p-4 cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
            <button className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reviews;