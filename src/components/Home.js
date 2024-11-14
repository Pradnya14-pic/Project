// Home.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';

function Home() {
  const [image, setImage] = useState(null);
  const [temperature, setTemperature] = useState(false);
  const [humidity, setHumidity] = useState(false);
  const [cropTypes, setCropTypes] = useState({
    grape: false,
    apple: false,
    wheat: false,
    rice: false,
  });
  const [soilQuality, setSoilQuality] = useState({
    loamy: false,
    sandy: false,
    clay: false,
  });
  const [prediction, setPrediction] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("temperature", temperature);
    formData.append("humidity", humidity);
    formData.append("cropTypes", JSON.stringify(cropTypes));
    formData.append("soilQuality", JSON.stringify(soilQuality));

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setPrediction(response.data.prediction);
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to get insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Home">
      <h1>Intelligent Agricultural Dashboard</h1>
      <p>Enter the necessary details and upload an image to get customized recommendations.</p>

      <form onSubmit={handleSubmit}>
        <label>Weather Conditions:</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={temperature}
              onChange={() => setTemperature(!temperature)}
            />
            Temperature
          </label>
          <label>
            <input
              type="checkbox"
              checked={humidity}
              onChange={() => setHumidity(!humidity)}
            />
            Humidity
          </label>
        </div>

        <label>Crop Type:</label>
        <div className="checkbox-group">
          {Object.keys(cropTypes).map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                checked={cropTypes[type]}
                onChange={() =>
                  setCropTypes({ ...cropTypes, [type]: !cropTypes[type] })
                }
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>

        <label>Soil Quality:</label>
        <div className="checkbox-group">
          {Object.keys(soilQuality).map((quality) => (
            <label key={quality}>
              <input
                type="checkbox"
                checked={soilQuality[quality]}
                onChange={() =>
                  setSoilQuality({ ...soilQuality, [quality]: !soilQuality[quality] })
                }
              />
              {quality.charAt(0).toUpperCase() + quality.slice(1)}
            </label>
          ))}
        </div>

        <label>Upload Leaf/Plant Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Predict</button>
      </form>

      {loading && <p>Loading...</p>}

      {image && (
        <div className="output-section">
          <h3>Submitted Image:</h3>
          <img src={URL.createObjectURL(image)} alt="Submitted leaf" className="uploaded-image" />
        </div>
      )}

      {prediction && (
        <div className="output-section">
          <h3>Prediction:</h3>
          <p>{prediction}</p>
        </div>
      )}

      {summary && (
        <div className="output-section">
          <h3>LLM Summary:</h3>
          <textarea value={summary} readOnly />
        </div>
      )}
    </div>
  );
}

export default Home;
