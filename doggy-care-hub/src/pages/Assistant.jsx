
import React, { useState } from "react";
import {
  Bot,
  Send,
  PawPrint,
  User,
  Plus,
  MessageCircle,
  ShieldAlert,
} from "lucide-react";

const quickQuestions = [
  "What should I feed my dog?",
  "How often should I groom my dog?",
  "How much exercise does a dog need?",
  "How can I maintain my dog's dental health?",
];

const getSampleResponse = (message) => {
  const question = message.toLowerCase();

  if (
    question.includes("food") ||
    question.includes("feed") ||
    question.includes("nutrition") ||
    question.includes("eat")
  ) {
    return "A balanced diet is important for your dog's health. Choose food suitable for your dog's age, size and activity level. Make sure fresh drinking water is always available. Avoid foods that are unsafe for dogs, and consult a veterinarian if you need a diet plan for a specific health condition.";
  }

  if (
    question.includes("groom") ||
    question.includes("bath") ||
    question.includes("fur") ||
    question.includes("coat")
  ) {
    return "Regular grooming helps keep your dog's coat and skin healthy. Brush your dog's coat according to its type, check the ears and nails regularly, and bathe your dog when necessary using dog-safe products. Grooming frequency can vary depending on the breed and coat.";
  }

  if (
    question.includes("exercise") ||
    question.includes("walk") ||
    question.includes("play")
  ) {
    return "Dogs need regular physical activity and mental stimulation. Daily walks, interactive play and suitable activities can help maintain their well-being. The amount of exercise depends on your dog's age, breed, fitness and health.";
  }

  if (
    question.includes("dental") ||
    question.includes("teeth") ||
    question.includes("tooth")
  ) {
    return "Dental care is an important part of everyday dog care. Use a toothbrush and toothpaste made specifically for dogs, introduce brushing gradually, and arrange routine dental checks with your veterinarian.";
  }

  if (
    question.includes("vaccin") ||
    question.includes("vaccine")
  ) {
    return "Vaccinations help protect dogs against certain infectious diseases. Keep your dog's vaccination records updated and follow a schedule recommended by your veterinarian. The appropriate schedule depends on your dog's age, health and circumstances.";
  }

  if (
    question.includes("tick") ||
    question.includes("flea") ||
    question.includes("worm") ||
    question.includes("parasite")
  ) {
    return "Parasite prevention is an important part of preventive dog care. Check your dog's coat and skin regularly, maintain a clean living environment, and ask your veterinarian about suitable flea, tick and worm prevention products.";
  }

  if (
    question.includes("sick") ||
    question.includes("pain") ||
    question.includes("vomit") ||
    question.includes("emergency") ||
    question.includes("symptom")
  ) {
    return "I'm sorry your dog may not be feeling well. I can provide general educational information, but I cannot diagnose illnesses or recommend treatment. Please contact a qualified veterinarian promptly. If your dog is having difficulty breathing, collapsing, having seizures or showing another severe symptom, seek emergency veterinary care.";
  }

  return "That's a good question about dog care! I can help with general information about nutrition, grooming, exercise, hygiene, vaccinations and preventive care. Could you provide a little more detail about what you'd like to know?";
};

function Assistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "Hello! I'm your Doggy Care Assistant. 🐾\n\nYou can ask me general questions about your dog's daily care, nutrition, grooming, exercise and preventive care. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = (text = input) => {
    const question = text.trim();

    if (!question) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: question,
    };

    const assistantMessage = {
      id: Date.now() + 1,
      sender: "assistant",
      text: getSampleResponse(question),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
      assistantMessage,
    ]);

    setInput("");
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "assistant",
        text: "Hello again! 🐾 What would you like to know about your dog's care?",
      },
    ]);
    setInput("");
  };

  return (
    <div className="assistant-page">
      <div className="assistant-heading">
        <div>
          <span className="assistant-eyebrow">
            <PawPrint size={15} /> DOGGY CARE HUB
          </span>
          <h1>AI Care Assistant</h1>
          <p>
            Your companion for everyday dog-care information and guidance.
          </p>
        </div>

        <button
          className="assistant-new-chat"
          type="button"
          onClick={handleNewChat}
        >
          <Plus size={17} />
          New Chat
        </button>
      </div>

      <div className="assistant-chat-card">
        <div className="assistant-chat-header">
          <div className="assistant-profile">
            <div className="assistant-avatar">
              <Bot size={23} />
            </div>
            <div>
              <h3>Doggy Care Assistant</h3>
              <span>
                <span className="assistant-status-dot"></span>
                Demo assistant
              </span>
            </div>
          </div>

          <span className="assistant-chat-label">
            <MessageCircle size={15} />
            General Guidance
          </span>
        </div>

        <div className="assistant-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`assistant-message-row ${
                message.sender === "user" ? "user-message-row" : ""
              }`}
            >
              {message.sender === "assistant" && (
                <div className="message-avatar bot-message-avatar">
                  <Bot size={18} />
                </div>
              )}

              <div
                className={`assistant-message ${
                  message.sender === "user"
                    ? "user-message"
                    : "bot-message"
                }`}
              >
                <p>{message.text}</p>
              </div>

              {message.sender === "user" && (
                <div className="message-avatar user-message-avatar">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="assistant-quick-questions">
          <p>Suggested questions</p>
          <div className="assistant-suggestions">
            {quickQuestions.map((question) => (
              <button
                type="button"
                key={question}
                onClick={() => handleSend(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <form
          className="assistant-input-area"
          onSubmit={(event) => {
            event.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask a question about dog care..."
            aria-label="Type your dog care question"
          />

          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <Send size={19} />
          </button>
        </form>

        <div className="assistant-input-note">
          Press Enter to send your message.
        </div>
      </div>

      <div className="assistant-safety-notice">
        <ShieldAlert size={21} />
        <div>
          <h3>Important Notice</h3>
          <p>
            This is a frontend demonstration using sample responses.
            It does not provide veterinary diagnosis, prescriptions or
            treatment. Always consult a qualified veterinarian for
            medical concerns. For emergencies, seek immediate veterinary care.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Assistant;
