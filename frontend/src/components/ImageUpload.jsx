import { useEffect, useState } from "react";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

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
        if (response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        throw new Error(
          data.message || "Failed to load images"
        );
      }

      setUploadedImages(data);
    } catch (error) {
      setError(error.message);
    }
  };

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
        if (response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

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

  const handleDelete = async (imageId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `http://localhost:5000/api/upload/${imageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        throw new Error(
          data.message || "Image deletion failed"
        );
      }

      setUploadedImages((currentImages) =>
        currentImages.filter(
          (image) => image._id !== imageId
        )
      );

      setMessage("Image deleted successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="image-upload">

      <div className="upload-header">

        <div className="image-section-icon">
          ◈
        </div>

        <div>
          <span className="section-eyebrow">
            MEDIA
          </span>

          <h2>Image library</h2>

          <p>
            Upload and manage your project images.
          </p>
        </div>

      </div>

      <label className="upload-box">

        <span className="upload-icon">↑</span>

        <strong>
          Drop your image here
        </strong>

        <span>
          or click to browse from your computer
        </span>

        <small>
          JPG, PNG, WEBP · Maximum 5MB
        </small>

        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileChange}
          hidden
        />

      </label>

      {preview && (
        <div className="preview-section">

          <div className="preview-header">
            <h3>Selected image</h3>

            <span>
              {selectedFile?.name}
            </span>
          </div>

          <img
            src={preview}
            alt="Selected preview"
            className="image-preview"
          />

          <button
            type="button"
            className="upload-button primary-button"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading
              ? "Uploading..."
              : "Upload image →"}
          </button>

        </div>
      )}

      {message && (
        <div className="alert success-alert">
          ✓ {message}
        </div>
      )}

      {error && (
        <div className="alert error-alert">
          {error}
        </div>
      )}

      <div className="uploaded-section">

        <div className="section-heading compact">

          <div>
            <span className="section-eyebrow">
              COLLECTION
            </span>

            <h3>Uploaded images</h3>
          </div>

          <span className="image-count">
            {uploadedImages.length}
          </span>

        </div>

        {uploadedImages.length === 0 ? (
          <div className="image-empty-state">
            <span>◈</span>
            <p>No images uploaded yet.</p>
          </div>
        ) : (
          <div className="uploaded-gallery">

            {uploadedImages.map((image) => (
              <div
                className="uploaded-image-card"
                key={image._id}
              >

                <div className="image-wrapper">

                  <img
                    src={image.imageUrl}
                    alt="Uploaded"
                    className="uploaded-image"
                  />

                  <button
                    type="button"
                    className="image-delete-button"
                    onClick={() =>
                      handleDelete(image._id)
                    }
                    aria-label="Delete image"
                  >
                    ×
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </section>
  );
}

export default ImageUpload;