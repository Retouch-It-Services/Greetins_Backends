import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PersonalizeCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { template, croppedImage } = location.state || {};
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [templateData, setTemplateData] = useState(null);
  const [generatingAI, setGeneratingAI] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (template) {
      fetch(`http://localhost:8000/api/v1/greetings/templates/${template}`)
        .then((response) => response.json())
        .then((data) => setTemplateData(data))
        .catch((error) =>
          console.error("Error fetching template data:", error)
        );
    }
  }, [template]);

  useEffect(() => {
    if (templateData?.occasion === 'Christmas' && !message && !generatingAI) {
      const autoGenerateMessage = async () => {
        try {
          setGeneratingAI(true);
          const response = await fetch(
            "http://localhost:8000/api/v1/greetings/ai/generate-greeting",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                occasion: templateData.occasion,
                recipient_name: "a loved one",
                tone: "warm",
              }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to generate AI wish");
          }
          const data = await response.json();
          setMessage(data.wish);
        } catch (error) {
          console.error("Error auto-generating AI message:", error);
        } finally {
          setGeneratingAI(false);
        }
      };
      autoGenerateMessage();
    }
  }, [templateData, message, generatingAI]);

  const handleGenerateAI = async () => {
    if (!recipientName.trim()) {
      alert("Please enter the recipient's name first.");
      return;
    }

    setGeneratingAI(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/greetings/ai/generate-greeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            occasion: templateData?.occasion,
            recipient_name: recipientName,
            tone: "warm",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate AI message");
      }

      const data = await response.json();
      setMessage(data.wish); // Set the message state with the AI-generated wish
    } catch (error) {
      console.error("Error generating AI message:", error);
      alert("Could not generate AI message. Please try again.");
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleSend = () => {
    if (!recipientName || !message || !senderName) {
      alert("Please fill in all fields before sending.");
      return;
    }

    let emailData;

    if (templateData?.occasion === 'Christmas') {
      emailData = {
        subject: '🎄 Merry Christmas Wishes!',
      };
      emailData = {
        ...emailData,
        recipient_name: recipientName,
        message: `Wishing you joy, peace, and happiness this Christmas 🎅`,
        sender_name: senderName,
        card_image: croppedImage || templateData?.card_image,
      };
    } else {
      emailData = {
        recipient_name: recipientName,
        message: message,
        sender_name: senderName,
        card_image: croppedImage || templateData?.card_image,
      };
    }

    fetch("http://localhost:8000/api/v1/greetings/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Greeting card sent successfully!");
          navigate("/");
        } else {
          alert("Failed to send greeting card.");
        }
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("An error occurred while sending the card.");
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleClear = () => {
    setRecipientName("");
    setMessage("");
    setSenderName("");
  };

  if (!templateData) {
    return <div>Loading...</div>;
  }

  const cardStyles = {
    ...templateData.styles.card,
    backgroundImage: `url(${croppedImage || templateData.card_image})`,
  };

  const getDynamicStyles = (element) => {
    const style = templateData.styles[element];
    if (style && style.fontFamily) {
      const linkId = `font-link-${style.fontFamily.replace(/\s+/g, "-")}`;
      if (!document.getElementById(linkId)) {
        const fontLink = document.createElement("link");
        fontLink.id = linkId;
        fontLink.href = `https://fonts.googleapis.com/css2?family=${style.fontFamily.replace(
          /\s+/g,
          "+"
        )}:wght@400;700&display=swap`;
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);
      }
    }
    return style;
  };

  return (
    <div className="personalize-container">
      <div className="card-preview" ref={cardRef}>
        <div className="card" style={cardStyles}>
          <div className="card-content">
            <h1 className="recipient-name" style={getDynamicStyles("recipient")}>
              {recipientName || "Recipient's Name"}
            </h1>
            <p className="message" style={getDynamicStyles("message")}>
              {message || "Your personal message will appear here."}
            </p>
            <p className="sender-name" style={getDynamicStyles("sender")}>
              {senderName || "Your Name"}
            </p>
          </div>
        </div>
      </div>

      <div className="form-container">
        <h2>Personalize Your Card</h2>
        <p className="template-occasion">
          You've selected a <strong>{templateData.occasion}</strong> card.
        </p>
        <div className="form-group">
          <label htmlFor="recipientName">Recipient's Name</label>
          <input
            type="text"
            id="recipientName"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="E.g., Jane Doe"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your heartfelt message here..."
            rows="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="senderName">Your Name</label>
          <input
            type="text"
            id="senderName"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="E.g., John Smith"
          />
        </div>
        <div className="button-group">
          <button onClick={handleBack} className="btn-secondary">
            Back
          </button>
          <button onClick={handleClear} className="btn-secondary">
            Clear
          </button>
          <button
            onClick={handleGenerateAI}
            className="btn-secondary"
            disabled={generatingAI}
          >
            {generatingAI ? "Generating..." : "AI Generate Wish"}
          </button>
          <button onClick={handleSend} className="btn-primary">
            Send via Mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizeCard;