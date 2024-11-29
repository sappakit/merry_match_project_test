import { useState } from "react";

function RegisterPage() {
  const [avatars, setAvatars] = useState({});

  const handleFileChange = (event) => {
    const uniqueId = Date.now();
    setAvatars({
      ...avatars,
      [uniqueId]: event.target.files[0],
    });
  };

  const handleRemoveImage = (event, avatarKey) => {
    event.preventDefault();
    delete avatars[avatarKey];
    setAvatars({ ...avatars });
  };

  return (
    // upload File และใช้ function handleFileChange เพื่อให้ setAvatars เก็บภาพ
    <div className="input-container">
      <label htmlFor="upload">
        Avatar
        <input
          id="upload"
          name="avatar"
          type="file"
          placeholder="Enter last name here"
          onChange={handleFileChange}
          hidden
        />
      </label>

      {/* Preview Picture */}
      <div className="image-list-preview-container">
        {Object.keys(avatars).map((avatarKey) => {
          const file = avatars[avatarKey];
          return (
            <div key={avatarKey} className="image-preview-container">
              <img
                className="image-preview"
                src={URL.createObjectURL(file)}
                alt={file.name}
              />
              <button
                className="image-remove-button"
                onClick={(event) => handleRemoveImage(event, avatarKey)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RegisterPage;
