"use client";

import { useState, useCallback } from "react";

const CUTE_MESSAGES = [
  "Are you sure? 🥺",
  "Think again... pretty please? 💕",
  "My heart just cracked a little 💔",
  "Wait wait wait... reconsider? 🥹",
  "I'll make you cookies! 🍪❤️",
  "Come onnn... you know you want to 😏",
  "My teddy bear is crying now 🧸😢",
  "What if I said pleaseeeee? 🙏💗",
  "Okay but like... are you SURE sure? 😭",
  "I promise to always share my fries 🍟💘",
  "Even my pet is giving you puppy eyes 🐶",
  "This is heartbreaking... literally 💔😩",
  "I'll write you a love poem every day! 📝💕",
  "You're really gonna do this to me? 🥺👉👈",
  "Fine... but the Yes button is getting bigger 😤",
  "Last chance before I start ugly crying 😭💀",
  "I can't believe you've done this 🫠",
  "Okay I'm not giving up that easy 💪❤️",
  "PLEASE I already told my mom about us 😳",
  "You literally have no choice at this point 😂❤️",
];

const EMOJIS = ["🎵", "❤️", "💕", "🫠", "😉", "😙", "🥰", "💗", "✨", "🌸", "💐", "🎀", "💘", "🦋", "🍫"];

const CONFETTI_EMOJIS = ["❤️", "💕", "🎉", "✨", "💗", "🥳", "🎊", "💖", "🌹", "💘", "🎀", "🦋"];

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const handleNo = useCallback(() => {
    setNoCount((prev) => Math.min(prev + 1, CUTE_MESSAGES.length - 1));
  }, []);

  const handleYes = useCallback(() => {
    // Create confetti burst
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
    }));
    setConfetti(pieces);
    setAccepted(true);
  }, []);

  const yesGrowClass = noCount >= 6 ? "grow-6" : noCount >= 1 ? `grow-${noCount}` : "";
  const noShrinkClass = noCount >= 6 ? "shrink-6" : noCount >= 1 ? `shrink-${noCount}` : "";

  return (
    <>
      {/* Floating background emojis */}
      <div className="floating-emojis">
        {EMOJIS.map((emoji, i) => (
          <div key={i} className="floating-emoji">
            {emoji}
          </div>
        ))}
      </div>

      {/* Confetti burst on Yes */}
      {confetti.length > 0 && (
        <div className="confetti-container">
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="confetti-piece"
              style={{
                left: `${piece.left}%`,
                animationDelay: `${piece.delay}s`,
                animationDuration: `${piece.duration}s`,
              }}
            >
              {piece.emoji}
            </div>
          ))}
        </div>
      )}

      {!accepted ? (
        <div className="valentine-card">
          <span className="bear-emoji">🧸</span>
          <h1 className="question">Will you be my Valentine?</h1>
          <p className="cute-message">
            {noCount === 0
              ? "I have a very important question... 💭"
              : CUTE_MESSAGES[noCount - 1]}
          </p>
          <div className="buttons">
            <button
              className={`btn-yes ${yesGrowClass}`}
              onClick={handleYes}
            >
              Yes! 💕
            </button>
            <button
              className={`btn-no ${noShrinkClass}`}
              onClick={handleNo}
            >
              {noCount === 0
                ? "No"
                : noCount <= 3
                  ? "Still no"
                  : noCount <= 6
                    ? "Nope!"
                    : noCount <= 10
                      ? "No..."
                      : noCount <= 15
                        ? "😭"
                        : "🤏"}
            </button>
          </div>
          {noCount > 0 && (
            <p className="no-count">
              You&apos;ve said no {noCount} {noCount === 1 ? "time" : "times"}...
              the Yes button is getting impatient 😤
            </p>
          )}
        </div>
      ) : (
        <div className="celebration">
          <span className="big-heart">💕</span>
          <h1>Yaaay!! 🥳</h1>
          <p>
            I knew you&apos;d say yes!
            <br />
            You just made me the happiest person ever! 🥹💕
          </p>
          <span className="kiss-emoji">😙</span>
          <p style={{ marginTop: "16px", fontSize: "1rem", fontWeight: 300 }}>
            my love 💗
          </p>
        </div>
      )}
    </>
  );
}
