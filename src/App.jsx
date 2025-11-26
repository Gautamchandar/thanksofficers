import React, { useState, useEffect } from 'react';
import { Gift, Cake, Scissors, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
// Import the confetti library
import confetti from 'canvas-confetti';

// --- New: Photo Gallery Component ---
const PhotoGallery = ({ photos, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === photos.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-gray-900 bg-opacity-95 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl h-full max-h-[90vh] p-4 sm:p-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 text-white bg-red-500 rounded-full p-2 shadow-lg hover:bg-red-600 transition"
          aria-label="Close photo gallery"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-700"> Beautiful Memories </h2>
            <p className="text-sm text-gray-500">Slide {currentIndex + 1} of {photos.length}</p>
        </div>

        {/* Image Container */}
        <div className="relative w-full h-full max-h-[calc(90vh-120px)] overflow-hidden rounded-lg">
          <img
            src={photos[currentIndex].url}
            alt={photos[currentIndex].caption}
            className="w-full h-full object-contain transition-opacity duration-500"
          />

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 p-3 sm:p-4 bg-black bg-opacity-50 text-white rounded-r-lg hover:bg-opacity-75 transition"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 p-3 sm:p-4 bg-black bg-opacity-50 text-white rounded-l-lg hover:bg-opacity-75 transition"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption */}
        <p className="text-center mt-3 text-base sm:text-lg italic text-gray-600 font-medium">
          {photos[currentIndex].caption}
        </p>
      </div>
    </div>
  );
};


