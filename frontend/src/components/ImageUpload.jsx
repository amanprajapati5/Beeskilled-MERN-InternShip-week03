import { useEffect, useState } from "react";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

  // Load previously uploaded images
  const loadImages = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/upload",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load images"
        );
      }

      setUploadedImages(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Load images when dashboard opens/refreshed
  useEffect(() => {
    if (token) {
      loadImages();
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setMessage("");
    setError("");

    if (!file) {
      setSelectedFile(null);
      setPreview("");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
      setSelectedFile(null);
      setPreview("");
      setError(
        "Please select a JPG, JPEG, PNG or WEBP image."
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSelectedFile(null);
      setPreview("");
      setError("Image size must be less than 5MB.");
      return;
    }

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    if (!token) {
      setError("Please login again.");
      return;
    }

    setUploading(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();

      formData.append("image", selectedFile);

      const response = await fetch(
        "http://localhost:5000/api/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Image upload failed"
        );
      }

      setUploadedImages((currentImages) => [
        data.image,
        ...currentImages
      ]);

      setMessage("Image uploaded successfully!");

      setSelectedFile(null);
      setPreview("");
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-upload">

      <div className="upload-header">
        <h2>Upload Image</h2>

        <p>
          Select an image and preview it before uploading.
        </p>
      </div>

      <label className="upload-box">
        <span className="upload-icon">📷</span>

        <strong>Choose an image</strong>

        <span>
          JPG, JPEG, PNG or WEBP · Max 5MB
        </span>

        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          hidden
        />
      </label>

      {preview && (
        <div className="preview-section">
          <h3>Preview</h3>

          <img
            src={preview}
            alt="Selected preview"
            className="image-preview"
          />
        </div>
      )}

      {selectedFile && (
        <button
          type="button"
          className="upload-button"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      )}

      {message && (
        <p className="success-message">
          {message}
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {uploadedImages.length > 0 && (
        <div className="uploaded-section">

          <h3>Uploaded Images</h3>

          <div className="uploaded-gallery">

            {uploadedImages.map((image) => (
              <div
                className="uploaded-image-card"
                key={image._id}
              >
                <img
                  src={image.imageUrl}
                  alt="Uploaded"
                  className="uploaded-image"
                />

                <p>
                  Uploaded successfully
                </p>
              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}

export default ImageUpload;