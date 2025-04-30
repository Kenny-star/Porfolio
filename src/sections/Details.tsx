import React, { useState, useEffect } from 'react';
import isfp from "/assets/isfp.png";

const Details: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [isWaving, setIsWaving] = useState<boolean>(false);
  
  // Use a version of the text without the emoji for typing animation
  const textWithoutEmoji: string = "Hello Visitor , \n\nI'm Kenny, a third-year CS student at Concordia University, passionate about software development and AI/ML. I love exploring new technologies, building projects, and discovering new hobbies.";
  
  // Track where the emoji should be inserted
  const emojiIndex = "Hello Visitor ".length - 1;
  
  useEffect(() => {
    let index: number = 0;
    let timer: NodeJS.Timeout | undefined;
    
    const typingInterval = 50; // Base typing speed
    const punctuationPause = 400; // Pause duration for punctuation marks
    
    const typeNextCharacter = () => {
      if (index <= textWithoutEmoji.length) {
        setText(textWithoutEmoji.substring(0, index));
        
        // If we're at the emoji position, start waving
        if (index === emojiIndex) {
          setIsWaving(true);
          
          // Stop waving after the animation completes
          setTimeout(() => {
            setIsWaving(false);
          }, 2500); // Extended duration to match the new animation time
        }
        
        // Check if the current character is punctuation
        const currentChar = textWithoutEmoji[index];
        const isPunctuation = [',', '.', '!', '?', ':', ';', '\n'].includes(currentChar);
        
        index++;
        
        // Set the next timeout with delay based on whether we hit punctuation
        timer = setTimeout(
          typeNextCharacter, 
          isPunctuation ? punctuationPause : typingInterval
        );
      } else {
        // Typing complete
        setIsTyping(false);
      }
    };
    
    if (isTyping) {
      timer = setTimeout(typeNextCharacter, typingInterval);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isTyping, textWithoutEmoji, emojiIndex]);

  // Function to render text with waving emoji
  const renderTextWithEmoji = () => {
    if (text.length <= emojiIndex) {
      return text;
    }
    
    const beforeEmoji = text.substring(0, emojiIndex);
    const afterEmoji = text.substring(emojiIndex);
    
    return (
      <>
        {beforeEmoji}
        <span className={`text-xl ${isWaving ? "waving-hand" : ""}`}>👋</span>
        {afterEmoji}
      </>
    );
  };

  return (
    <section id="home">
      <article className="overflow-hidden px-6 lg:p-12" id="whoami">
        <style>
          {`
            @keyframes wave {
              0% { transform: rotate(0deg); }
              15% { transform: rotate(-20deg); }
              30% { transform: rotate(10deg); }
              45% { transform: rotate(-10deg); }
              60% { transform: rotate(10deg); }
              75% { transform: rotate(-10deg); }
              100% { transform: rotate(0deg); }
            }
            
            .waving-hand {
              display: inline-block;
              animation: wave 5.0s;
              transform-origin: 70% 70%;
            }
          `}
        </style>
        
        <div className="flex flex-col items-center gap-6 relative scale-90">
          {/* Speech bubble with animated text */}
          <div 
            className="font-mono text-xl whitespace-pre-line bg-gray-800 rounded-lg p-6 relative w-full"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              minHeight: '200px'
            }}
          >
            {renderTextWithEmoji()}
            
            {/* Cursor effect */}
            {isTyping && <span className="animate-pulse">|</span>}
            
            {/* Speech bubble tail pointing to image */}
            <div 
              className="absolute w-4 h-4 bg-gray-800 rotate-45 transform translate-x-1/2"
              style={{ 
                bottom: '-8px', 
                right: '50%' 
              }}
            ></div>
          </div>
          
          {/* Profile image and personality type */}
          <div className="flex flex-col items-center mt-8">
            <img 
              alt="isfp" 
              src={isfp} 
              className="rounded-2xl w-40 h-40 lg:w-44 lg:h-44 2xl:h-52 2xl:w-52 transition-transform duration-300"
            />
            <span className="text-lg font-mono text-cyan-200 italic mt-2">ISFP 🎨</span>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Details;