// Main App Component
const App = () => {
  const [showCoverPage, setShowCoverPage] = useState(true);
  const [isCakeVisible, setIsCakeVisible] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  // --- New State for Photo Gallery ---
  const [showGallery, setShowGallery] = useState(false);
  
  // Text for the typing animation
  const fullHeaderText = "First of all, thank you Charru ma’am and Kanika ma’am. You both are truly very special to me, and your constant support means more than words can express. I’m genuinely grateful for everything you’ve done for me. Also, a big thank you to all my seniors who have supported and guided me.";
  const [displayedHeaderText, setDisplayedHeaderText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  // Placeholder for the cover image
  const coverImageUrl = "https://i.postimg.cc/J0vh5949/image.png";
  
  // --- Typing Effect Logic ---
  useEffect(() => {
    if (!showCoverPage) {
      setDisplayedHeaderText(fullHeaderText.charAt(0)); 
      
      let index = 1; 
      const speed = 50; 
  
      const intervalId = setInterval(() => {
        if (index < fullHeaderText.length) {
          setDisplayedHeaderText(prev => prev + fullHeaderText.charAt(index));
          index++;
        } else {
          clearInterval(intervalId);
          setTypingComplete(true);
        }
      }, speed);
  
      return () => clearInterval(intervalId);
    }
  }, [showCoverPage]); 

  // --- Animation Logic: Burn Crackers / Fireworks ---
  const triggerCrackerAnimation = () => {
    const duration = 3000; // Animation lasts 3 seconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Since particles fall, we spawn them from two sides to look like fireworks
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleOpenGift = () => {
    // 1. Trigger the Fireworks/Cracker animation
    triggerCrackerAnimation();

    // 2. Show the cake after a tiny delay so they see the start of the fireworks first
    if (!isCakeVisible) {
      setTimeout(() => {
        setIsCakeVisible(true);
      }, 300); // 300ms delay for visual effect
    }
  };

  const handleCutCake = () => {
    // Optional: Add a small "pop" effect when cutting cake too
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsMessageModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsMessageModalOpen(false);
    // --- New: Open the Photo Gallery after closing the messages ---
    setShowGallery(true); 
  };
  
  const handleProceed = () => {
    setShowCoverPage(false); 
  };

  // --- New: Photo Collection Data ---
  const photoCollection = [
      { url: "https://i.postimg.cc/SNM6zRGd/image.png" },
      { url: "https://i.postimg.cc/pVg0SgG1/image.png"},
      { url: "https://i.postimg.cc/SQzdcgSS/image.png"},
      { url: "https://i.postimg.cc/65rhmTG8/image.png"},
      { url: "https://i.postimg.cc/N0z8HHZd/image.png"},
      { url: "https://i.postimg.cc/W31K2ggm/image.png"},
      { url: "https://i.postimg.cc/CLq2LFBX/image.png"},
      { url: "https://i.postimg.cc/Y0md939Q/image.png"},
      { url: "https://i.postimg.cc/N0Ch2dgC/image.png"},
      { url: "https://i.postimg.cc/J4LFnfNy/image.png"},
      { url: "https://i.postimg.cc/Wbfsxmqt/image.png"},
      { url: "https://i.postimg.cc/Jhjmy964/image.png"},
      { url: "https://i.postimg.cc/ZnshtZRy/image.png"},
      { url: "https://i.postimg.cc/g0M96myG/image.png"},
      // **IMPORTANT:** Replace these placeholder URLs with your actual photo links!
      // Example of adding a new photo:
      // { url: "YOUR_PHOTO_URL_HERE", caption: "A quick meeting snap." },
  ];

  const handleCloseGallery = () => {
      setShowGallery(false);
  };
  
  // Constants for the personalized messages (keeping this section condensed for brevity)
  const messages = {
    charru: "Charru ma’am, your intelligence and guidance in every field-especially technology-always inspires me. Whatever I have achieved is only because of your constant support. Your encouragement is not just help, it's a blessing for me. Thank you for being the strongest pillar behind all my work.",
    kanika: "Kanika ma’am, thank you so much. I truly enjoyed every moment working with you, and I will miss you a lot. Apart from my parents, I never had a guider like you - you are the first person who supported me this deeply. I have learned so much from you. Before meeting you, I honestly knew very little, but after working with you, I gained knowledge, confidence, and understanding of how to handle projects and situations. Talking to you and working under your guidance has been an amazing experience for me. I never thought I would get such a wonderful mentor in my life. You are truly very special to me. Thank you for supporting me, guiding me, and always believing in me.",
    priyank:"Priyank sir, thank you for giving me such an enriching and memorable experience-whether in real-life learning or while working on the INUP and CBSD projects. Your guidance has truly broadened my perspective and helped me grow both professionally and personally. I’m genuinely grateful for the opportunities and insights you’ve shared.",
    kartik: "Kartik sir, thank you so much. From the very first day, I genuinely enjoyed working with you. I was really impressed by your accent - I actually thought, 'Wow!' and became a fan right away. Working with you has been a great experience for me, and I truly had a wonderful time learning from you.",
    bhavisha: "Bhavisha ma’am, thank you so much. Working with you has been a truly valuable experience. Our journey began with the dashboard, and at that time I honestly had no idea how to proceed. I created the dashboard with my web skills, but the visualization still wasn’t up to the mark. With your guidance and support, we were able to improve it and make it meaningful. I really learned a lot while working with you. Thank you for your support and for helping me grow.",
    shraddha:"Shraddha ma’am, first of all, thank you so much. I truly enjoyed working with you. And congratulations on your new job - I am genuinely very happy for you. It feels great to know that I now have a senior professor as a friend. Your support has meant a lot to me. Thank you for always being there.",
    lalita:"Lalita ma’am, I truly enjoyed working with you. I learned so much from you throughout our time together, and every moment was a great learning experience for me. Thank you for guiding me and making the work so enjoyable.",
    abin:"Abin sir, I honestly don’t even know where to begin-your ability to do everything with such confidence and skill is truly inspiring. Thank you so much. Working with you always makes me feel energetic and motivated. I really enjoyed the time we worked on the landing page prototype; it became possible only because of your guidance and support. Without you, it wouldn’t have taken shape the way it did. You have an amazing energy, and I pray that you continue to bring that passion to everything you do. Thank you for always supporting and helping me.",
    parishrut:"Parishrut sir, you are truly an exceptional AI expert. Your depth of knowledge feels on another level, and it has been an honour for me to work with someone who is a founder and such a visionary. I genuinely enjoyed working with you, and I learned so much-from how to use AI tools effectively to understanding their benefits and limitations. Thank you so much for guiding me. My experience working with you has been truly wonderful, and I’m grateful for everything I learned from you",
    ayush:"Ayush sir, I truly enjoyed working with you. You introduced me to new technologies and showed me how a website can be made more creative. When I saw the posts you designed, I realized how creative you really are. Working with you was a great experience for me, and I learned a lot from your approach and ideas.",
    adya:"Adya Sharma, you are truly very intelligent, and I really enjoyed working with you. I learned so many things from you, and every moment working together was a great experience. Thank you for all your support and for making the work enjoyable.",
    kartikm: "Kartik Malotia, thank you so much. From our very first conversation, I genuinely liked your nature, and I felt very comfortable talking to you. Spending time and working with you was really enjoyable, and I truly appreciated your positive vibe. It was a great experience being around you.",
    harshita:"Harshita Bisht, you are such a wonderful person, and your creativity in post designing is truly on another level. I really enjoyed working with you and talking with you. It was always fun and enjoyable to be around you.",
    gopi:"Gopi sir, thank you so much. I still remember our first conversation-it was really nice. Our first interaction happened during the office order, when I spoke to you in Hindi, and you mentioned that you find it a bit difficult to understand Hindi. Then I explained everything to you in English, and that moment has stayed with me. I truly enjoy working with you and communicating with you. It has always been a pleasant and enjoyable experience.",
    siddanth:"Siddanth, you are truly an expert in cyber security. Your knowledge is impressive, and the way you create presentations and concept notes is both clear and very creative. I’ve genuinely admired your skills and the way you explain technical things so effectively."
  };


  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        .font-script {
            font-family: 'Great Vibes', cursive;
            line-height: 1.5;
        }
        
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        .animate-fadeIn {
            animation: fadeIn 1s ease-out;
        }
        .animate-pulse-slow {
            animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        html, body, #root {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        .main-background {
            background-color: #f7fafc; 
            min-height: 100vh;
        }
        `}
      </style>
      
      {/* Cover Page Slider */}
      <div 
        className={`
          fixed inset-0 z-50 bg-indigo-700 transition-transform duration-1000 ease-in-out
          flex flex-col items-center justify-center p-4 sm:p-8 text-white
          ${showCoverPage ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
          <div className="w-full max-w-sm md:max-w-md space-y-6 sm:space-y-8 text-center">
              <h1 className="text-2xl sm:text-5xl md:text-6xl font-extrabold text-yellow-300">
                  A Special Gift for All
              </h1>
              
              <div className="w-full h-48 sm:h-64 bg-indigo-800 rounded-xl overflow-hidden border-4 border-yellow-300">
                  <img 
                      src={coverImageUrl} 
                      alt="Cover Page Photo" 
                      className="w-full h-full object-cover"
                      onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src="https://placehold.co/800x600/6A0DAD/ffffff?text=Please+Insert+Your+Photo"; 
                      }}
                  />
              </div>

              <p className="text-base sm:text-lg text-indigo-200">
                  Click below to view the heartfelt message and surprise.
              </p>

              <button
                  onClick={handleProceed}
                  className="mt-6 flex items-center justify-center mx-auto space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-full bg-pink-500 text-white shadow-xl hover:bg-pink-600 transition duration-300 transform hover:scale-105"
              >
                  <span>Proceed to Message</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
              </button>
          </div>
      </div>

      
      {/* Main Website Content */}
      <div className="main-background min-h-screen flex flex-col items-center justify-start pt-10 pb-20 p-4">
        
        <div className="w-full max-w-lg md:max-w-4xl text-center mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-script font-semibold text-indigo-800 leading-snug p-4">
            {displayedHeaderText}
            {!typingComplete && !showCoverPage && <span className="animate-pulse-slow">|</span>}
          </h1>
        </div>

        {/* Gift Box / Cake Display Area */}
        {typingComplete && !isMessageModalOpen && !showGallery && (
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 p-6 animate-fadeIn w-full max-w-sm">

            {!isCakeVisible ? (
              /* Gift Box */
              <div className="flex flex-col items-center">
                <button
                  onClick={handleOpenGift}
                  className="group transform transition duration-500 hover:scale-105 active:scale-95 bg-pink-500 text-white p-6 rounded-xl shadow-lg hover:shadow-none flex flex-col items-center space-y-2 focus:outline-none focus:ring-4 focus:ring-pink-300"
                  aria-label="Open Gift Box"
                >
                  <Gift className="w-16 h-16 sm:w-20 sm:h-20 transition-transform group-hover:rotate-6" />
                  <span className="text-base sm:text-lg font-semibold mt-2">Click to Reveal Your Gift!</span>
                </button>
              </div>
            ) : (
              /* Cake Display */
              <div className="flex flex-col items-center space-y-6 animate-fadeIn">
                <p className="text-xl sm:text-2xl font-bold text-gray-800">A special cake, just for you!</p>
                
                <div className="relative p-4 bg-yellow-100">
                    <Cake className="w-24 h-24 sm:w-32 sm:h-32 text-red-500" />
                    <div className="text-5xl sm:text-6xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.9))' }}>
                        🎂
                    </div>
                </div>

                <button
                  onClick={handleCutCake}
                  className="flex items-center space-x-2 bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300 text-sm sm:text-base"
                >
                  <Scissors className="w-5 h-5" />
                  <span>Cut the Cake! (Read Your Messages)</span>
                </button>
              </div>
            )}
          </div>
        )}


        {/* Message Modal */}
        {isMessageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-xl md:max-w-3xl lg:max-w-4xl p-6 sm:p-8 md:p-10 transform transition-all duration-300 scale-100 opacity-100 border-4 border-yellow-500">
              
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl sm:text-3xl font-script text-purple-700 font-bold">Heartfelt Thanks</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition p-1"
                  aria-label="Close message"
                >
                  <X className="w-7 h-7 sm:w-8 sm:h-8" />
                </button>
              </div>

              <div className="space-y-6 sm:space-y-8 max-h-[80vh] sm:max-h-[75vh] overflow-y-auto pr-2">
                
                {Object.entries(messages).map(([key, message]) => {
                  let imageUrl = '';
                  let displayName = '';
                  // ... (Image URL and Display Name logic is the same) ...
                  switch (key) {
                      case 'charru':
                          imageUrl = "https://pbs.twimg.com/profile_images/1317083547719540736/i1H9o16A_400x400.jpg";
                          displayName = "Charru Ma'am";
                          break;
                      case 'kanika':
                          imageUrl = "https://i.postimg.cc/Y9RCGvFw/Kanika-Mam.jpg";
                          displayName = "Kanika Ma'am";
                          break;
                      case 'priyank':
                          imageUrl = "https://i.postimg.cc/L57RLL6z/Pryank-sir.jpg";
                          displayName = "Priyank Sir";
                          break;
                      case 'kartik':
                          imageUrl = "https://media.licdn.com/dms/image/v2/C4E03AQHDiGLaFhQuzg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1650357631164?e=1765411200&v=beta&t=VvCax3u2wNqFTDlDWxauuWKyuEWTFgzLVEKkia5szZA";
                          displayName = "Kartik Sir";
                          break;
                      case 'bhavisha':
                          imageUrl = "https://i.postimg.cc/wj12wJxQ/image.png";
                          displayName = "Bhavisha Ma'am";
                          break;
                      case 'shraddha':
                          imageUrl = "https://i.postimg.cc/pdDDSJwd/image.png";
                          displayName = "Shraddha Ma'am";
                          break;
                      case 'lalita':
                          imageUrl = "https://media.licdn.com/dms/image/v2/D4D03AQETaniTD9snPA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698783997522?e=1765411200&v=beta&t=-zH_JO2t3I3rMJpt0BmOY_6XceaTjM4-1crMslh5P14";
                          displayName = "Lalita Ma'am";
                          break;
                      case 'abin':
                          imageUrl = "https://i.postimg.cc/8cqcDqWT/image.png";
                          displayName = "Abin Sir";
                          break;
                      case 'parishrut':
                          imageUrl = "https://media.licdn.com/dms/image/v2/D5603AQHAq0QkfMkmrw/profile-displayphoto-crop_800_800/B56ZliggF.KAAI-/0/1758294313724?e=1765411200&v=beta&t=aYtJzB69uae220U6K0VFGVhKpyW5OVX965YE7mFMdsw";
                          displayName = "Parishrut Sir";
                          break;
                      case 'ayush':
                          imageUrl = "https://media.licdn.com/dms/image/v2/D5603AQEM3UnjXMH1Ug/profile-displayphoto-crop_800_800/B56Zno79IYJ8AI-/0/1760549661845?e=1765411200&v=beta&t=-XBYQqaR3VIKLuP_APht63bEYuIjhyirQUY-E-Tvhmg";
                          displayName = "Ayush Sir";
                          break;
                      case 'adya':
                          imageUrl = "https://i.postimg.cc/J0JDyrRL/image.png";
                          displayName = "Adya Sharma";
                          break;
                      case 'kartikm':
                          imageUrl = "https://i.postimg.cc/DzdxGhw3/IMG-8190.jpg";
                          displayName = "Kartik Malotia";
                          break;
                      case 'harshita':
                          imageUrl = "https://i.postimg.cc/g23dLw9H/Harshita-Negi.jpg";
                          displayName = "Harshita Bisht";
                          break;
                      case 'gopi':
                          imageUrl = "https://i.postimg.cc/qMzTFysF/Whats-App-Image-2025-11-24-at-10-03-21-PM.jpg";
                          displayName = "Gopikrishnan";
                          break;
                      case 'siddanth':
                          imageUrl = "https://i.postimg.cc/kgCdgzrt/image.png";
                          displayName = "Siddanth";
                          break;
                      default:
                          displayName = key.charAt(0).toUpperCase() + key.slice(1);
                          imageUrl = "https://placehold.co/40x40/cccccc/000000?text=👤";
                  }
                  
                  const backgroundColor = key === 'charru' || key === 'kanika' ? 'bg-purple-50' : 'bg-teal-50';

                  return (
                      <div key={key} className={`p-4 sm:p-5 ${backgroundColor} rounded-lg shadow-md`}>
                          <h3 className="text-lg sm:text-xl font-semibold text-teal-700 mb-3 flex items-center">
                              <img 
                                  className='w-10 h-10 rounded-full mr-3 border-2 border-teal-400 p-0.5 object-contain bg-white' 
                                  src={imageUrl} 
                                  alt={`${displayName}'s profile`} 
                                  onError={(e) => { 
                                      e.target.onerror = null; 
                                      e.target.src="https://placehold.co/40x40/cccccc/000000?text=👤"; 
                                      e.target.className = 'w-10 h-10 rounded-full mr-3 border-2 border-teal-400 p-1 text-xs';
                                  }}
                              />
                              <span>{displayName}</span>
                          </h3>
                          <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic">
                              {message}
                          </p>
                      </div>
                  );
                })}

              </div>
              
              <div className="mt-8 text-center">
                  <button
                      onClick={handleCloseModal}
                      className="bg-yellow-500 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-yellow-600 transition duration-300 shadow-lg transform hover:scale-105"
                  >
                      View Photos Surprise! 🖼️
                  </button>
              </div>
            </div>
          </div>
        )}
        
        {/* --- New: Photo Gallery Display --- */}
        {showGallery && (
            <PhotoGallery 
                photos={photoCollection} 
                onClose={handleCloseGallery} 
            />
        )}
        
      </div>
    </>
  );
};

export default App;