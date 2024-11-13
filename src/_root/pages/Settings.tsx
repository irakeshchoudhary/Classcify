import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Loader } from "@/components/shared";
// import { useUserContext } from "@/context/AuthContext";

const Settings = () => {
  // const { user, isLoading } = useUserContext();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showSignOutModal, setShowSignOutModal] = useState(false); // State for modal visibility
  const [rememberLogin, setRememberLogin] = useState(false); // State for checkbox

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleCloseModal = () => setSelectedOption(null);

  const handleSignOutClick = () => {
    setShowSignOutModal(true);
  };

  const handleConfirmSignOut = () => {
    if (rememberLogin) {
      // Logic to remember login details
      console.log("Remember login details for future");
    }
    // Logic to sign the user out
    console.log("User signed out");
    setShowSignOutModal(false);
  };

  const handleCancelSignOut = () => {
    setShowSignOutModal(false);
    setRememberLogin(false);
  };

  return (
    <div>
      {/* Account Section */}
      <section className="mt-8">
        <h3 className="text-xs font-normal mb-2">Account</h3>

        <div onClick={() => handleOptionClick("Email")} className="flex items-center space-x-4 mb-5 mt-5 p-3 hover:bg-dark-4 cursor-pointer rounded-lg">
          <img src="/assets/icons/email.svg" alt="icons" />
          <div>
            <span className="block font-normal text-xs">Email</span>
            <span className="block text-gray-600 text-xs">example@gmail.com</span>
          </div>
        </div>

        <div onClick={() => handleOptionClick("Personalization")} className="flex items-center space-x-4 mb-5 mt-5 px-3 py-4 hover:bg-dark-4 cursor-pointer rounded-lg">
          <img src="/assets/icons/personalization.svg" alt="icons" />
          <span className="text-xs">Personalization</span>
        </div>

        <div onClick={() => handleOptionClick("Data Controls")} className="flex items-center space-x-4 mb-5 mt-5 px-3 py-4 hover:bg-dark-4 cursor-pointer rounded-lg">
          <img src="/assets/icons/datacontrol.svg" alt="icons" />
          <span className="text-xs">Data Controls</span>
        </div>
      </section>

      {/* App Section */}
      <section className="mt-5">
        <h3 className="text-xs font-normal mb-2">App</h3>

        <div onClick={() => handleOptionClick("Color Scheme")} className="flex items-center space-x-4 mb-5 mt-5 p-3 hover:bg-dark-4 cursor-pointer rounded-lg">
          <img src="/assets/icons/darkmode.svg" alt="icons" />
          <div>
            <span className="block text-xs">Color Scheme</span>
            <span className="block text-gray-600 text-xs">System (Default)</span>
          </div>
        </div>

        <div onClick={() => handleOptionClick("Language")} className="flex items-center space-x-4 mb-5 mt-5 p-3 hover:bg-dark-4 cursor-pointer rounded-lg">
          <img src="/assets/icons/language.svg" alt="icons" />
          <div>
            <span className="block text-xs">Language</span>
            <span className="block text-gray-600 text-xs">English</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mb-8">
        <h3 className="text-xs font-normal mb-2">About</h3>

        <div onClick={() => handleOptionClick("Help Center")} className="flex items-center space-x-4 mb-5 mt-5 px-3 py-4 hover:bg-dark-4 cursor-pointer rounded-lg">
          <img src="/assets/icons/help.svg" alt="icons" />
          <span className="text-xs">Help Center</span>
        </div>

        <div onClick={() => handleOptionClick("Terms of Use")} className="flex items-center space-x-4 mb-5 mt-5 px-3 py-4 hover:bg-dark-4 cursor-pointer rounded-lg">
          <img src="/assets/icons/terms.svg" alt="icons" />
          <span className="text-xs">Terms of Use</span>
        </div>

        <div onClick={() => handleOptionClick("Privacy Policy")} className="flex items-center space-x-4 mb-5 mt-5 px-3 py-4 hover:bg-dark-4 cursor-pointer rounded-lg">
          <img src="/assets/icons/privacy.svg" alt="icons" />
          <span className="text-xs">Privacy Policy</span>
        </div>

        <div onClick={() => handleOptionClick("Licenses")} className="flex items-center space-x-4 mb-5 mt-5 px-3 py-4 hover:bg-dark-4 cursor-pointer rounded-lg">
          <img src="/assets/icons/license.svg" alt="icons" />
          <span className="text-xs">Licenses</span>
        </div>

        <button onClick={handleSignOutClick} className="flex items-center space-x-4 mb-5 mt-5 px-20 py-4 hover:bg-opacity-10 hover:bg-rose-300 cursor-pointer rounded-lg">
          <img src="/assets/icons/signout.svg" alt="icons" />
          <span className="text-xs text-rose-300">Sign Out</span>
        </button>
      </section>

      {/* Sign Out Confirmation Modal */}
      {showSignOutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-dark-3 max-w-sm w-full p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-white mb-4">Confirm Sign Out</h2>
                <button onClick={handleCancelSignOut} className="text-white hover:text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
            </div>
            <p className="text-gray-400 mb-6">Are you sure you want to sign out?</p>
            <label className="flex items-center mb-6">
              <input 
                type="checkbox" 
                checked={rememberLogin} 
                onChange={(e) => setRememberLogin(e.target.checked)}
                className="form-checkbox text-blue-500 w-4 h-4" 
              />
              <span className="ml-2 text-gray-400 text-sm">Remember login details for future</span>
            </label>
            <div className="flex justify-end space-x-3">
              <button onClick={handleConfirmSignOut} className="px-4 py-2 bg-rose-700 text-white rounded-full">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Option Modal for Settings */}
      {selectedOption && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-dark-3 max-w-sm w-full p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-out scale-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">{selectedOption}</h2>
              <button onClick={handleCloseModal} className="text-white hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Here’s where you can manage settings for <span className="font-semibold">{selectedOption}</span>. Customize your experience to suit your needs.
            </p>
            <button 
              onClick={handleCloseModal} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-md transition-all duration-200 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
