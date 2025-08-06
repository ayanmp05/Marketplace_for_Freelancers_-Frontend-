import React, { useState } from "react";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/api/auth/register", {
        ...user,
        img: url,
      });
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto">
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h1 className="text-3xl font-bold text-center">Join Our Platform</h1>
        <p className="text-blue-100 text-center mt-2">Create your account and start your journey</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Section - Basic Info */}
          <div className="space-y-6">
            <div className="pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Basic Information</h2>
              <p className="text-gray-600 text-sm">Let's start with your essential details</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username *
              </label>
              <input id="username" name="username" type="text" placeholder="johndoe" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500" onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input id="email" name="email" type="email" placeholder="john@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500" onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input id="password" name="password" type="password" placeholder="Enter a strong password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500" onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label htmlFor="profile-picture" className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="relative">
                <input id="profile-picture" type="file" accept="image/*" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={(e) => setFile(e.target.files[0])} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input id="country" name="country" type="text" placeholder="United States" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500" onChange={handleChange} />
            </div>
          </div>

          {/* Right Section - Seller Info */}
          <div className="space-y-6">
            <div className="pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Become a Seller</h2>
              <p className="text-gray-600 text-sm">Optional: Set up your seller profile</p>
            </div>

            {/* Toggle Switch */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Seller Account</h3>
                  <p className="text-sm text-gray-600 mt-1">Enable selling capabilities on your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" onChange={handleSeller} />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input id="phone" name="phone" type="text" placeholder="+1 234 567 89" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500" onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea id="description" name="desc" rows="6" placeholder="Tell us about yourself, your skills, and what services you offer..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500 resize-none" onChange={handleChange} ></textarea>
              <p className="text-xs text-gray-500 mt-1">This will be visible on your seller profile</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                Sign in here
              </Link>
            </p>
            <button  type="submit"  className="w-full cursor-pointer sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" >
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>

    {/* Trust Indicators */}
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-500 mb-4">Join thousands of satisfied users</p>
      <div className="flex justify-center items-center space-x-8 opacity-60">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-gray-600">Secure Registration</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-gray-600">Privacy Protected</span>
        </div>
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-gray-600">Instant Verification</span>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default Register;